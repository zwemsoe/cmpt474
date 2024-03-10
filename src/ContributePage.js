import React, { useState } from "react";
import Header from "./Header";
import {
  Button,
  Flex,
  TextField,
  TextAreaField,
  View,
  SwitchField,
  SelectField,
  Alert,
  Loader,
} from "@aws-amplify/ui-react";
import { post } from "aws-amplify/api";
import "./Contribute.css";
import Footer from "./Footer";

const ContributePage = () => {
  const [toggled, setToggled] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const restOperation = post({
        apiName: "questionsApi",
        path: "/questions",
        options: {
          body: {
            questionId: crypto.randomUUID(),
            title: questionTitle,
            question: questionContent,
            answer: toggled,
          },
        },
      });
      const { body } = await restOperation.response;
      await body.json();
      setQuestionTitle("");
      setQuestionContent("");
      setSelectedTag("");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <h2>Submit Your Questions</h2>
        <p>
          Welcome to our question submission form! Your input helps us grow our
          knowledge base. Please use the form below to submit new questions.
          Make sure to provide a clear title and description for each question.
          Your contributions are greatly appreciated!
        </p>
        <form onSubmit={handleSubmit}>
          <Flex direction='column' gap='2rem'>
            <TextField
              name='title'
              placeholder='Question Title'
              label='Question Title'
              labelHidden
              variation='quiet'
              required
              value={questionTitle}
              onChange={(event) => setQuestionTitle(event.target.value)}
            />
            <SelectField
              label='Topic'
              onChange={(event) => setSelectedTag(event.target.value)}
              value={selectedTag}
            >
              <option value=''>Choose a topic</option>
              <option value='CMPT 474'>CMPT 474</option>
              <option value='CompSci'>CompSci</option>
            </SelectField>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "0.5rem",
              }}
            >
              <TextAreaField
                name='question'
                placeholder='Question'
                label='Question'
                labelHidden
                variation='quiet'
                required
                multiline
                rows={6}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                }}
                value={questionContent}
                onChange={(event) => setQuestionContent(event.target.value)}
              />
            </div>
            <div>
              <SwitchField
                checked={toggled}
                onChange={handleToggle}
                label='Answer'
                key='answer'
                trackColor={"red"}
                trackCheckedColor={"green"}
              />
              <p>{toggled ? "True" : "False"}</p>
            </div>
            {loading && <Loader variation='linear' />}
            {submitted && (
              <Alert variation='success' isDismissible={true} hasIcon={true}>
                Successfully submitted
              </Alert>
            )}
            <Button
              type='submit'
              variation='primary'
              style={{ marginBottom: "30px" }}
            >
              Submit Question
            </Button>
          </Flex>
        </form>
      </div>
      <Footer />
    </View>
  );
};

export default ContributePage;
