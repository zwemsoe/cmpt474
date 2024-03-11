const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  const amplifyEnv = process.env.ENV;
  const tableName = `usersTable-${amplifyEnv}`;
  const email = event.request.userAttributes.email;

  const params = {
    TableName: tableName,
    Item: {
      email: email,
      role: "viewer",
    },
  };

  try {
    const data = await dynamoDB.put(params).promise();
    console.log("New user added", data);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
