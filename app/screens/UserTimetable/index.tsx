import { TimetableCard } from "app/components"
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import { useIsFocused } from "@react-navigation/native"
import flash from "app/config/flash"
import moment from "moment"
import { useStores } from "app/models"

export const UserTimetableScreen = ({ navigation }) => {
  const [timetable, setTimetable] = useState([])
  const isFocused = useIsFocused()
  const { authStore } = useStores()
  const { id: userId, role } = authStore

  const fetchTimetable = async () => {
    if (role === "student") {
      try {
        const studentCourseRef = firestore().collection("studentCourse")

        // Get all the user's enrolled courses
        const studentCourseSnapshot = await studentCourseRef.where("studentId", "==", userId).get()
        const enrolledCourseIds = studentCourseSnapshot.docs.map((doc) => doc.data().courseId)

        if (enrolledCourseIds.length > 0) {
          const timetableCollectionRef = firestore().collection("timetable")

          // Get the query results for all enrolled course IDs
          const queryPromises = enrolledCourseIds.map(async (courseId) => {
            const querySnapshot = await timetableCollectionRef
              .where("courseId", "==", courseId)
              .get()
            return querySnapshot.docs.map((doc) => doc.data())
          })

          // Wait for all queries to complete and merge the results
          const timetable = (await Promise.all(queryPromises)).flat()

          // Update the timetable state with filtered results
          setTimetable(timetable)
        }
      } catch (error) {
        flash("error", "Failed to retrieve timetable")
      }
    } else if (role === "lecturer") {
      try {
        const cousrseRef = firestore().collection("course")

        const lecturerCourse = await cousrseRef.where("lecturer", "==", userId).get()
        const enrolledCourseIds = lecturerCourse.docs.map((doc) => doc.data().id)

        if (enrolledCourseIds.length > 0) {
          const timetableCollectionRef = firestore().collection("timetable")

          const queryPromises = enrolledCourseIds.map(async (courseId) => {
            const querySnapshot = await timetableCollectionRef
              .where("courseId", "==", courseId)
              .get()

            return querySnapshot.docs.map((doc) => doc.data())
          })

          const timetableResults = await Promise.all(queryPromises)

          // Flatten the array of arrays to a single array
          const timetable = timetableResults.flat()

          // Update the timetable state with filtered results
          setTimetable(timetable)
        }
      } catch (error) {
        console.log(error)
        flash("error", "Failed to retrieve timetable")
      }
    }
  }

  useEffect(() => {
    // Fetch users initially (without search)
    fetchTimetable()
  }, [isFocused])

  const layout = useWindowDimensions()

  const TimetableContainer = (day?: string) => (
    <FlatList
      data={timetable?.filter((e) => {
        return e?.day === day
      })}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserCoursework", item?.courseId)
            }}
            style={style.container}
          >
            <TimetableCard
              courseName={item?.courseName}
              locationName={item?.locationName}
              courseTime={
                moment.unix(item?.startTime.seconds).format("h:mm a") +
                " - " +
                moment.unix(item?.endTime.seconds).format("h:mm a")
              }
            />
          </TouchableOpacity>
        )
      }}
    />
  )

  const renderScene = SceneMap({
    monday: () => TimetableContainer("Monday"),
    tuesday: () => TimetableContainer("Tuesday"),
    wednesday: () => TimetableContainer("Wednesday"),
    thursday: () => TimetableContainer("Thursday"),
    friday: () => TimetableContainer("Friday"),
  })

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "monday", title: "Mon" },
    { key: "tuesday", title: "Tue" },
    { key: "wednesday", title: "Wed" },
    { key: "thursday", title: "Thur" },
    { key: "friday", title: "Fri" },
  ])

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="black"
      inactiveColor="black"
      indicatorStyle={{ backgroundColor: "black" }}
      style={{ backgroundColor: "white" }}
    />
  )

  return (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  )
}
