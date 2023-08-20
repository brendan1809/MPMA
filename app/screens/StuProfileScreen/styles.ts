import { StyleSheet } from "react-native"
import { spacing } from "app/theme"

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  // eslint-disable-next-line react-native/no-color-literals
  horizontalLine: {
    borderBottomWidth: 1,
    // eslint-disable-next-line react-native/sort-styles
    borderBottomColor: "grey",
    marginHorizontal: spacing.lg,
  },
  title: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
})
