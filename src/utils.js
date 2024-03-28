import { get } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";

export const getUserInfo = async () => {
  const { signInDetails } = await getCurrentUser();

  const restOperation = get({
    apiName: "usersApi",
    path: "/users",
    options: {
      queryParams: {
        email: signInDetails.loginId,
      },
    },
  });
  const { body } = await restOperation.response;
  const { role, email } = await body.json();
  return { role, email };
};
