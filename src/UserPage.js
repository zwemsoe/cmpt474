import React, { useState } from 'react';
import { View } from "@aws-amplify/ui-react";
import Footer from './Footer';
import Header from './Header';
import {
    updateUserAttribute
  } from 'aws-amplify/auth';
import { updateMFAPreference } from 'aws-amplify/auth';

const MFAPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOptIn = async () => { 
    handleUpdateUserAttribute('phone_number', phoneNumber);
    handleUpdateMFAPreference();
  }

async function handleUpdateMFAPreference() {
  try {
    await updateMFAPreference({ sms: 'PREFERRED' });
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateUserAttribute(attributeKey, value) {
  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey,
        value
      }
    });
    handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}

function handleUpdateUserAttributeNextSteps(output) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case 'CONFIRM_ATTRIBUTE_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
      );
      // Collect the confirmation code from the user and pass to confirmUserAttribute.
      break;
    case 'DONE':
      console.log(`attribute was successfully updated.`);
      break;
  }
}

  return (
    <View
    className="App"
    style={{
      minHeight: "70vh",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Header />
    <div>
      <h1>Opt-In to Multi-Factor Authentication (MFA)</h1>
      <p>Please enter your phone number to opt-in to MFA:</p>
      <input
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handleInputChange}
      />
      <button onClick={handleOptIn}>
        Sign up
      </button>
    </div>
    <Footer />
    </View>
  );
};

export default MFAPage;
