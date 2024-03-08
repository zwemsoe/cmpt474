import React, { useState } from 'react';
import Header from './Header';
import {
    Button,
    Flex,
    TextField,
    View,
    SwitchField,
  } from "@aws-amplify/ui-react";

const Contribute = () => {
    const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  };
  return (
    <View className="App">
        <Header />
            <div>
            <h2>Contribute</h2>
            <p>Submit new questions here:</p>
            <View as="form" margin="3rem 0">
              <Flex direction="row" justifyContent="center">
                <TextField
                  name="title"
                  placeholder="Question Title"
                  label="Question Title"
                  labelHidden
                  variation="quiet"
                  required
                />
                <TextField
                  name="question"
                  placeholder="Question"
                  label="Question"
                  labelHidden
                  variation="quiet"
                  required
                />
                <div>
                    <SwitchField
                        checked={toggled}
                        onChange={handleToggle}
                        label="Answer"
                        key="answer"
                    />
                        <p>{toggled ? 'True' : 'False'}</p>
                </div>
                <Button type="submit" variation="primary">
                  Submit Question
                </Button>
              </Flex>
            </View>
            </div>
    </View>
  );
}

export default Contribute;
