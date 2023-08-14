/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BannerCard, FAB, NewsCard, Screen } from "app/components"
import React, { useState } from "react"
import { View, Image, FlatList } from "react-native"
import { style } from "./styles"

export const NewsListScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }



  return (
    <>
      <Screen style={style.flex} preset="auto">
        <View style={style.container}>
          <NewsCard
            imageUrl="https://fakeimg.pl/350x200/?text=Hellos"
            title="Haloha"
            datePublished="12/12/2021"
          />
          <NewsCard
            imageUrl="https://fakeimg.pl/350x200/?text=Hellos"
            title="Haloha"
            datePublished="12/12/2021"
          />
          <NewsCard
            imageUrl="https://fakeimg.pl/350x200/?text=Hellos"
            title="Haloha"
            datePublished="12/12/2021"
          />
        </View>
      </Screen>
      <FAB
        icon="plus"
        onPress={() => {
          onNavigate("AddNews")
        }}
      />
    </>
  )
}
