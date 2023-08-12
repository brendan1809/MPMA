import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CourseworkScreen, SubmissionScreen, LectureScreen, AssignmentScreen, StudentGradingScreen, GradingSelectScreen, TeacherTimetableScreen } from "app/screens"

export type TeacherStackParamList = {
  Coursework: undefined
  Submission: undefined
  Lecture: undefined
  Assignment: undefined
  StudentGrading: undefined
  GradingSelect: undefined
  TeacherTimetable: undefined
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
      <Stack.Screen name="Coursework" component={CourseworkScreen} options={{ title: "Coursework" }} />
      <Stack.Screen name="Submission" component={SubmissionScreen} options={{ title: "Add Assignment" }} />
      <Stack.Screen name="Lecture" component={LectureScreen} options={{ title: "Add Slide" }} />
      <Stack.Screen name="Assignment" component={AssignmentScreen} options={{ title: "Assignment Details" }} />
      <Stack.Screen name="StudentGrading" component={StudentGradingScreen} options={{ title: "Student Grading List" }} />
      <Stack.Screen name="GradingSelect" component={GradingSelectScreen} options={{ title: "Student 1" }} />
      <Stack.Screen name="TeacherTimetable" component={TeacherTimetableScreen} options={{ title: "Timetable" }} />

    </Stack.Navigator>
  )
}
