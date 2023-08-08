import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CourseScreen, CourseworkScreen, SubmissionScreen, TimetableScreen } from "app/screens"

export type TeacherStackParamList = {
  Course: undefined
  Coursework: undefined
  Submission: undefined
  Timetable: undefined
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
      {/* <Stack.Screen name="Course" component={CourseScreen} options={{ title: "Coursework"}}/> */}
      <Stack.Screen name="Coursework" component={CourseworkScreen} options={{ title: "Coursework"}}/>
      <Stack.Screen name="Submission" component={SubmissionScreen} options={{ title: "Add Submission"}}/>
      {/* <Stack.Screen name="Timetable" component={TimetableScreen} options={{ title: "Timetable"}}/> */}

    </Stack.Navigator>
  )
}
