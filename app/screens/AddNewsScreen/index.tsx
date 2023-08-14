/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ImagePicker, Screen, Text, TextInput } from "app/components"
import React, { useState } from "react"
import { View, Image } from "react-native"
import { style } from "./styles"

export const AddNewsScreen = ({ navigation }) => {
  const onNavigate = (method) => {
    navigation.navigate(method)
  }

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImage = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  return (
    <Screen style={style.flex} preset="auto">
      <View style={style.container}>
        <TextInput
          title="Title"
          placeholder="Write a title here"
        />
        <TextInput
          title="Content"
          placeholder="Write the content here"
          multiline={true}
          numberOfLines={10}
        />
        <View style={style.imageContainer}>
          <Text style={style.text}>Selected Image:</Text>
          {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: "100%", height: 200 }} />}
          <ImagePicker onSelectImage={handleSelectImage} />
        </View>
      </View>
    </Screen>
  )
}
