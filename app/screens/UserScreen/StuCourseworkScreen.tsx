import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "app/components"
import { spacing } from "app/theme"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { Card } from "app/components/StuCourseworkCard"

export const StuCourseworkScreen = observer(function StuCourseworkScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const contentItems = ["Item 1", "Item 2", "Item 3"]

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <Screen style={$screenContentContainer} preset="auto">
      <Card headerText="Lecture" contentItems={contentItems} />
      <Card headerText="Assignment" contentItems={[]} />
      <Card headerText="Tutorial" contentItems={contentItems} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
}
