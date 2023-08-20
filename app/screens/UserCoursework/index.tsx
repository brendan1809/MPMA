/* eslint-disable react-native/no-inline-styles */
import { Screen, Text, TextInput } from "app/components"
import React, { useEffect, useState } from "react"

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from "react-native"
import Icons from "@expo/vector-icons/AntDesign"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import flash from "app/config/flash"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { colors } from "app/theme"
import { size, upperFirst, filter } from "lodash"
import { useStores } from "app/models"

export const UserCourseworkScreen = () => {
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const [courseworkList, setCourseworkList] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { authStore } = useStores()

  const courseId = route?.params

  const fetchCoursework = async () => {
    setLoading(true)
    try {
      const courseworkCollectionRef = firestore()
        .collection("coursework")
        .where("courseId", "==", courseId)

      // Get the query results
      const querySnapshot = await courseworkCollectionRef.get()

      // Process the fetched documents
      const courseworks = []
      querySnapshot.forEach((doc) => {
        courseworks.push(doc.data())
      })

      setCourseworkList(courseworks)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive coursework")
    }
  }

  const deleteCoursework = async (courseId) => {
    setLoading(true)
    try {
      // Reference the Firestore collection for users
      const courseCollectionRef = firestore().collection("coursework")

      // Delete the user document based on the user ID
      await courseCollectionRef.doc(courseId).delete()
      // After successful deletion, fetch the updated users
      flash("success", "Delete coursework successfully")
      fetchCoursework()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to delete coursework")
    }
  }

  useEffect(() => {
    fetchCoursework()
  }, [isFocused])

  const ContentView = (method) => {
    const data = filter(courseworkList, (e) => e?.method === method)
    return (
      <>
        {size(data) === 0 ? (
          <></>
        ) : (
          <View style={style.contentContainer}>
            <View style={style.textContainer}>
              <Text style={{ color: colors.white, fontWeight: "bold" }}>{upperFirst(method)}</Text>
              <View>
                <FlatList
                  data={data}
                  renderItem={({ item }) => {
                    return (
                      <View style={style.textContainer}>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: colors.white }}>{item.title}</Text>
                          <View
                            style={[
                              style.logoViewContainer,
                              authStore?.role === "student" ? { width: 30 } : { width: 80 },
                            ]}
                          >
                            {authStore?.role === "lecturer" && (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("AdminCourseworkListEdit", {
                                    routeFrom: "edit",
                                    data: item,
                                  })
                                }
                              >
                                <Icons name="edit" color="white" size={22} />
                              </TouchableOpacity>
                            )}
                            {authStore?.role === "lecturer" ? (
                              <>
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
                                            deleteCoursework(item?.id)
                                          },
                                        },
                                      ],
                                      { cancelable: false },
                                    )
                                  }}
                                >
                                  <Icons name="delete" color="white" size={22} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("AdminViewStudentCoursework", {
                                      data: { ...item, courseId },
                                    })
                                  }
                                >
                                  <Icons name="eyeo" color="white" size={22} />
                                </TouchableOpacity>
                              </>
                            ) : (
                              <>
                                {method !== "slide" ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("UserSubmission", {
                                        data: { ...item, courseId },
                                      })
                                    }
                                  >
                                    <Icons name="upload" color="white" size={22} />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity onPress={() => Linking.openURL(item?.document)}>
                                    <Icons name="download" color="white" size={22} />
                                  </TouchableOpacity>
                                )}
                              </>
                            )}
                          </View>
                        </View>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </>
    )
  }

  return (
    <Screen>
      <View style={style.container}>
        {size(courseworkList) === 0 && (
          <View style={style.emptyContainer}>
            <Text style={style.emptyTitle}>There's nothing in the list!</Text>
          </View>
        )}
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <View>
            {ContentView("assignment")}
            {ContentView("slide")}
            {ContentView("tutorial")}
          </View>
        )}
      </View>
      {authStore?.role === "lecturer" && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AdminCourseworkListEdit", { routeFrom: "add", courseId })
          }
          style={style.floatingButton}
        >
          <Text style={style.floatingButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </Screen>
  )
}
