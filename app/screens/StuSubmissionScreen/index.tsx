import React from "react";
import { observer } from "mobx-react-lite";
import { View, TouchableOpacity } from "react-native";
import { Button, Screen, Text } from "app/components";
import { StuSubmissionScreenStyles as styles } from "./styles";
import DocumentUpload from "app/components/DocumentUpload"

export const StuSubmissionScreen = observer(function StuSubmissionScreen() {
  // ...

  function handleSubmission() {
    // Add your submission logic or navigation code here
    console.log("Submitted!");
  }

  const handleUpload = (fileUri: string) => {
    // Handle the uploaded file here
    console.log('File uploaded:', fileUri);
  };

  return (
    <Screen style={styles.screenContentContainer} preset="auto">
      <View style={styles.courseContainer}>
        <Text style={styles.sectionHeader}>Course Name (Course Code)</Text>

        <View style={styles.horizontalLine}></View>

        <Text style={styles.title}>Title</Text>
        <Text style={styles.subTitle}>Sub-Title</Text>

        <TouchableOpacity>
          <Text style={styles.question}>Assignment Question</Text>
        </TouchableOpacity>

        <DocumentUpload onUpload={handleUpload} />
        {/* Wrap the button with TouchableOpacity for better touch area */}
        <Button style={styles.button} onPress={handleSubmission} title="Submit"/>
        
      </View>
    </Screen>
  );
});



