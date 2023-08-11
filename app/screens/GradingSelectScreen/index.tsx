/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Screen, Text, DropdownPicker, Button } from "app/components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"


export const GradingSelectScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const items = [
    { label: 'A', value: 'A' },
    { label: 'A-', value: 'A-' },
    { label: 'B', value: 'B' },
    { label: 'B-', value: 'B-' },
    { label: 'C', value: 'C' },
  ];

  const handleSelect = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Text style={style.text}>Grade</Text>
        <DropdownPicker
          items={items}
          onSelect={handleSelect}
          placeholder="Please select a grade"></DropdownPicker>
        <Button title="Update Grade" />
      </View>
    </Screen>
  )
}
