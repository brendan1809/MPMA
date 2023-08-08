/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, TextInput } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"
import DocumentUpload from "app/components/DocumentUpload"

export const LectureScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const handleUpload = (file: string) => {
    // Handle the uploaded file here
    console.log('File uploaded:', file);
  };

  return (
    <Screen style={style.flex}>
      <View style={style.container}>
      <TextInput
        title="Title"
        placeholder="Write a title"
      />
      <DocumentUpload onUpload={handleUpload} />
      <Button
        style={style.button}
        title="Add Slide"
      />
      </View>
    </Screen>
  )
}
