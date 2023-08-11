import React from "react";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { Button, Screen, Text } from "app/components";
import { spacing } from "app/theme";
import { StuSubmissionScreenStyles as styles } from "./styles";

export const StuSubmissionScreen = observer(function StuSubmissionScreen() {
  // ...

  return (
    <Screen style={$screenContentContainer} preset="auto">
      <View style={styles.courseContainer}>
        <Text style={styles.sectionHeader}>Course Name (Course Code)</Text>

        <View style={styles.horizontalLine}></View>

        <Text style={styles.Title}>Assignment content goes here...</Text>
        <Text style={styles.subTitle}>Assignment Sub-Title</Text>

        {/* Wrap the button with TouchableOpacity for better touch area */}
        <Button onPress={handleSubmission} title="Submit"/>
        
      </View>
    </Screen>
  );
});

const $screenContentContainer = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
};

function handleSubmission() {
  // Add your submission logic or navigation code here
  console.log("Submitted!");
}