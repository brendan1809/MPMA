import React from "react";
import { observer } from "mobx-react-lite";
import { Screen } from "app/components";
import { StuCourseworkCard } from "app/components/StuCourseworkCard";
import { View } from "react-native"
import { style } from "./styles"; // Import styles

export const StuCourseworkScreen = observer(function StuCourseworkScreen() {
  const contentItems = ["Item 1", "Item 2", "Item 3"];

  return (
    <Screen style={style.flex} preset="auto">
      <View style={style.container}>
        <StuCourseworkCard 
        headerText="Lecture" 
        contentItems={contentItems} 
        />

        <StuCourseworkCard 
        headerText="Assignment" 
        contentItems={[]} 
        />

        <StuCourseworkCard 
        headerText="Tutorial" 
        contentItems={contentItems} 
        />
        </View>
    </Screen>
  );
});