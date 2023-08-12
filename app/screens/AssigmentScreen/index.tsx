/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, Text } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"

export const AssignmentScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Text style={style.headingText} >Course Name (Course Code)</Text>
        <View style={style.horizontalLine} />
        <Text style={style.text}>Title</Text>
        <Text style={style.text}>Subtitle</Text>
        <Text style={[style.text, {color: "blue"}]}>File Name (Should be clickable)</Text>
        <Button title="Grading" onPress={() => {
          onNavigate("StudentGrading")
        }} />
      </View>
    </Screen>
  )
}
