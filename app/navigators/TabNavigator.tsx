import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TextStyle, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
// import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TeacherStack } from "./TeacherStack"
import { UserStack } from "./UserStack"
import { HomeScreen } from "app/screens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export type TabNavigatorParamList = {
  TeacherStack: undefined
  // this is where to define the bottom tab navigation
  UserStack: undefined
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
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" color={focused ? colors.primary : "grey"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="TeacherStack"
        component={TeacherStack}
        options={{
          tabBarLabel: translate("teacherNavigator.course"),
          tabBarIcon: ({ focused }) => (
            <Icon name="book" color={focused ? colors.primary : "grey"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="UserStack"
        component={UserStack}
        options={{
          tabBarLabel: translate("userNavigator.course"),
          tabBarIcon: ({ focused }) => (
            <Icon name="users" color={focused ? colors.primary : "red"} size={30} />
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
