import { colors } from "app/theme"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
  },
  contentContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  emptyContainer: { alignItems: "center", flex: 1 },
  emptyTitle: { color: colors.black, fontSize: 24 },
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
  image: { height: "100%", width: "100%" },
  logoViewContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
    width: 60,
  },
  row: { flexDirection: "row" },
  searchContainer: { marginBottom: 20 },
  textContainer: {
    height: 100,
    justifyContent: "space-around",
  },
})
