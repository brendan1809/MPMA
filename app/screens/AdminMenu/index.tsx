/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { style } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { Screen, Text } from "app/components"
import flash from "app/config/flash"

export const AdminMenu = observer(() => {
  const navigation = useNavigation<any>()
  const { authStore } = useStores()

  const data = [
    { title: "Student", navigateTo: "AdminStudentList" },
    { title: "Lecturer", navigateTo: "AdminLecturerList" },
    { title: "Course", navigateTo: "AdminCourseList" },
    { title: "Coursework", navigateTo: "AdminCourseworkList" },
    { title: "Timetable", navigateTo: "" },
    { title: "Banner", navigateTo: "" },
    { title: "News", navigateTo: "" },
    { title: "Log Out", navigateTo: "auth" },
  ]

  return (
    <Screen>
      <View style={{ padding: 20, marginTop: 50 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (item?.title === "Log Out") {
                      authStore.resetAuthData()
                      navigation.reset({
                        index: 0,
                        routes: [{ name: item?.navigateTo }],
                      })
                      flash("success", "Log out successfully")
                    } else {
                      navigation.navigate(item?.navigateTo)
                    }
                  }}
                  style={style.contentView}
                >
                  <Text style={[style.contentText, item?.title === "Log Out" && { color: "red" }]}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              </>
            )
          }}
        />
      </View>
    </Screen>
  )
})
