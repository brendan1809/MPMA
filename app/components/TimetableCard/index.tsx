import React from "react"
import { View, Text } from "react-native"
import { TimetableCardProps } from "./props"
import styles from "./styles"

export const TimetableCard = (props: TimetableCardProps) => {
  const { courseName, courseTime, locationName, bottomContent } = props

  return (
    <View style={styles.cardContent}>
      <Text style={styles.courseName}>{courseName}</Text>
      <Text style={styles.courseCode}>Location Name: {locationName}</Text>
      <Text style={styles.courseTime}>Course Time: {courseTime}</Text>
      {bottomContent && bottomContent}
    </View>
  )
}
