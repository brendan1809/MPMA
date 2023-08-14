import { colors } from "app/theme"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.buttonBackground,
    borderRadius: 100,
    bottom: 16,
    elevation: 4,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 56,
  },
})
