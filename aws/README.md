# AWS scaffolding for AnuGadget

This folder contains a minimal AWS CDK (v2) scaffold and example Lambda handlers to:

- Create a Cognito User Pool (for app authentication)
- Persist customers to a DynamoDB `Customers` table on Cognito post-confirmation (Lambda trigger)
- Provide a `Campaigns` DynamoDB table and a campaign-processor Lambda that sends emails via SES

This is a scaffold — review and adapt before deploying to production.

Requirements

- Node.js 18+
- AWS CDK v2 installed globally (`npm i -g aws-cdk`)
- AWS credentials configured (CLI profile or environment variables)

Quick start

1. Install dependencies

```bash
cd aws
npm install
```

2. Bootstrap (first time only)

```bash
npm run bootstrap
```

3. Deploy

```bash
npm run deploy
```

Notes

- The Cognito User Pool is configured with `autoVerify.email` so Cognito will send verification emails if SES is configured for the account region or if you configure an email sending method.
- The post-confirmation Lambda expects user attributes `email`, and optional `name`, `custom:birthday`, `custom:gender`.
- The campaign processor is a simple example — for production use implement batching, retries, and SES verified identities.

API for admin dashboard

- The CDK stack creates an API Gateway endpoint (output `CampaignsApiUrl`) with a `/campaigns` POST endpoint handled by a Lambda that queues campaigns in the `Campaigns` table.
- The `AdminDashboard` can POST JSON { title, body, audience, imageUrl } to the API to create campaigns.

Frontend integration notes

- Keep the custom signup UI. Use AWS SDK (CognitoIdentityProviderClient) or Amazon Cognito Identity JS to call `SignUp` from the frontend.
- After confirmation (or using the post-confirmation trigger), the customer will be saved to DynamoDB.

Next steps I can implement for you

- Add CDK constructs for an API Gateway + Lambda to accept campaign creation requests from `AdminDashboard`.
- Add CI/CD and esbuild bundling for Lambdas.
- Add throttling/batching and email templates for SES.
