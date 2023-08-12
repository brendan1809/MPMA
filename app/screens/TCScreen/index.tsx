import React from "react";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { Screen, Text } from "app/components";
import { style as styles } from "./styles";

export const TCScreen = observer(function TCScreen() {
  // ...

  return (
    <Screen style={styles.screenContentContainer} preset="auto">
      <View style={styles.Container}>

        <Text>Lorem ipsum</Text>

      </View>
    </Screen>
  );
});



