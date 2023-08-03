// stores component props

import {
  GestureResponderEvent,
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native"
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete"

// extend text component with react native text props
export interface TextInputProps extends RNTextInputProps {
  title?: string
  error?: any
  isPasswordField?: boolean
  onPress?: (event: GestureResponderEvent) => void
  containerStyle?: StyleProp<ViewStyle>
  textFieldStyle?: StyleProp<ViewStyle>
  textFiledContainer?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  errorMessage?: string
  rightIcon?: any
}
