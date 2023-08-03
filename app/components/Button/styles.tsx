import { colors } from "app/theme"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.buttonBackground,
    borderRadius: 12,
    padding: 4,
    paddingVertical: 12,
    width: "100%",
  },
  title: {
    color: colors.buttonTitle,
    fontWeight: "bold",
  },
})
