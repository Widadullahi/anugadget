import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const ddb = new DynamoDBClient({});

export const handler = async (event: any) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { title, body: content, audience = 'all', imageUrl } = body;

    if (!title || !content) {
      return { statusCode: 400, body: JSON.stringify({ error: 'title and body are required' }) };
    }

    const campaignId = uuidv4();

    const item: any = {
      campaignId: { S: campaignId },
      title: { S: title },
      body: { S: content },
      audience: { S: audience },
      status: { S: 'queued' },
      created_at: { S: new Date().toISOString() },
    };

    if (imageUrl) item.image_url = { S: imageUrl };

    await ddb.send(new PutItemCommand({ TableName: process.env.CAMPAIGNS_TABLE!, Item: item }));

    return { statusCode: 201, body: JSON.stringify({ campaignId }) };
  } catch (err) {
    console.error('createCampaign error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'internal' }) };
  }
};
