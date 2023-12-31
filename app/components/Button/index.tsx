import React from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { ButtonProps } from "./props"
import { style as styles } from "./styles"
import { Text } from "../Text"
import { colors } from "app/theme"

// Simple reusable component, handles simple ui or functions
export const Button = (props: ButtonProps) => {
  const { style, titleStyle, title, loading, ...restProps } = props

  // --------------------RENDER
  return (
    <>
      <TouchableOpacity style={[styles.container, style]} {...restProps}>
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </>
  )
}
