/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, TextInput, Text, TimetableCard } from "app/components"
import React from "react"
import { View, useWindowDimensions } from "react-native"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { style } from "./styles"


export const TeacherTimetableScreen = ({ navigation }) => {
    const onNavigate = (method) => {
        navigation.navigate(method)
    }

    const logText = () => {
        console.log("Testing")
    }

    const layout = useWindowDimensions();

    const MondaySchedule = () => (
        <Screen style={style.flex} preset="auto">
            <View style={style.container}>
                <TimetableCard
                    courseCode="CMC-012-120A"
                    courseName="Testing Class"
                    courseTime="10:00 - 12:00"
                    courseTeacher="Mr. Siva"
                    isButtonVisible={true}
                    onButtonPress={() => {
                        logText()
                    }}
                />
            </View>
        </Screen>
    );

    const TuesdaySchedule = () => (
        <Screen style={style.flex} preset="auto">
            <View style={style.container}>
                <TimetableCard
                    courseCode="CMC-012-120A"
                    courseName="Testing Class"
                    courseTime="10:00 - 12:00"
                    courseTeacher="Mr. Siva"
                    isButtonVisible={true}
                    onButtonPress={() => {
                        logText()
                    }}
                />
            </View>
        </Screen>
    );

    const WednesdaySchedule = () => (
        <Screen style={style.flex} preset="auto">
            <View style={style.container}>
                <TimetableCard
                    courseCode="CMC-012-120A"
                    courseName="Testing Class"
                    courseTime="10:00 - 12:00"
                    courseTeacher="Mr. Siva"
                    isButtonVisible={true}
                    onButtonPress={() => {
                        logText()
                    }}
                />
            </View>
        </Screen>
    );

    const ThursdaySchedule = () => (
        <Screen style={style.flex} preset="auto">
            <View style={style.container}>
                <TimetableCard
                    courseCode="CMC-012-120A"
                    courseName="Testing Class"
                    courseTime="10:00 - 12:00"
                    courseTeacher="Mr. Siva"
                    isButtonVisible={true}
                    onButtonPress={() => {
                        logText()
                    }}
                />
            </View>
        </Screen>
    );

    const FridaySchedule = () => (
        <Screen style={style.flex} preset="auto">
            <View style={style.container}>
                <TimetableCard
                    courseCode="CMC-012-120A"
                    courseName="Testing Class"
                    courseTime="10:00 - 12:00"
                    courseTeacher="Mr. Siva"
                    isButtonVisible={true}
                    onButtonPress={() => {
                        logText()
                    }}
                />
            </View>
        </Screen>
    );


    const renderScene = SceneMap({
        monday: MondaySchedule,
        tuesday: TuesdaySchedule,
        wednesday: WednesdaySchedule,
        thursday: ThursdaySchedule,
        friday: FridaySchedule
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'monday', title: 'Mon' },
        { key: 'tuesday', title: 'Tue' },
        { key: 'wednesday', title: 'Wed' },
        { key: 'thursday', title: 'Thur' },
        { key: 'friday', title: 'Fri' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor='black'
            inactiveColor='black'
            indicatorStyle={{ backgroundColor: 'black' }}
            style={{ backgroundColor: 'white' }}
        />
    );

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}
