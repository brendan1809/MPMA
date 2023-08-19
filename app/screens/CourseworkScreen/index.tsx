import { Button, CourseworkCard, Screen } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"

export const CourseworkScreen = ({ navigation }) => {
  const contentItems = ["Item 1", "Item 2", "Item 3"]

  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  return (
    <Screen style={style.flex} preset="auto">
      <View style={style.container}>
        <CourseworkCard
          headerText="Lecture"
          contentItems={contentItems}
          footerButtonText="Add Lecture"
          onFooterPress={() => {
            onNavigate("Lecture")
          }}
        />
        <CourseworkCard
          headerText="Assignment"
          contentItems={[]}
          footerButtonText="Add Assignment"
          onFooterPress={() => {
            onNavigate("Submission")
          }}
        />
        <CourseworkCard
          headerText="Tutorial"
          contentItems={contentItems}
          footerButtonText="Add Tutorial"
        />
        {/* The button Below should be implemented in the item is pressed */}
        <Button
          title="Go to Assignment"
          onPress={() => {
            onNavigate("Assignment")
          }}
        />
        {/* The button Below should be implemented in the tab */}
        <Button
          title="Go to Timetable"
          onPress={() => {
            onNavigate("TeacherTimetable")
          }}
        />
        {/* The button Below should be implemented in Admin */}
        <Button
          title="Go to News"
          onPress={() => {
            onNavigate("NewsList")
          }}
        />
        {/* The button Below should be implemented in Admin */}
        <Button
          title="Go to Banners"
          onPress={() => {
            onNavigate("AdminStack")
          }}
        />
      </View>
    </Screen>
  )
}
