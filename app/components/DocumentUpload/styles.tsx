/* eslint-disable react-native/no-color-literals */
import { colors } from "app/theme"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    alignItems: "center",
    backgroundColor: colors.buttonBackground,
    borderRadius: 12,
    minWidth: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
