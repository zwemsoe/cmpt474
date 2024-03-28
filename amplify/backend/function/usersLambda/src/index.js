const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  const { httpMethod, body, queryStringParameters } = event;
  console.log(`EVENT NEW: ${JSON.stringify(event)}`);
  const result = await awsServerlessExpress.proxy(
    server,
    event,
    context,
    "PROMISE"
  ).promise;

  const amplifyEnv = process.env.ENV;
  const tableName = `usersTable-${amplifyEnv}`;

  switch (httpMethod) {
    case "GET": {
      if (!queryStringParameters) {
        const params = {
          TableName: tableName,
        };

        let scanResults = [];
        let items;
        do {
          items = await dynamoDB.scan(params).promise();
          items.Items.forEach((item) => scanResults.push(item));
          params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != "undefined");

        result.body = JSON.stringify({
          message: "All Users",
          data: scanResults,
        });

        return result;
      }
      const { email: userEmail } = queryStringParameters;
      const params = {
        TableName: tableName,
        Key: {
          email: userEmail,
        },
      };
      const { Item } = await dynamoDB.get(params).promise();
      const { role, email } = Item;
      result.body = JSON.stringify({
        role,
        email,
      });

      return result;
    }
    case "PUT": {
      const { email, role } = JSON.parse(body);
      const payload = {
        TableName: tableName,
        Item: {
          email,
          role,
        },
      };
      const data = await dynamoDB.put(payload).promise();
      console.log("User info updated", data);
      result.body = JSON.stringify({
        message: "Success",
      });
      return result;
    }
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }
};
