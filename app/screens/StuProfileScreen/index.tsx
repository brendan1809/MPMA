import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StudentProfileCard, Text } from "app/components";
import { style as styles } from "./styles";

const StuProfileScreen: React.FC = () => {
    return (
      <View style={styles.container}>
        <StudentProfileCard
          imageSrc="https://img.freepik.com/premium-photo/image-young-asian-college-student-pink-background_296537-7068.jpg?size=626&ext=jpg&ga=GA1.2.809414224.1691305519&semt=sph" // Replace with actual image URL
          studentName="John Doe"
          studentId="123456"
        />
        <View style={styles.horizontalLine} />

        <TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />

        <TouchableOpacity>
          <Text style={styles.title}>Terms & Conditions</Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />

        <TouchableOpacity>
          <Text style={styles.title}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />
      </View>
    );
  };
  
export default StuProfileScreen;