import { Button, Screen } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"

export const SplashScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }
  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Button
          style={style.button}
          onPress={() => {
            onNavigate("TabNavigator")
          }}
          title={"Sign In"}
        />
        <Button
          style={style.button}
          onPress={() => {
            onNavigate("Register")
          }}
          title={"Sign Up"}
        />
      </View>
    </Screen>
  )
}
