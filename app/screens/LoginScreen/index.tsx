/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, Text, TextInput } from "app/components"
import React from "react"
import { View, TouchableOpacity } from "react-native"
import { style } from "./styles"
// import { TouchableOpacity } from "react-native-gesture-handler"

export const LoginScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }
  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Text style={style.headingText}>Login</Text>
        <TextInput
          title="Email" />
        <TextInput
          title="Password"
          isPasswordField={true} />
        <Button
          style={style.button}
          title="Login"
          onPress={() => {
            onNavigate("TabNavigator")
          }} />
        <TouchableOpacity onPress={() => {
          onNavigate('ForgotPassword')
        }}>
          <Text style={style.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
