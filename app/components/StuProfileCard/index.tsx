import React from 'react';
import { View, Text, Image } from 'react-native';
import StudentProfileCardProps from './props';
import styles from './styles';

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  imageSrc,
  studentName,
  studentId,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <Text style={styles.name}>{studentName}</Text>
      <Text style={styles.studentId}>Student ID: {studentId}</Text>
    </View>
  );
};

// export default StudentProfileCard;