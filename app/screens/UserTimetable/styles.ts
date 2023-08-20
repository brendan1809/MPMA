/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  button: { marginTop: 15 },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    marginBottom: 12,
    margin: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flex: { flex: 1 },
  headingText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: "black", // Change this color as needed
    borderBottomWidth: 1, // Adjust the thickness of the line
    marginVertical: 20, // Add vertical spacing
  },
  text: {
    color: "black",
    fontSize: 16,
    marginVertical: 10,
  },
})
