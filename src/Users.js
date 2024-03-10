import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  Button,
  Flex,
  TextField,
  TextAreaField,
  View,
  SwitchField,
  SelectField,
} from "@aws-amplify/ui-react";
import { get, post } from "aws-amplify/api";
import "./Contribute.css";
import Footer from "./Footer";

const Users = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const restOperation = get({
          apiName: "users",
          path: "/users",
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <View
      className="App"
      style={{
        minHeight: "100vh",
        paddingBottom: "50px",
        boxSizing: "border-box",
        paddingTop: "100px",
      }}
    >
      <Header />

      <h2>Submit Your Questions</h2>
      <p>
        Welcome to our question submission form! Your input helps us grow our
        knowledge base. Please use the form below to submit new questions. Make
        sure to provide a clear title and description for each question. Your
        contributions are greatly appreciated!
      </p>

      <Footer />
    </View>
  );
};

export default Users;
