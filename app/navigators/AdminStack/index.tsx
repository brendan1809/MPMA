import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HeaderBack } from "app/components"
import { AdminMenu } from "app/screens"

export type AdminParamList = {
  BOMenu: undefined
  BOOrganization: undefined
  BOOrganizationEdit: undefined
  BOUser: undefined
  BOUserEdit: undefined
  BOEventEdit: undefined
  BOEvent: undefined
  BOAppointment: undefined
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
    </Stack.Navigator>
  )
}
