import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, TextField } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const SubmissionScreen = observer(function CourseScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

   function clickTest() {
    console.log("Testing")
  }
  return (
    <Screen 
    style={$screenContentContainer} 
    preset="auto" >
      <TextField 
      label="Title" />
      <TextField
    //   style= {$spacingTop}
      label="subtitle" />
      <Button
      style= {$spacingTop}
      preset="reversed"
      text="Add submission"
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
