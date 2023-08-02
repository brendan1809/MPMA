import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TextStyle , ViewStyle } from "react-native"
import { Icon } from "../components"
// import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { translate } from "../i18n"
// import { Screen, Text } from "app/components"
import { colors, spacing, typography } from "../theme"
// import { CourseScreen } from "../screens"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TeacherStack } from "./TeacherStack"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export type TabNavigatorParamList = {
  TeacherStack: undefined
  // this is where to define the bottom tab navigation
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
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
  >

    <Tab.Screen
      name="TeacherStack"
      component={TeacherStack}
      options={{
        tabBarLabel: translate("teacherNavigator.course"),
        tabBarIcon: ({ focused }) => (
          <Icon icon="community" color={focused && colors.tint} size={30} />
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