import React from 'react';
import { View } from '@aws-amplify/ui-react';
import Header from './Header';

const Questions = () => {
  return (
    <View className="App">
        <Header />
            <div>
            <h2>Questions</h2>
            <p>List of Questions here:</p>
      
            </div>
    </View>
  );
}

export default Questions;