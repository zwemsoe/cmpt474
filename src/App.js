import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { get } from "aws-amplify/api";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contribute from './Contribute';
import Questions from "./Questions";
import Header from "./Header";
import Footer from "./Footer";

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
    <Router>
      <Routes>
        <Route path="/" element={(
            <View className="App" style={{ minHeight: '100vh', paddingBottom: '50px', boxSizing: 'border-box', paddingTop: '100px' }}>
            <Header />
            <Button onClick={signOut}>Sign Out</Button>
            <Footer />
          </View>
        )} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
