import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Heading,
  Loader,
  Text,
  View,
} from "@aws-amplify/ui-react";
import Header from "./Header";
import Footer from "./Footer";
import { get } from "aws-amplify/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const QuestionsPage = () => {
  const navigate = useNavigate();
  let { topicName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restOperation = get({
          apiName: "questionsApi",
          path: "/questions",
        });
        const { body } = await restOperation.response;
        const response = await body.json();

        setQuestions(response.filter((item) => item["topic"] === topicName));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (topicName) {
      fetchData();
    }
  }, [topicName]);

  return (
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
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <h2>Questions</h2>
        <p>List of Questions here:</p>
        {loading && <Loader variation='linear' />}
        <Flex direction='column' gap='1rem'>
          {questions.map(({ questionId, title, question }) => {
            return (
              <Card key={questionId} variation='elevated'>
                <Flex direction='column' gap='1rem'>
                  <Heading>{topicName}</Heading>
                  <Heading>{title}</Heading>
                  <Text>{question}</Text>
                  <Button onClick={() => navigate(`/question/${questionId}`)}>
                    Attempt this question
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </div>
      <Footer />
    </View>
  );
};

export default QuestionsPage;
