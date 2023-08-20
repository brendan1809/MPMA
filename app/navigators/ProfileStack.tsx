import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// import screen
// import { StuSubmissionScreen } from "app/screens/StuSubmissionScreen"
// import { StuCourseworkScreen } from "app/screens/StuCourseworkScreen"
// import { StuSubmissionDoneScreen } from "app/screens/StuSubmissionDoneScreen"
// import StuProfileScreen from "app/screens/StuProfileScreen";
import { StuEditProfileScreen } from "app/screens/StuEditProfileScreen"
import {
  StuCourseworkScreen,
  StuSubmissionDoneScreen,
  StuSubmissionScreen,
  TCScreen,
} from "app/screens"
import StuProfileScreen from "app/screens/StuProfileScreen"
// import { TCScreen } from "app/screens/TCScreen"

export type UserStackParamList = {
  StudentCoursework: undefined
  StudentSubmission: undefined
  StudentSubmissionDone: undefined
  StuProfile: undefined
  StuEditProfile: undefined
  TC: undefined
}

const Stack = createNativeStackNavigator<UserStackParamList>()

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        title: "",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="StuProfile"
        component={StuProfileScreen}
        options={{ title: "Profile Settings" }}
      />
      <Stack.Screen
        name="StuEditProfile"
        component={StuEditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  )
}
