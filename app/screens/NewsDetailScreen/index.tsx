/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NewsCard, Screen, Text } from "app/components"
import React from "react"
import { Dimensions, Image } from "react-native"
import { style } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

export const NewsDetailScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const route = useRoute()
  const newsData = route?.params?.data
  const screenWidth = Dimensions.get('window').width;
  console.log(newsData.imageUrl)

  return (
    <Screen style={style.flex} preset="auto">
      <SafeAreaView style={style.container}>
        <Image source={{ uri: newsData.thumbnail }} style={{ width: screenWidth, aspectRatio: 4 / 2 }} />
        <Text style={style.headingText}>{newsData.title}</Text>
        <Text style={style.text}>{newsData.description}</Text>
      </SafeAreaView>
    </Screen>
  )
}
