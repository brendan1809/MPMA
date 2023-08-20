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
import moment from "moment"

export const AdminViewStudentCourseWork = () => {
  const [loading, setLoading] = useState(false)
  const [courseWorkList, setCourseworkList] = useState([])
  const route = useRoute()
  const isFocused = useIsFocused()

  const { courseId, id } = route?.params?.data || {}

  const fetchCoursework = async () => {
    setLoading(true)
    try {
      const courseworkCollectionRef = firestore()
        .collection("studentCoursework")
        .where("courseId", "==", courseId)
        .where("courseworkId", "==", id)

      // Construct the query to fetch all banners
      const query = courseworkCollectionRef

      // Get the query results
      const querySnapshot = await query.get()

      // Process the fetched documents
      const coursework = []
      for (const doc of querySnapshot.docs) {
        const courseworkData = doc.data()
        // Fetch student name based on studentId
        const studentDoc = await firestore().collection("users").doc(courseworkData.studentId).get()

        const studentName = studentDoc.data()?.fullName || "Unknown Student" // Use a default name if not found
        coursework.push({ ...courseworkData, studentName })
      }

      // Update the users state with filtered results
      setCourseworkList(coursework)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      flash("error", "Failed to retrieve coursework")
    }
  }

  useEffect(() => {
    fetchCoursework()
  }, [isFocused])

  return (
    <Screen>
      <View style={style.container}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <FlatList
            data={courseWorkList}
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
                    <View style={style.textContainer}>
                      <Text style={{ color: colors.white }}>Name: {item?.studentName}</Text>
                      <Text style={{ color: colors.white }}>
                        Created At: {moment.unix(item?.createdAt.seconds).format("LLL")}
                      </Text>
                      <Text style={{ color: colors.white }}>
                        Updated At: {moment.unix(item?.updatedAt.seconds).format("LLL")}
                      </Text>
                    </View>
                  </View>
                  <View style={style.logoViewContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(item?.document)
                      }}
                    >
                      <Icons name="download" color="white" size={22} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          />
        )}
      </View>
    </Screen>
  )
}
