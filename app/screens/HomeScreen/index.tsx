/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, NewsCard, Screen, Text } from "app/components"
import React from "react"
import { Dimensions, View } from "react-native"
import { style } from "./styles"
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCropPicker from "react-native-image-crop-picker";

export const HomeScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const logText = () => {
    console.log("Test")
  }

  const selectImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
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
            onPress={() => {
              onNavigate("NewsDetails")
            }}
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
        <Button title="Select Image" onPress={() => {
          selectImage()
        }} />
      </SafeAreaView>
    </Screen>
  )
}
