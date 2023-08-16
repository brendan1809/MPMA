import { colors } from "app/theme"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  contentText: { color: colors.black, fontSize: 16, fontWeight: "bold" },
  contentView: {
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    widhth: "100%",
  },
  titleText: { fontSize: 22, fontWeight: "600", marginBottom: 15 },
})
