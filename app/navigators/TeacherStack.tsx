import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { WelcomeScreen } from "app/screens"
// import { TeacherNavigator } from "./TabNavigator"
import { CourseScreen } from "app/screens"

export type TeacherStackParamList = {
  Course: undefined
}

const Stack = createNativeStackNavigator<TeacherStackParamList>()

export const TeacherStack = () => {
  return (
    <Stack.Navigator screenOptions={({
      headerShown: true,
      gestureEnabled: true,
      title: "",
      headerTitleAlign: "center",
    })}
    >
      <Stack.Screen name="Course" component={CourseScreen} options={{ title: "Manage Coursework"}}/>
    </Stack.Navigator>
  )
}
