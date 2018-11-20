import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import uuid from 'uuid';

const docClient = new DocumentClient();
const _params = { TableName: 'SampleUser' };

export async function handler(event: APIGatewayEvent) {
  const id: string = (event.pathParameters || {}).userId || '';

  event.body = JSON.stringify({
    groupId: '1',
    id: '1',
    firstName: '佐藤',
    firstKana: 'サトウ',
    lastName: '一郎',
    lastKana: 'イチロウ',
    phone: '080-1111-2222',
    email: 'aaaaa@example.com',
    genderCode: 1,
    birthday: '1990-01-01',
    postalCode: '123-4567',
    address: '東京都江東区',
  });

  return await createUser(event);

  // switch (event.httpMethod) {
  //   case 'GET':
  //     if (id) {
  //       return getUser(event);
  //     }
  //     return listUsers(event);
  //   case 'POST':
  //     return createUser(event);
  //   case 'PUT':
  //     return updateUser(event);
  //   case 'DELETE':
  //     return deleteUser(event);
  //   default:
  //     // Send HTTP 501: Not Implemented
  //     console.log('Error: unsupported HTTP method (' + event.httpMethod + ')');
  //     return {
  //       statusCode: 501,
  //       headers: { my_header: 'my_value' },
  //       body: JSON.stringify({}),
  //     };
  // }
}

type UserDto = {
  groupId: string;
  id: string;
  firstName: string;
  firstKana: string;
  lastName: string;
  lastKana: string;
  phone: string;
  email: string;
  genderCode: number;
  birthday: string;
  postalCode: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
};

const seed: UserDto[] = [
  {
    groupId: '1',
    id: '1',
    firstName: '佐藤',
    firstKana: 'サトウ',
    lastName: '一郎',
    lastKana: 'イチロウ',
    phone: '080-1111-2222',
    email: 'aaaaa@example.com',
    genderCode: 1,
    birthday: '1990-01-01',
    postalCode: '123-4567',
    address: '東京都江東区',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
  {
    groupId: '1',
    id: '2',
    firstName: '鈴木',
    firstKana: 'スズキ',
    lastName: '花子',
    lastKana: 'ハナコ',
    phone: '080-3333-4444',
    email: 'bbbbb@example.com',
    genderCode: 2,
    birthday: '1991-02-02',
    postalCode: '891-2345',
    address: '神奈川県横浜市',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
  {
    groupId: '1',
    id: '3',
    firstName: '高橋',
    firstKana: 'タカハシ',
    lastName: '二郎',
    lastKana: 'ジロウ',
    phone: '080-5555-6666',
    email: 'ccccc@example.com',
    genderCode: 3,
    birthday: '1992-03-03',
    postalCode: '678-9123',
    address: '千葉県習志野市',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
  {
    groupId: '2',
    id: '4',
    firstName: '佐々木',
    firstKana: 'ササキ',
    lastName: '愛子',
    lastKana: 'アイコ',
    phone: '090-7777-8888',
    email: 'ddddd@example.com',
    genderCode: 2,
    birthday: '1993-04-04',
    postalCode: '123-7264',
    address: '埼玉県さいたま市',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
  {
    groupId: '2',
    id: '5',
    firstName: '渡辺',
    firstKana: 'ワタナベ',
    lastName: '三郎',
    lastKana: 'サブロウ',
    phone: '080-7216-9721',
    email: 'eeeee@example.com',
    genderCode: 1,
    birthday: '1994-05-05',
    postalCode: '432-1836',
    address: '北海道札幌市',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
  {
    groupId: '3',
    id: '6',
    firstName: '斎藤',
    firstKana: 'サイトウ',
    lastName: '春子',
    lastKana: 'ハルコ',
    phone: '090-4533-8384',
    email: 'fffff@example.com',
    genderCode: 2,
    birthday: '1995-06-06',
    postalCode: '542-7373',
    address: '沖縄県那覇市',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
  {
    groupId: '3',
    id: '7',
    firstName: '後藤',
    firstKana: 'ゴトウ',
    lastName: '四郎',
    lastKana: 'シロウ',
    phone: '080-1122-3322',
    email: 'aaaaa@example.com',
    genderCode: 1,
    birthday: '1996-07-07',
    postalCode: '123-4599',
    address: '京都府京都市',
    createdAt: `${new Date().getTime()}`,
    updatedAt: `${new Date().getTime()}`,
  },
];

async function createUser(event: APIGatewayEvent) {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body || '{}');
  console.log(data);

  const params = Object.assign({}, _params, {
    Item: {
      groupId: data.groupId,
      id: data.id,
      firstName: data.firstName,
      firstKana: data.firstKana,
      lastName: data.lastName,
      lastKana: data.lastKana,
      phone: data.phone,
      email: data.email,
      genderCode: data.genderCode,
      birthday: data.birthday,
      postalCode: data.postalCode,
      address: data.address,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    ExpressionAttributeNames: { '#id': 'id' },
    ConditionExpression: 'attribute_not_exists(#id)',
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
