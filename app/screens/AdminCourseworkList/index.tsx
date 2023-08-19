import { Screen, Text, TextInput } from "app/components"
import React, { useEffect, useState } from "react"

import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native"
import Icons from "@expo/vector-icons/AntDesign"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import flash from "app/config/flash"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"

export const AdminCourseworkListScreen = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [courseList, setCourseList] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const fetchCourse = async (searchName?: string) => {
    setLoading(true)
    try {
      const courseCollectionRef = firestore().collection("course")

      // Get the query results
      const querySnapshot = await courseCollectionRef.get()

      // Process the fetched documents
      const courses = []
      querySnapshot.forEach((doc) => {
        courses.push(doc.data())
      })

      // Perform partial search on the client-side
      const filteredCourses = courses.filter((course) =>
        course.name?.toLowerCase().includes(searchName?.toLowerCase()),
      )

      setCourseList(searchName ? filteredCourses : courses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive course")
    }
  }

  useEffect(() => {
    fetchCourse()
  }, [isFocused])

  return (
    <Screen>
      <View style={style.container}>
        <TextInput
          returnKeyType="search"
          autoComplete="off"
          placeholder="Search by name"
          value={searchText}
          onChangeText={setSearchText}
          containerStyle={style.searchContainer}
          onSubmitEditing={() => {
            fetchCourse(searchText)
          }}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <FlatList
            data={courseList}
            ListEmptyComponent={() => {
              return (
                <View style={style.emptyContainer}>
                  <Text style={style.emptyTitle}>There's nothing in the list!</Text>
                </View>
              )
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={style.contentContainer}
                  onPress={() => navigation.navigate("AdminCourseworkDetailList", item?.id)}
                >
                  <View style={style.row}>
                    <Image source={{ uri: item?.thumbnail }} style={style.image} />
                    <View style={style.textContainer}>
                      <Text style={{ color: colors.white }}>{item.name}</Text>
                      <Text style={{ color: colors.white }}>{item.courseCode}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        )}
      </View>
    </Screen>
  )
}
