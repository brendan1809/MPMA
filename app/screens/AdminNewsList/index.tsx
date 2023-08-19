/* eslint-disable react-native/no-inline-styles */
import { Screen, Text, TextInput } from "app/components"
import React, { useEffect, useState } from "react"

import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native"
import Icons from "@expo/vector-icons/AntDesign"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import flash from "app/config/flash"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"

export const AdminNewsListScreen = () => {
  const [loading, setLoading] = useState(false)
  const [newsList, setNewsList] = useState([])
  const [searchText, setSearchText] = useState("")
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const fetchNews = async (searchName?: string) => {
    setLoading(true)
    try {
      const newsCollectionRef = firestore().collection("news")

      // Construct the query to fetch all banners
      const query = newsCollectionRef

      // Get the query results
      const querySnapshot = await query.get()

      // Process the fetched documents
      const news = []
      querySnapshot.forEach((doc) => {
        news.push(doc.data())
      })

      // Perform partial search on the client-side
      const filteredNews = news.filter((singleNews) =>
        singleNews.title?.toLowerCase().includes(searchName?.toLowerCase()),
      )

      // Update the users state with filtered results
      setNewsList(searchName ? filteredNews : news)
      console.log(news)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retrieve banners")
    }
  }

  const deleteNews = async (newsId) => {
    setLoading(true)
    try {
      // Reference the Firestore collection for banners
      const newsCollectionRef = firestore().collection("news")

      // Delete the user document based on the banner ID
      await newsCollectionRef.doc(newsId).delete()

      // After successful deletion, fetch the updated banners
      flash("success", "Delete news successfully")
      fetchNews()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to delete news")
    }
  }

  useEffect(() => {
    // Fetch banners initially (without search)
    fetchNews()
  }, [isFocused])

  return (
    <Screen>
      <View style={style.container}>
        <TextInput
          returnKeyType="search"
          autoComplete="off"
          placeholder="Search by title"
          value={searchText}
          onChangeText={setSearchText}
          containerStyle={style.searchContainer}
          onSubmitEditing={() => {
            fetchNews(searchText)
          }}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <FlatList
            data={newsList}
            ListEmptyComponent={() => {
              return (
                <View style={style.emptyContainer}>
                  <Text style={style.emptyTitle}>There's nothing in the list!</Text>
                </View>
              )
            }}
            renderItem={({ item }) => {
              return (
                <View style={style.contentContainer}>
                  <View style={style.row}>
                    <Image source={{ uri: item?.thumbnail }} style={style.image} />
                    <View style={style.textContainer}>
                      <Text style={{ color: colors.white, marginLeft: 10 }}>
                        Title: {item.title}
                      </Text>
                      <Text style={{ color: colors.white, marginLeft: 10 }}>
                        Published: {item.createdAt.toDate().toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View style={style.logoViewContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AdminNewsListEdit", {
                          routeFrom: "edit",
                          data: item,
                        })
                      }
                    >
                      <Icons name="edit" color="white" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Warning",
                          "Are you sure you want to remove this?",
                          [
                            {
                              text: "Cancel",
                              style: "destructive",
                            },
                            {
                              text: "Confirm",
                              onPress: async () => {
                                deleteNews(item?.id)
                              },
                            },
                          ],
                          { cancelable: false },
                        )
                      }}
                    >
                      <Icons name="delete" color="white" size={22} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminNewsListEdit", { routeFrom: "add" })}
        style={style.floatingButton}
      >
        <Text style={style.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </Screen>
  )
}
