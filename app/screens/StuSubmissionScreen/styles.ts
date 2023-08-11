import { StyleSheet } from "react-native"
import { spacing } from "app/theme"

export const StuSubmissionScreenStyles = StyleSheet.create({
  Title: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
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
    fontSize: 18,
    marginBottom: spacing.lg,
  },
})
