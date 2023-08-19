import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HeaderBack } from "app/components"
import {
  AdminCourseListEdit,
  AdminCourseListScreen,
  AdminCourseworkDetailListScreen,
  AdminCourseworkListEditScreen,
  AdminCourseworkListScreen,
  AdminLecturerListEditScreen,
  AdminLecturerListScreen,
  AdminMenu,
  AdminStudentListEdit,
  AdminStudentListScreen,
} from "app/screens"

export type AdminParamList = {
  AdminMenu: undefined
  AdminStudentList: undefined
  AdminStudentListEdit: undefined
  AdminLecturerList: undefined
  AdminLecturerListEdit: undefined
  AdminCourseList: undefined
  AdminCourseListEdit: undefined
  AdminCourseworkList: undefined
  AdminCourseworkListEdit: undefined
  AdminCourseworkDetailList: undefined
}
const Stack = createNativeStackNavigator<AdminParamList>()

export const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        gestureEnabled: true,
        title: "",
        headerTitleAlign: "center",
        cardStyle: { flex: 1 },
        headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
      })}
    >
      <Stack.Screen name="AdminMenu" component={AdminMenu} options={{ headerShown: false }} />
      <Stack.Screen
        name="AdminStudentList"
        component={AdminStudentListScreen}
        options={{ title: "Student List" }}
      />
      <Stack.Screen name="AdminStudentListEdit" component={AdminStudentListEdit} />
      <Stack.Screen
        name="AdminLecturerList"
        component={AdminLecturerListScreen}
        options={{ title: "Lecturer List" }}
      />
      <Stack.Screen name="AdminLecturerListEdit" component={AdminLecturerListEditScreen} />
      <Stack.Screen
        name="AdminCourseList"
        component={AdminCourseListScreen}
        options={{ title: "Course List" }}
      />
      <Stack.Screen name="AdminCourseListEdit" component={AdminCourseListEdit} />
      <Stack.Screen
        name="AdminCourseworkList"
        component={AdminCourseworkListScreen}
        options={{ title: "Coursework List" }}
      />
      <Stack.Screen name="AdminCourseworkListEdit" component={AdminCourseworkListEditScreen} />
      <Stack.Screen
        name="AdminCourseworkDetailList"
        component={AdminCourseworkDetailListScreen}
        options={{ title: "Coursework Detail List" }}
      />
    </Stack.Navigator>
  )
}
