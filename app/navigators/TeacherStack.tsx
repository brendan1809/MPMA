import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CourseworkScreen, AssignmentScreen, LectureScreen } from "app/screens"

export type TeacherStackParamList = {
  Coursework: undefined
  Submission: undefined
  Lecture: undefined
}

const Stack = createNativeStackNavigator<TeacherStackParamList>()

export const TeacherStack = () => {
  return (
    <Stack.Navigator 
    initialRouteName="Coursework"
    screenOptions={({
      headerShown: true,
      gestureEnabled: true,
      title: "",
      headerTitleAlign: "center",
    })}
    >
      <Stack.Screen name="Coursework" component={CourseworkScreen} options={{ title: "Coursework"}}/>
      <Stack.Screen name="Submission" component={AssignmentScreen} options={{ title: "Add Assignment"}}/>
      <Stack.Screen name="Lecture" component={LectureScreen} options={{ title: "Add Slide"}}/>

    </Stack.Navigator>
  )
}
