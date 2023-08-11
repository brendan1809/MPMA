/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, TextInput, Text } from "app/components"
import React from "react"
import { View, useWindowDimensions } from "react-native"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { style } from "./styles"


export const TeacherTimetableScreen = ({ navigation }) => {
    const onNavigate = (method) => {
        navigation.navigate(method)
    }

    const layout = useWindowDimensions();

    const MondaySchedule = () => (
        <Screen style={style.flex} preset="auto">
            <View style={style.container}>
                <Text>Testing 1</Text>
            </View>
        </Screen>
    );

    const TuesdaySchedule = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );

    const WednesdaySchedule = () => (
        <View style={{ flex: 1, backgroundColor: '#12ab62' }} />
    );

    const ThursdaySchedule = () => (
        <View style={{ flex: 1, backgroundColor: '#36acfe' }} />
    );

    const FridaySchedule = () => (
        <View style={{ flex: 1, backgroundColor: '#13aedf' }} />
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
        // <Screen style={style.flex}>
        //     <View style={style.container}>

        //     </View>
        // </Screen>
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}
