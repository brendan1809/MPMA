/* eslint-disable react-native/no-color-literals */
import { Dimensions, StyleSheet } from "react-native"

export const style = StyleSheet.create({
  button: { marginTop: 15 },
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    minHeight: Dimensions.get("screen").height - 60,
    padding: 20,
  },
  flex: { flex: 1 },
  headingText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  horizontalLine: {
    borderBottomColor: 'black', // Change this color as needed
    borderBottomWidth: 1,       // Adjust the thickness of the line
    marginVertical: 20,         // Add vertical spacing
  },
  text: {
    color: "black",
    fontSize: 16,
    marginVertical: 10,
  },
})
