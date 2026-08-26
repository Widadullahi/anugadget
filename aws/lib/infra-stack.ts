import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB tables
    const customersTable = new dynamodb.Table(this, 'CustomersTable', {
      partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const campaignsTable = new dynamodb.Table(this, 'CampaignsTable', {
      partitionKey: { name: 'campaignId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'AnuGadgetUserPool',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Post confirmation Lambda (triggered by Cognito after confirmation)
    const postConfirmationLambda = new lambda.Function(this, 'PostConfirmationHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambdas', 'postConfirmation')),
      environment: {
        CUSTOMERS_TABLE: customersTable.tableName,
      },
    });

    customersTable.grantWriteData(postConfirmationLambda);

    userPool.addTrigger(cognito.UserPoolOperation.POST_CONFIRMATION, postConfirmationLambda);

    // Campaign processor Lambda
    const campaignLambda = new lambda.Function(this, 'CampaignProcessor', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambdas', 'campaignProcessor')),
      environment: {
        CUSTOMERS_TABLE: customersTable.tableName,
        CAMPAIGNS_TABLE: campaignsTable.tableName,
        SES_FROM: 'no-reply@yourdomain.com',
        REGION: this.region,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
    });

    customersTable.grantReadData(campaignLambda);
    campaignsTable.grantReadWriteData(campaignLambda);

    // Allow campaign lambda to send emails via SES
    campaignLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*'],
    }));

    // CreateCampaign Lambda - API for admin dashboard to create campaigns
    const createCampaignLambda = new lambda.Function(this, 'CreateCampaignLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambdas', 'createCampaign')),
      environment: {
        CAMPAIGNS_TABLE: campaignsTable.tableName,
      },
      memorySize: 256,
    });

    campaignsTable.grantWriteData(createCampaignLambda);

    // API Gateway for campaigns
    const api = new apigw.RestApi(this, 'CampaignsApi', {
      restApiName: 'AnuGadgetCampaignsApi',
      description: 'API to create and manage email campaigns',
      deployOptions: {
        stageName: 'prod',
      },
    });

    const campaigns = api.root.addResource('campaigns');
    campaigns.addMethod('POST', new apigw.LambdaIntegration(createCampaignLambda));

    new cdk.CfnOutput(this, 'CampaignsApiUrl', { value: api.url });

    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new cdk.CfnOutput(this, 'CustomersTable', { value: customersTable.tableName });
    new cdk.CfnOutput(this, 'CampaignsTable', { value: campaignsTable.tableName });
  }
}
