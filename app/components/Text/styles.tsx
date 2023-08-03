import { StyleSheet } from "react-native"
import { typography } from "../../theme/typography"
import { colors } from "app/theme"

export const style = StyleSheet.create({
  text: {
    color: colors.black,
    fontFamily: typography.primary.normal,
  },
})
