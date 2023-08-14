import React from 'react';
import { View } from 'react-native';
import { ImagePickerProps } from './props';
import styles from './styles';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Button } from '../Button';

export const ImagePicker = (props: ImagePickerProps) => {
  const { onSelectImage } = props

  const handlePickImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      });
      onSelectImage(image.path);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  return (
    <View>
      <Button
        style={styles.button}
        title='Add an Image'
        onPress={handlePickImage}
      />
    </View>
  );
};