import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TextStyle, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { colors, spacing, typography } from "../theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ProfileStack } from "./ProfileStack"
import { HomeStack } from "./HomeStack"
import { CourseStack } from "./CourseStack"

export type TabNavigatorParamList = {
  Profile: undefined
  Course: undefined
  Home: undefined
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" color={focused ? colors.primary : "grey"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={CourseStack}
        options={{
          tabBarLabel: "Course",
          tabBarIcon: ({ focused }) => (
            <Icon name="book" color={focused ? colors.primary : "grey"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon name="users" color={focused ? colors.primary : "grey"} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
