import { Screen, Text, TextInput } from "app/components"
import React, { useEffect, useState } from "react"

import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native"
import Icons from "@expo/vector-icons/AntDesign"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import flash from "app/config/flash"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"

export const AdminBannerListScreen = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [bannerList, setBannerList] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const fetchBanners = async (searchName?: string) => {
    setLoading(true)
    try {
      const bannersCollectionRef = firestore().collection("banners")

      // Construct the query to fetch all banners
      const query = bannersCollectionRef

      // Get the query results
      const querySnapshot = await query.get()

      // Process the fetched documents
      const banners = []
      querySnapshot.forEach((doc) => {
        banners.push(doc.data())
      })

      // Perform partial search on the client-side
      const filteredBanners = banners.filter((banner) =>
        banner.title?.toLowerCase().includes(searchName?.toLowerCase()),
      )

      // Update the users state with filtered results
      setBannerList(searchName ? filteredBanners : banners)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retrieve banners")
    }
  }

  const deleteBanner = async (bannerId) => {
    setLoading(true)
    try {
      // Reference the Firestore collection for banners
      const bannersCollectionRef = firestore().collection("banners")

      // Delete the user document based on the banner ID
      await bannersCollectionRef.doc(bannerId).delete()

      // After successful deletion, fetch the updated banners
      flash("success", "Delete banner successfully")
      fetchBanners()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to delete banner")
    }
  }

  useEffect(() => {
    // Fetch banners initially (without search)
    fetchBanners()
  }, [isFocused])

  return (
    <Screen>
      <View style={style.container}>
        <TextInput
          returnKeyType="search"
          autoComplete="off"
          placeholder="Search by banner title"
          title="Search"
          value={searchText}
          onChangeText={setSearchText}
          containerStyle={style.searchContainer}
          onSubmitEditing={() => {
            fetchBanners(searchText)
          }}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <FlatList
            data={bannerList}
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
                      <Text style={{ color: colors.white }}>{item.title}</Text>
                    </View>
                  </View>
                  <View style={style.logoViewContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AdminBannerListEdit", {
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
                                deleteBanner(item?.id)
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
        onPress={() => navigation.navigate("AdminBannerListEdit", { routeFrom: "add" })}
        style={style.floatingButton}
      >
        <Text style={style.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </Screen>
  )
}
