import { colors } from "app/theme"
import { Dimensions, StyleSheet } from "react-native"

export const style = StyleSheet.create({
  button: { marginTop: 30 },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: colors.inputFieldBackground,
    borderColor: colors.inputFieldBorder,
    borderRadius: 8,
    flex: 0,
    height: 40,
    marginBottom: 6,
    minHeight: 40,
    padding: 0,
  },
  errorTextField: {
    borderColor: colors.error,
  },
  fieldTitle: {
    alignSelf: "flex-start",
    color: colors.black,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  flex: { flex: 1 },

  languageTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    paddingLeft: 4,
  },
  loginButton: { marginTop: 50 },
  logo: { alignSelf: "center", height: 250, width: 250 },
  marginBottomTen: { marginBottom: 10 },
  phoneCodeContainer: {
    backgroundColor: colors.inputFieldBackground,
    borderColor: colors.inputFieldBorder,
    borderRadius: 8,
    borderWidth: 1,
    height: "100%",
    justifyContent: "center",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  phoneNumberContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    marginBottom: 10,
  },
  phoneNumberInputContainer: { alignSelf: "center", marginTop: 0 },
  phoneNumberInputStyle: {
    height: 40,
    paddingLeft: 10,
    paddingVertical: 10,
    width: "100%",
  },
  phoneNumberWrapper: { flex: 1, flexDirection: "row" },
  selectedTabBar: { borderBottomColor: colors.secondary, borderBottomWidth: 2 },
  signUpButton: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    marginTop: 15,
  },
  signUpTitle: { color: colors.primary },
  tabBar: { alignItems: "center", flex: 1, justifyContent: "center" },
  tabBarContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "row",
    height: 40,
    width: "100%",
  },
  title: { fontSize: 30, fontWeight: "bold" },
  uploadImage: {
    height: 1000,
    marginBottom: 20,
    maxHeight: Dimensions.get("screen").height * 0.2,
    maxWidth: Dimensions.get("screen").height * 0.3,
    width: 1000,
    zIndex: 100,
  },
})
