import React, { useState } from "react"
import { View, TextInput as RNTextInput, TouchableOpacity } from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { TextInputProps } from "./props"
import { style as styles } from "./styles"
import { Text } from "../Text"
import { ErrorMessage } from "../ErrorMessageText"

// Simple reusable component, handles simple ui or functions
export const TextInput = (props: TextInputProps) => {
  const {
    title,
    error,
    onPress,
    isPasswordField = false,
    containerStyle,
    titleStyle,
    textFieldStyle,
    textFiledContainer,
    errorMessage,
    rightIcon,
    ...restProps
  } = props

  const [isVisible, setIsVisible] = useState(false)

  // --------------------RENDER
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        <TouchableOpacity onPress={onPress && onPress}>
          <View
            pointerEvents={onPress ? "none" : "auto"}
            style={[styles.textFieldContainer, error && styles.errorTextField, textFiledContainer]}
          >
            <RNTextInput
              style={[styles.textField, textFieldStyle]}
              secureTextEntry={isPasswordField && !isVisible}
              {...restProps}
            />
            {isPasswordField && (
              <Icon
                name={isVisible ? "eye" : "eye-off"}
                color={"light-grey"}
                size={24}
                onPress={() => setIsVisible(!isVisible)}
              />
            )}
            {rightIcon && rightIcon()}
          </View>
        </TouchableOpacity>

        {error && <ErrorMessage errorType={error.type} customMessage={errorMessage} />}
      </View>
    </>
  )
}
