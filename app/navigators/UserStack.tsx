import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StuCourseScreen } from "app/screens/UserScreen"

export type UserStackParamList = {
  Coursework: undefined
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
      <Stack.Screen name="Coursework" component={StuCourseScreen} options={{ title: "Coursework"}}/>
    </Stack.Navigator>
  )
}