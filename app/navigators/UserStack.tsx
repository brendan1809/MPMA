import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// import screen
import { StuSubmissionScreen } from "app/screens/StuSubmissionScreen"
import { StuCourseworkScreen } from "app/screens/StuCourseworkScreen"

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
      <Stack.Screen name="StudentCoursework" component={StuCourseworkScreen} options={{ title: "Student Coursework"}} />
      <Stack.Screen name="StudentSubmission" component={StuSubmissionScreen} options={{ title: "Student Submission"}}/>

    </Stack.Navigator>
  )
}
