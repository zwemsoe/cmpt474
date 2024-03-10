import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroupField,
  Text,
  View,
} from "@aws-amplify/ui-react";
import Header from "./Header";
import Footer from "./Footer";
import { get } from "aws-amplify/api";
import { useParams } from "react-router-dom";

const QuestionPage = () => {
  let { questionId } = useParams();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const restOperation = get({
          apiName: "questionsApi",
          path: `/questions/object/${questionId}`,
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        setQuestion(response);
      } catch (error) {
        console.error(error);
      }
    }
    if (questionId) {
      fetchData();
    }
  }, [questionId]);

  const checkAnswer = () => {
    if (answer) {
      setSubmitted(true);
      if (answer === question.answer.toString()) {
        setResult(true);
      } else {
        setResult(false);
      }
    }
  };

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
      {question && (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <Flex direction='column' gap='1rem'>
            <Heading>{question.title}</Heading>
            <Text>{question.question}</Text>
            <RadioGroupField
              variation='outlined'
              direction='row'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{ justifyContent: "center" }}
            >
              <Radio value={"true"}>True</Radio>
              <Radio value={"false"}>False</Radio>
            </RadioGroupField>
            <Button onClick={checkAnswer}>Submit</Button>
            <Heading>Result:</Heading>
            {submitted && (
              <Alert
                variation={result ? "success" : "error"}
                isDismissible={false}
              >
                {result ? "Correct" : "Incorrect"}
              </Alert>
            )}
          </Flex>
        </div>
      )}

      <Footer />
    </View>
  );
};

export default QuestionPage;
