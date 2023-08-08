import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "app/components"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { Card } from 'app/components/CourseworkCard';

export const CourseworkScreen = observer(function CourseScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const contentItems = ['Item 1', 'Item 2', 'Item 3'];

  // const navigateToLecture = () => {
  //   navigation.navigate("Submission")
  // };

  // const navigateToTutorial = () => {
  //   navigation.navigate("Submission")
  // }

  const navigateToAssignment = () => {
    navigation.navigate("Submission")
  }

  return (
    <Screen 
    style={$screenContentContainer} 
    preset="auto" >
      <Card
        headerText="Lecture"
        contentItems={contentItems}
        footerButtonText="Add Lecture"
      />
      <Card
        headerText="Assignment"
        contentItems={[]}
        footerButtonText="Add Assignment"
        onFooterPress={navigateToAssignment}
      />
      <Card
        headerText="Tutorial"
        contentItems={contentItems}
        footerButtonText="Add Tutorial"
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
}