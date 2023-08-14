/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, NewsCard, Screen, Text, ImagePicker } from "app/components"
import React, { useState } from "react"
import { Dimensions, View, Image } from "react-native"
import { style } from "./styles"
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }



  const width = Dimensions.get('window').width
  const widthWithPadding = width - 2 * 20;

  return (
    <Screen style={style.flex} preset="auto">
      <SafeAreaView style={style.container}>
        <Carousel
          loop
          width={widthWithPadding}
          height={width / 2}
          autoPlay={true}
          data={[...new Array(6).keys()]} // add in Data
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 30 }}>
                {index}
              </Text>
            </View>
          )}
        />
        <Text style={style.headingText}>News</Text>
        <View style={{ width: "100%" }}>
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
      </SafeAreaView>
    </Screen>
  )
}
