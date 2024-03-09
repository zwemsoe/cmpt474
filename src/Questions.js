import React from 'react';
import { View } from '@aws-amplify/ui-react';
import Header from './Header';
import Footer from './Footer';

const Questions = () => {
  return (
    <View className="App" style={{ minHeight: '100vh', paddingBottom: '50px', boxSizing: 'border-box', paddingTop: '100px' }}>
        <Header />
            <div>
            <h2>Questions</h2>
            <p>List of Questions here:</p>
      
            </div>
        <Footer />
    </View>
  );
}

export default Questions;