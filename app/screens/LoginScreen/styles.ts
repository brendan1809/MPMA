/* eslint-disable react-native/no-color-literals */
import { Dimensions, StyleSheet } from "react-native"

export const style = StyleSheet.create({
  button: { marginTop: 30 },
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: Dimensions.get("screen").height - 60,
    padding: 20,
  },
  flex: { flex: 1 },
  headingText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  logo: { height: 200, width: 200 },
  text: {
    color: "blue",
    fontSize: 16,
    marginVertical: 10,
  },
})
