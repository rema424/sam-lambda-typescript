import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import uuid from 'uuid';

const docClient = new DocumentClient();
const _params = { TableName: 'SampleUser' };

export async function handler(event: APIGatewayEvent) {
  if (event.httpMethod) {
  }
  const groupId = '1';
  const id = '2';
  const [users1, users2, user3, user4] = await Promise.all([
    scanListUsers(groupId),
    queryListUsers(groupId),
    getUser(id),
    createUser('1', 'test', 'test@example.com'),
  ]);
  return {
    statusCode: 200,
    body: JSON.stringify({ users1, users2, user3, user4 }),
  };
}

async function scanListUsers(groupId: string) {
  const params = Object.assign({}, _params, {
    FilterExpression: 'groupId = :groupId',
    ExpressionAttributeValues: { ':groupId': groupId },
  });
  try {
    const data = await docClient.scan(params).promise();
    console.log('scan list data', data);
    return {
      stausCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.log('scan list error', err);
    return {
      stausCode: 501,
      body: JSON.stringify(err.message),
    };
  }
}

async function queryListUsers(groupId: string) {
  const params = Object.assign({}, _params, {
    IndexName: 'groupId-index',
    KeyConditionExpression: '#groupId = :groupId',
    ExpressionAttributeNames: { '#groupId': 'groupId' },
    ExpressionAttributeValues: { ':groupId': groupId },
  });
  try {
    const data = await docClient.query(params).promise();
    console.log('query list data', data);
    return {
      stausCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.log('query list error', err);
    return {
      stausCode: 501,
      body: JSON.stringify(err.message),
    };
  }
}

async function getUser(id: string) {
  const params = Object.assign({}, _params, {
    Key: {
      id, // パーティションキー
      // ソートキーがある場合はここに追加
    },
  });
  try {
    const data = await docClient.get(params).promise();
    console.log('get data', data);
    return {
      stausCode: 200,
      body: JSON.stringify(data.Item || {}),
    };
  } catch (err) {
    console.log('get error', err);
    return {
      stausCode: 501,
      body: JSON.stringify(err.message),
    };
  }
}

async function createUser(groupId: string, name: string, email: string) {
  let newId;
  let other;
  let count = 1;
  do {
    newId = uuid.v4();
    other = await getUser(newId);
    console.log('other', other);
    console.log('count', count++);
  } while (other.body !== '{}' || other.stausCode !== 200);

  const params = Object.assign({}, _params, {
    Item: {
      id: newId,
      groupId,
      name,
      createdAt: new Date(),
      updatedAt: new Date().getTime(),
    },
  });
  try {
    const data = await docClient.put(params).promise();
    console.log('create data', data);
    return {
      stausCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.log('create error', err);
    return {
      stausCode: 501,
      body: JSON.stringify(err.message),
    };
  }
}

type User = {
  id: string;
  groupId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
