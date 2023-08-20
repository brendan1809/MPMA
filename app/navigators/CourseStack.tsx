import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  AdminCourseworkDetailListScreen,
  AdminCourseworkListEditScreen,
  AdminViewStudentCourseWork,
  NewsDetailScreen,
  UserCourseworkScreen,
  UserSubmissionScreen,
  UserTimetableScreen,
} from "app/screens"

export type TeacherStackParamList = {
  Coursework: undefined
  Submission: undefined
  Lecture: undefined
  Assignment: undefined
  StudentGrading: undefined
  GradingSelect: undefined
  TeacherTimetable: undefined
  NewsDetail: undefined
  // Screens below are for admin, currently for testing purpose
  // AddNews: undefined
  // AddBanners: undefined
  // BannersList: undefined
  // NewsList: undefined
}

const Stack = createNativeStackNavigator<TeacherStackParamList>()

export const CourseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Coursework"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        title: "",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="UserTimetable"
        component={UserTimetableScreen}
        options={{ title: "Timetable" }}
      />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: "News" }} />

      <Stack.Screen
        name="UserCoursework"
        component={UserCourseworkScreen}
        options={{ title: "Coursework" }}
      />

      <Stack.Screen
        name="UserSubmission"
        component={UserSubmissionScreen}
        options={{ title: "Submission" }}
      />
      <Stack.Screen name="AdminCourseworkListEdit" component={AdminCourseworkListEditScreen} />
      <Stack.Screen
        name="AdminCourseworkDetailList"
        component={AdminCourseworkDetailListScreen}
        options={{ title: "Coursework Detail List" }}
      />
      <Stack.Screen
        name="AdminViewStudentCoursework"
        component={AdminViewStudentCourseWork}
        options={{ title: "Student Coursework" }}
      />
    </Stack.Navigator>
  )
}
