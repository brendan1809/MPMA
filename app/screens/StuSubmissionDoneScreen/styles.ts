import { StyleSheet } from "react-native"
import { spacing } from "app/theme"

export const style = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
  // eslint-disable-next-line react-native/sort-styles
  courseContainer: {
    flex: 1,
    padding: spacing.md,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginVertical: spacing.md,
  },
  screenContentContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    marginBottom: spacing.lg,
  },
  fileName: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: spacing.md,
  },
  // eslint-disable-next-line react-native/no-color-literals
  submit: {
    color: "#08F26E",
    fontSize: 18,
    marginBottom: spacing.md,
  },
  grade: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: spacing.md,
  }
})
