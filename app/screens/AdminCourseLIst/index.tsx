import { Screen, Text, TextInput } from "app/components"
import React, { useEffect, useState } from "react"

import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native"
import Icons from "@expo/vector-icons/AntDesign"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import flash from "app/config/flash"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"

export const AdminCourseListScreen = () => {
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

  const deleteCourse = async (courseId) => {
    setLoading(true)
    try {
      // Reference the Firestore collection for users
      const courseCollectionRef = firestore().collection("course")

      console.log(courseId)
      // Delete the user document based on the user ID
      await courseCollectionRef.doc(courseId).delete()
      await deleteCoursework(courseId)
      await removeStudentFromCourse(courseId)
      await deleteTimetable(courseId)
      // After successful deletion, fetch the updated users
      flash("success", "Delete course successfully")
      fetchCourse()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to delete course")
    }
  }

  const deleteTimetable = async (courseId) => {
    try {
      const timetableCollectionRef = firestore().collection("timetable")

      // Query the timetable collection for entries with the specified courseId
      const querySnapshot = await timetableCollectionRef.where("courseId", "==", courseId).get()

      // Delete each timetable entry
      const batch = firestore().batch()
      querySnapshot.forEach((doc) => {
        const timetableRef = timetableCollectionRef.doc(doc.id)
        batch.delete(timetableRef)
      })
      await batch.commit()
    } catch (error) {
      console.error("Error deleting timetable entries:", error)
      throw error
    }
  }

  const deleteCoursework = async (courseId) => {
    setLoading(true)
    try {
      // Reference the Firestore collection for users
      const courseworkCollectionRef = firestore().collection("coursework")

      // Delete the user document based on the user ID
      const querySnapshot = await courseworkCollectionRef.where("courseId", "==", courseId).get()
      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete()
      })
      // After successful deletion, fetch the updated users
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to delete coursework")
    }
  }

  const removeStudentFromCourse = async (courseId) => {
    try {
      const studentCoureworkRef = firestore().collection("studentCourse")

      // Find and delete the document where courseId and studentId match
      const querySnapshot = await studentCoureworkRef.where("courseId", "==", courseId).get()

      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete()
      })
    } catch {
      flash("error", "Failed to remove student from course")
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
                <View style={style.contentContainer}>
                  <View style={style.row}>
                    <Image source={{ uri: item?.thumbnail }} style={style.image} />
                    <View style={style.textContainer}>
                      <Text style={{ color: colors.white }}>{item.name}</Text>
                      <Text style={{ color: colors.white }}>{item.courseCode}</Text>
                    </View>
                  </View>
                  <View style={style.logoViewContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AdminCourseListEdit", {
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
                                deleteCourse(item?.id)
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
        onPress={() => navigation.navigate("AdminCourseListEdit", { routeFrom: "add" })}
        style={style.floatingButton}
      >
        <Text style={style.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </Screen>
  )
}
