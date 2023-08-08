import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StuCourseworkScreen, StuSubmissionScreen } from "app/screens"

export type UserStackParamList = {
  StudentCoursework: undefined
  StudentSubmission: undefined
}

const Stack = createNativeStackNavigator<UserStackParamList>()

export const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={({
      headerShown: true,
      gestureEnabled: true,
      title: "",
      headerTitleAlign: "center",
      
    })}
    >
      {/* <Stack.Screen name="StudentCoursework" component={StuCourseworkScreen} options={{ title: "Student Coursework"}} /> */}
      <Stack.Screen name="StudentSubmission" component={StuSubmissionScreen} options={{ title: "Student Submission"}}/>

    </Stack.Navigator>
  )
}
