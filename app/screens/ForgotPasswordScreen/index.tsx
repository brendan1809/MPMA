/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ImagePicker, Screen, Text, TextInput } from "app/components"
import React, { useState } from "react"
import { View, Image } from "react-native"
import auth from "@react-native-firebase/auth"
import { style } from "./styles"
import flash from "app/config/flash"

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")

  const handleForgotPassword = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email)
      flash("success", "Password reset email sent successfully")
      navigation.goBack()
      setEmail("")
      // Display a success message to the user or navigate to a success screen
    } catch (error) {
      flash("error", "Failed to reset password")
      // Display an error message to the user
    }
  }

  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Text style={style.text}>
          To recover your account, begin by entering your email address and we will send you an
          reset password link.
        </Text>
        <TextInput
          onChangeText={setEmail}
          title="Email"
          placeholder="Please write your email here"
        />
        <Button
          style={style.button}
          title="Reset Password"
          onPress={() => {
            handleForgotPassword(email)
          }}
        />
      </View>
    </Screen>
  )
}
