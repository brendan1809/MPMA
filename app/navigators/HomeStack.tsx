import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NewsDetailScreen, HomeScreen } from "app/screens"

export type HomeStackParamList = {
  HomeScreen: undefined
  NewsDetail: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        title: "",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: "News" }} />
    </Stack.Navigator>
  )
}
