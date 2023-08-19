/* eslint-disable react-native/no-color-literals */
import { colors } from "app/theme"
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
  floatingButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 9999,
    bottom: 30,
    height: 60,
    justifyContent: "center",
    paddingBottom: 3,
    position: "absolute",
    right: 20,
    width: 60,
  },
  floatingButtonText: { color: colors.white, fontSize: 30, fontWeight: "bold" },
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
  logoViewContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    width: 60,
  },
  text: {
    color: "black",
    fontSize: 16,
    marginVertical: 10,
  },
})
