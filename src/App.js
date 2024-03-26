import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContributePage from "./ContributePage";
import QuestionsPage from "./QuestionsPage";
import Users from "./Users";
import Header from "./Header";
import Footer from "./Footer";
import QuestionPage from "./QuestionPage";
import Topic from "./Topic";
import UserPage from "./UserPage";

function App({ signOut }) {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <View
              className='App'
              style={{
                minHeight: "100vh",
                paddingBottom: "50px",
                boxSizing: "border-box",
                paddingTop: "100px",
              }}
            >
              <Header />
              <Button onClick={signOut}>Sign Out</Button>
              <Footer />
            </View>
          }
        />
        <Route path='/contribute' element={<ContributePage />} />
        <Route path='/questions' element={<Topic />} />
        <Route path='/questions/:topicName' element={<QuestionsPage />} />
        <Route path='/question/:questionId' element={<QuestionPage />} />
        <Route path='/users' element={<Users />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
