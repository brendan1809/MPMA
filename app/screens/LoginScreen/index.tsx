/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, Text, TextInput } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"

export const LoginScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }
  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Text>Login</Text>
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
      </View>
    </Screen>
  )
}
