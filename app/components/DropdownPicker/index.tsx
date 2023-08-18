/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View } from "react-native"
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker"
import { styles } from "./styles"
import { colors } from "app/theme"

export const DropdownPicker = (props: DropDownPickerProps) => {
  const { ...restProps } = props

  return (
    <DropDownPicker
      listMode="MODAL"
      searchable={true}
      style={{
        alignItems: "center",
        backgroundColor: colors.inputFieldBackground,
        borderColor: colors.inputFieldBorder,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 6,
        paddingRight: 10,
      }}
      dropDownContainerStyle={{
        width: 170,
      }}
      placeholderStyle={{ color: colors.placeholderText }}
      labelStyle={{
        fontSize: 16,
      }}
      autoScroll={true}
      {...restProps} // Pass the rest of the props to the original DropDownPicker
    />
  )
}
