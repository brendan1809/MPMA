import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HeaderBack } from "app/components"
import { AdminMenu, AdminStudentListEdit, AdminStudentListScreen } from "app/screens"

export type AdminParamList = {
  AdminMenu: undefined
  AdminStudentList: undefined
  AdminStudentListEdit: undefined
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
    </Stack.Navigator>
  )
}
