import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ddb = new DynamoDBClient({});
const ses = new SESClient({});

export const handler = async (event: any) => {
  // Simple campaign processor: scan campaigns table for queued campaigns,
  // then scan customers and send emails filtered by gender.
  const campaignsTable = process.env.CAMPAIGNS_TABLE!;
  const customersTable = process.env.CUSTOMERS_TABLE!;
  const from = process.env.SES_FROM!;

  try {
    // For brevity, we scan campaigns table and process first queued campaign
    const campaigns = await ddb.send(new ScanCommand({ TableName: campaignsTable, Limit: 5 }));
    const items = campaigns.Items || [];
    for (const c of items) {
      const status = c.status?.S;
      if (status !== 'queued') continue;

      const campaignId = c.campaignId.S;
      const title = c.title?.S || 'New Collection';
      const body = c.body?.S || '';
      const audience = c.audience?.S || 'all';
      const imageUrl = c.image_url?.S || null;

      // Build customer scan filter based on audience
      let customers: any[] = [];

      // Simple scan and filter client-side (inefficient for large datasets)
      const resp = await ddb.send(new ScanCommand({ TableName: customersTable }));
      customers = (resp.Items || []).filter((it: any) => {
        if (audience === 'all') return it.subscribed?.BOOL === true;
        if (audience === 'female') return (it.gender?.S === 'female') && it.subscribed?.BOOL === true;
        if (audience === 'male') return (it.gender?.S === 'male') && it.subscribed?.BOOL === true;
        return false;
      });

      // Send emails (throttle in real implementation)
      for (const cust of customers) {
        const to = cust.email.S;
        const name = cust.full_name?.S || '';
        const html = `<p>Hi ${name || 'there'},</p><p>${body}</p>${imageUrl ? `<img src="${imageUrl}" style="max-width:100%"/>` : ''}`;

        try {
          await ses.send(new SendEmailCommand({
            Destination: { ToAddresses: [to] },
            Message: {
              Body: { Html: { Charset: 'UTF-8', Data: html } },
              Subject: { Charset: 'UTF-8', Data: title },
            },
            Source: from,
          }));
          console.log('Sent to', to);
        } catch (err) {
          console.warn('SES send error', err);
        }
      }

      // Mark campaign as processed (simple put)
      await ddb.send(new PutItemCommand({
        TableName: campaignsTable,
        Item: {
          campaignId: { S: campaignId },
          title: { S: title },
          body: { S: body },
          audience: { S: audience },
          status: { S: 'sent' },
          processed_at: { S: new Date().toISOString() },
        }
      }));

      console.log('Campaign processed', campaignId);
    }
  } catch (err) {
    console.error('Campaign processor error', err);
  }

  return { status: 'ok' };
};
