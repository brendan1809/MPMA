/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ImagePicker, Screen, Text, TextInput } from "app/components"
import React, { useState } from "react"
import { View, Image } from "react-native"
import { style } from "./styles"

export const ForgotPasswordScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  return (
    <Screen style={style.flex} preset="auto">
      <View style={style.container}>
        <Text style={style.headingText}>Forgot Password</Text>
        <Text style={style.text}>To recover your account, begin by entering your email address and we will send you an reset password link.</Text>
        <TextInput
          title="Email"
          placeholder="Please write your email here"
        />
        <Button style={style.button}
          title="Reset Password"
        />
      </View>
    </Screen>
  )
}
