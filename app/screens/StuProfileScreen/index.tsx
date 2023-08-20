import React from "react"
import { TouchableOpacity, View } from "react-native"
import { StudentProfileCard, Text } from "app/components"
import { style as styles } from "./styles"
import flash from "app/config/flash"
import { useStores } from "app/models"

const StuProfileScreen: React.FC = ({ navigation }) => {
  const { authStore } = useStores()
  return (
    <View style={styles.container}>
      <StudentProfileCard
        imageSrc={authStore?.thumbnail}
        studentName={authStore?.fullName}
        studentId={authStore?.studentId}
      />
      <View style={styles.horizontalLine} />

      <TouchableOpacity
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Splash" }] })
          flash("success", "Log out successfully")
          authStore?.resetAuthData()
        }}
      >
        <Text style={styles.title}>Log out</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />
    </View>
  )
}

export default StuProfileScreen
