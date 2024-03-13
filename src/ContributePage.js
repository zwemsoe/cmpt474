import React, { useEffect, useState } from "react";
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
import { post, get } from "aws-amplify/api";
import "./Contribute.css";
import Footer from "./Footer";

const ContributePage = () => {
  const [toggled, setToggled] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
  const [topicInput, setTopicInput] = useState("");

  const getTopics = async () => {
    try {
      const restOperation = get({
        apiName: "questionsApi",
        path: "/topics",
      });
      const { body } = await restOperation.response;
      const response = await body.json();
      setOptions(response.map((item) => item.topicName));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const toggleTextFieldVisibility = () => {
    setTextFieldVisible(!isTextFieldVisible);
  };

  const saveTopic = async () => {
    if (topicInput) {
      try {
        setLoading(true);
        const restOperation = post({
          apiName: "questionsApi",
          path: "/topics",
          options: {
            body: {
              topicsId: crypto.randomUUID(),
              topicName: topicInput,
            },
          },
        });
        const { body } = await restOperation.response;
        await body.json();
        await getTopics();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      setSelectedTag(topicInput);
      setTextFieldVisible(false);
      setTopicInput("");
    }
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
            topic: selectedTag,
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

        {loading && <Loader variation='linear' />}
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
              options={options}
              value={selectedTag}
              placeholder='Choose a topic'
              required
            />

            <Flex direction='column' style={{ marginBottom: "30px" }}>
              <Button onClick={toggleTextFieldVisibility} variation='primary'>
                Create new topic
              </Button>
              {isTextFieldVisible && (
                <div>
                  <TextField
                    name='topic'
                    placeholder='React, AWS, etc.'
                    label='New topic'
                    labelHidden
                    required
                    value={topicInput}
                    onChange={(event) => setTopicInput(event.target.value)}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <Button onClick={saveTopic} style={{ marginRight: "10px" }}>
                      Save
                    </Button>
                    <Button onClick={() => setTopicInput("")}>Clear</Button>
                  </div>
                </div>
              )}
            </Flex>

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
