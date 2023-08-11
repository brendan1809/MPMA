/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, TextInput } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"
import DocumentUpload from "app/components/DocumentUpload"

export const SubmissionScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const handleUpload = (fileUri: string) => {
    // Handle the uploaded file here
    console.log('File uploaded:', fileUri);
  };

  return (
    <Screen style={style.flex}>
      <View style={style.container}>
      <TextInput
        title="Title"
        placeholder="Write a title"
      />
      <TextInput
        title="Subtitle"
        placeholder="Write a subtitle"
      />
      <DocumentUpload onUpload={handleUpload} />
      <Button
      style={style.button}
        title="Add"
      />
      </View>
    </Screen>
  )
}
