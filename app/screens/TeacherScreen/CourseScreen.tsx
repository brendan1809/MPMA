import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const CourseScreen = observer(function CourseScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

   function clickTest() {
    console.log("Testing")
    // navigation.navigate("TimetableScreen")
  }
  return (
    <Screen 
    style={$screenContentContainer} 
    preset="auto" >
      <Text
      text="This is reserved for the Course View where, assignment, lecture and tutorial are show."
      />
      <Button
      style= {$spacingTop}
      text="Next screen"
      onPress={clickTest} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
}

const $spacingTop: ViewStyle = {
  marginTop: spacing.lg
}