import React from "react"
import { TouchableOpacity } from "react-native"
import { FABProps } from "./props"
import { style as styles } from "./styles"
import Icon from "react-native-vector-icons/FontAwesome"

export const FAB = (props: FABProps) => {
  const { icon, onPress } = props

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
}
