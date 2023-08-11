import React from "react";
import { observer } from "mobx-react-lite";
import { Screen } from "app/components";
import { Card } from "app/components/StuCourseworkCard";
import { $screenContentContainer } from "./styles"; // Import styles

export const StuCourseworkScreen = observer(function StuCourseworkScreen() {
  const contentItems = ["Item 1", "Item 2", "Item 3"];

  return (
    <Screen style={$screenContentContainer} preset="auto">
      <Card headerText="Lecture" contentItems={contentItems} />
      <Card headerText="Assignment" contentItems={[]} />
      <Card headerText="Tutorial" contentItems={contentItems} />
    </Screen>
  );
});