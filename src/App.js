import logo from "./logo.svg";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

import { get } from "aws-amplify/api";
import { useEffect } from "react";

function App({ signOut }) {
  useEffect(() => {
    async function fetchData() {
      try {
        const restOperation = get({
          apiName: "questionsApi",
          path: "/questions",
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  });
  return (
    <View className='App'>
      <Card>
        <Image src={logo} className='App-logo' alt='logo' />
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
