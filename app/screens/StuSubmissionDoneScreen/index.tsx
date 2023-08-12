import React from "react";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { Screen, Text } from "app/components";
import { style as styles } from "./styles";

export const StuSubmissionDoneScreen = observer(function StuSubmissionDoneScreen() {
  // ...

  return (
    <Screen style={styles.screenContentContainer} preset="auto">
      <View style={styles.courseContainer}>
        <Text style={styles.sectionHeader}>Course Name (Course Code)</Text>

        <View style={styles.horizontalLine}></View>

        <Text style={styles.title}>Title</Text>
        <Text style={styles.subTitle}>Sub-Title</Text>
        <Text style={styles.fileName}>Uploaded File Name*</Text>
        <Text style={styles.submit}>Submitted for grading</Text>
        <Text style={styles.grade}>Grade: N/A</Text>

      </View>
    </Screen>
  );
});



