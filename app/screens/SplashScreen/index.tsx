import { Button, Screen } from "app/components"
import React from "react"
import { Image, View } from "react-native"
import { style } from "./styles"
import logo from "assets/images/main-logo.png"

export const SplashScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }
  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Image source={logo} style={style.logo} resizeMode="contain" />
        <Button
          style={style.button}
          onPress={() => {
            onNavigate("Login")
          }}
          title={"Sign In"}
        />
      </View>
    </Screen>
  )
}
