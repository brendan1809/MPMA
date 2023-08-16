import React from "react"
import { TouchableOpacity } from "react-native"
import Icons from "react-native-vector-icons/MaterialIcons"
import { HeaderBackProps } from "./props"
import { style } from "./styles"

export const HeaderBack = (props: HeaderBackProps) => {
  return (
    <TouchableOpacity style={style.container} onPress={props.onPress}>
      <Icons name="arrow-back" size={24} />
    </TouchableOpacity>
  )
}
