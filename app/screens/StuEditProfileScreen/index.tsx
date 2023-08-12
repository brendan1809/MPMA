import React from "react";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { Screen, TextInput, Button, ImagePicker } from "app/components";
import { style as styles } from "./styles";

export const StuEditProfileScreen = observer(function StuEditProfileScreen() {
  
  const handleImageChange = (selectedImage: File | null) => {
    if (selectedImage) {
      console.log('Selected Image:', selectedImage);
    } else {
      console.log('No image selected.');
    }
  };

  return (
    <Screen style={styles.screenContentContainer} preset="auto">
      <View style={styles.Container}>

        <TextInput title="Name" >John Doe</TextInput>
        <TextInput title="Name" >John Doe</TextInput>
        <TextInput title="Name" >John Doe</TextInput>
        <ImagePicker onChange={handleImageChange} />
        {/* <TextInput title="Upload Image" >Upload Image</TextInput> */}

        <Button style={styles.button} title="Update"></Button>

      </View>
    </Screen>
  );
});



