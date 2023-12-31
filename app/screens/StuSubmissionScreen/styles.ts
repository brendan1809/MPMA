import { StyleSheet } from "react-native"
import { spacing } from "app/theme"

export const StuSubmissionScreenStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  question: {
    color: "#0000EE",
    fontSize: 18,
    marginBottom: spacing.md,
  },
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
  button: {
    marginTop: 15
  }
})
