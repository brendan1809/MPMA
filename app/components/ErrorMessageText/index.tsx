import React from "react"
import { TextProps } from "./props"
import { style as styles } from "./styles"
import { Text } from "../Text"

// Simple reusable component, handles simple ui or functions
export const ErrorMessage = (props: TextProps) => {
  const { style, customMessage, errorType } = props

  const renderErrorMessage = (error) => {
    const errMsg = error === "required" ? "This field is required" : customMessage

    if (error || customMessage) {
      return <Text style={[styles.errorText, style]}>{errMsg}</Text>
    }

    return null
  }

  // --------------------RENDER
  return renderErrorMessage(errorType)
}
