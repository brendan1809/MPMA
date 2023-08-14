import React from 'react';
import { View, Text } from 'react-native';
import { TimetableCardProps } from './props';
import styles from './styles';
import { Button } from '../Button';

export const TimetableCard = (props: TimetableCardProps) => {
  const { courseCode, courseName, courseTime, courseTeacher, isButtonVisible, onButtonPress } = props

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.courseName}>{courseName}</Text>
        <Text style={styles.courseCode}>Code: {courseCode}</Text>
        <Text style={styles.courseTime}>Course Time: {courseTime}</Text>
        <Text style={styles.courseTeacher}>Teacher: {courseTeacher}</Text>
        {isButtonVisible && (
          <Button
            title={"View enrolled students"}
            onPress={onButtonPress}
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};
