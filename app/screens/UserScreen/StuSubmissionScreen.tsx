/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { observer } from "mobx-react-lite";
import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Screen, Text } from "app/components";
import { spacing } from "app/theme";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const StuSubmissionScreen = observer(function StuSubmissionScreen() {
  // ...

  return (
    <Screen style={$screenContentContainer} preset="auto">
      <View style={styles.courseContainer}>
        <Text style={styles.courseName}>Course Name (Course Code)</Text>
      </View>

      <Text style={styles.sectionHeader}>Assignment Details</Text>
      <Text style={styles.assignmentText}>Assignment content goes here...</Text>
      <Text style={styles.subTitle}>Assignment Sub-Title</Text>

      {/* Wrap the button with TouchableOpacity for better touch area */}
      <TouchableOpacity onPress={handleSubmission}>
        <Button>Submit</Button>
      </TouchableOpacity>
    </Screen>
  );
});

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
};

const styles = StyleSheet.create({
  courseContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 8,
  },
  courseName: {
    fontSize: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: spacing.lg,
  },
  assignmentText: {
    fontSize: 16,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  subTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: spacing.lg,
  },
});

function handleSubmission() {
  // Add your submission logic or navigation code here
  console.log("Submitted!");
}
