/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BannerCard, FAB, Screen } from "app/components"
import React, { useState } from "react"
import { View, FlatList } from "react-native"
import { style } from "./styles"

export const BannersListScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const data = [
    {
      imageUrl: 'https://fakeimg.pl/350x200/?text=Hello',
      title: 'Card 1 Title',
      content: 'Content for Card 1',
    },
    {
      imageUrl: 'https://fakeimg.pl/350x200/?text=Hello',
      title: 'Card 2 Title',
      content: 'Content for Card 2',
    },
  ];

  return (
    <>
      <Screen style={style.flex} preset="auto">
        <View style={style.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <BannerCard imageUrl={item.imageUrl} title={item.title} content={item.content} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Screen>
      <FAB
        icon="plus"
        onPress={() => {
          onNavigate("AddBanners")
        }}
      />
    </>
  )

}
