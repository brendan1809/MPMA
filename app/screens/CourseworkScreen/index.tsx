import { CourseworkCard, Screen } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"

export const CourseworkScreen = ({ navigation }) => {

  const contentItems = ['Item 1', 'Item 2', 'Item 3'];

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
      </View>
    </Screen>
  )
}
