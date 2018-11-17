import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function run(event: APIGatewayProxyEvent) {
  console.log(event);

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      my_header: "my_value"
    },
    body: JSON.stringify({
      event: event.resource,
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `Your user ID is ${(event.pathParameters || {}).userId || false}`
    })
  };

  return response;
}
