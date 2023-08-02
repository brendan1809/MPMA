import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, TextField, Button } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const StuCourseScreen = observer(function StuCourseScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen 
    style={$screenContentContainer} 
    preset="auto" >
        <TextField 
        label="Select "
        />
        <Button
      style= {$spacingTop}
      preset="reversed"
      text="Next screen" />
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