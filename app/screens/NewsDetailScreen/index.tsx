/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NewsCard, Screen, Text } from "app/components"
import React from "react"
import { style } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context";

export const NewsDetailScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  return (
    <Screen style={style.flex} preset="auto">
      <SafeAreaView style={style.container}>

      </SafeAreaView>
    </Screen>
  )
}
