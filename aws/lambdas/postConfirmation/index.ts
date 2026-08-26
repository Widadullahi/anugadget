import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});

export const handler = async (event: any) => {
  // Cognito post confirmation event
  try {
    const userAttrs = event.request.userAttributes || {};
    const email = userAttrs.email;
    const fullName = userAttrs.name || userAttrs['custom:full_name'] || null;
    const birthday = userAttrs['custom:birthday'] || null;
    const gender = userAttrs['custom:gender'] || null;

    if (!email) {
      console.warn('No email in user attributes');
      return event;
    }

    const params = {
      TableName: process.env.CUSTOMERS_TABLE!,
      Item: {
        email: { S: email },
        full_name: fullName ? { S: fullName } : undefined,
        birthday: birthday ? { S: birthday } : undefined,
        gender: gender ? { S: gender } : undefined,
        subscribed: { BOOL: true },
        created_at: { S: new Date().toISOString() },
      },
    } as any;

    // Remove undefined attributes
    Object.keys(params.Item).forEach((k) => params.Item[k] === undefined && delete params.Item[k]);

    await ddb.send(new PutItemCommand(params));
    console.log('Customer saved', email);
  } catch (err) {
    console.error('PostConfirmation error', err);
  }

  return event;
};
