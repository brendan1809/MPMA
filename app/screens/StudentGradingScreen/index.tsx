/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Screen, StudentGradingCard, TextInput } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"


export const StudentGradingScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  return (
    <Screen style={style.flex} preset="auto">
      <View style={style.container}>
        <TextInput title="Search for students"/>
        <StudentGradingCard
          headerText="Student 1"
          gradeText="N/A"
          footerButtonText="Add Grade"
          onFooterPress={() => {
            onNavigate("GradingSelect")
          }}
        />
        <StudentGradingCard
          headerText="Student 1"
          gradeText="N/A"
          footerButtonText="Add Grade"
          onFooterPress={() => {
            onNavigate("GradingSelect")
          }}
        />
        <StudentGradingCard
          headerText="Student 1"
          gradeText="N/A"
          footerButtonText="Add Grade"
          onFooterPress={() => {
            onNavigate("GradingSelect")
          }}
        />
      </View>
    </Screen>
  )
}
