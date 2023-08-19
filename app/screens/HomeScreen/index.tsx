/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, NewsCard, Screen, Text, ImagePicker } from "app/components"
import React, { useEffect, useState } from "react"
import { Dimensions, View, Image } from "react-native"
import { style } from "./styles"
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import flash from "app/config/flash";

export const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [bannerList, setBannerList] = useState([])
  const [newsList, setNewsList] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const width = Dimensions.get('window').width
  const widthWithPadding = width - 2 * 20;

  const fetchBanners = async () => {
    setLoading(true)
    try {
      const bannersCollectionRef = firestore().collection("banners")

      const query = bannersCollectionRef

      const querySnapshot = await query.get()

      const banners = []

      // get the thumbnail URL for each banners
      querySnapshot.forEach((doc) => {
        banners.push(doc.data())
      })

      setBannerList(banners)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retrieve banner")
    }
  }

  const fetchNews = async () => {
    setLoading(true)
    try {
      const newsCollectionRef = firestore().collection("news")

      const query = newsCollectionRef

      const querySnapshot = await query.get()

      const news = []

      // get the thumbnail URL for each banners
      querySnapshot.forEach((doc) => {
        news.push(doc.data())
      })

      setNewsList(news)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retrieve news")
    }
  }

  useEffect(() => {
    Promise.all([fetchBanners(), fetchNews()])
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [isFocused])

  return (
    <Screen style={style.flex} preset="auto">
      <SafeAreaView style={style.container}>
        <Carousel
          loop
          width={widthWithPadding}
          height={width / 2}
          autoPlay={true}
          data={bannerList} // add in Data
          scrollAnimationDuration={2000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
              }}
            >
              <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: "100%" }} />
            </View>
          )}
        />
        <Text style={style.headingText}>News</Text>
        <View style={{ width: "100%" }}>
          {newsList.map((newsItem, index) => (
            <NewsCard
              key={index}
              imageUrl={newsItem.thumbnail}
              title={newsItem.title}
              datePublished={newsItem.createdAt.toDate().toLocaleDateString()}
              onPress={() => {
                navigation.navigate("NewsDetail", {
                  data: newsItem,
                })
              }}
            />
          ))}
        </View>
      </SafeAreaView>
    </Screen >
  )
}
