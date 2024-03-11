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
import { useNavigate } from "react-router-dom";

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const restOperation = get({
          apiName: "questionsApi",
          path: "/topics",
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        setTopics(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  });

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
        <h2>Topics</h2>
        <p>Choose from list of topics</p>
        {loading && <Loader variation='linear' />}
        <Flex direction='column' gap='1rem'>
          {topics.map(({ topicId, topicName }) => {
            return (
              <Card key={topicId} variation='elevated'>
                <Flex direction='column' gap='1rem'>
                  <Heading>{topicName}</Heading>
                  <Button onClick={() => navigate(`/questions/${topicName}`)}>
                    Select
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
