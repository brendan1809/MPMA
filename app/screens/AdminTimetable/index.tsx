import { Text, TimetableCard } from "app/components"
import React, { useEffect, useState } from "react"
import { Alert, FlatList, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import Icons from "@expo/vector-icons/AntDesign"
import { useIsFocused } from "@react-navigation/native"
import flash from "app/config/flash"
import moment from "moment"

export const AdminTimeTableScreen = ({ navigation }) => {
  const [timetable, setTimetable] = useState([])
  const isFocused = useIsFocused()

  const fetchTimetable = async () => {
    try {
      const timetableCollectionRef = firestore().collection("timetable")

      // Get the query results
      const querySnapshot = await timetableCollectionRef.get()

      // Process the fetched documents
      const timetable = []
      querySnapshot.forEach((doc) => {
        timetable.push(doc.data())
      })

      // Perform partial search on the client-side

      // Update the timetable state with filtered results
      setTimetable(timetable)
    } catch (error) {
      flash("error", "Failed to retrieve student")
    }
  }

  const deleteTimetable = async (timetableId) => {
    try {
      const timetableCollectionRef = firestore().collection("timetable")

      // Delete the timetable entry document based on its ID
      await timetableCollectionRef.doc(timetableId).delete()

      // Fetch updated timetable after deletion
      fetchTimetable()
      flash("success", "Delete timetable successfully")
    } catch (error) {
      console.error("Error deleting timetable entry:", error)
      flash("error", "Failed to delete timetable")
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
        console.log(item)
        return (
          <View style={style.container}>
            <TimetableCard
              courseName={item?.courseName}
              locationName={item?.locationName}
              courseTime={
                moment.unix(item?.startTime.seconds).format("h:mm a") +
                " - " +
                moment.unix(item?.endTime.seconds).format("h:mm a")
              }
            />
            <View style={style.logoViewContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AdminTimetableEdit", {
                    routeFrom: "edit",
                    data: item,
                  })
                }
              >
                <Icons name="edit" color="black" size={22} />
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
                          deleteTimetable(item?.id)
                        },
                      },
                    ],
                    { cancelable: false },
                  )
                }}
              >
                <Icons name="delete" color="black" size={22} />
              </TouchableOpacity>
            </View>
          </View>
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
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminTimetableEdit", { routeFrom: "add" })}
        style={style.floatingButton}
      >
        <Text style={style.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </>
  )
}
