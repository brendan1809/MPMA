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
  logo: { height: 200, width: 200 },
})
