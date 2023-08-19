/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Screen, Text } from "app/components"
import React from "react"
import { Image, View } from "react-native"
import { style } from "./styles"
import { useRoute } from "@react-navigation/native";

export const NewsDetailScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const route = useRoute()
  const newsData = route?.params?.data
  console.log(newsData.imageUrl)

  return (
    <Screen style={style.flex} preset="auto">
      <View style={style.container}>
        <Image source={{ uri: newsData?.thumbnail }} style={{ width: "100%", aspectRatio: 16 / 9 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={style.headingText}>{newsData?.title}</Text>
          <Text style={style.text}>Published on: {newsData?.createdAt.toDate().toLocaleDateString()}</Text>
          <View style={style.blackLine}></View>
          <Text style={style.text}>{newsData?.description}</Text>
        </View>
      </View>
    </Screen>
  )
}
