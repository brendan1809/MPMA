/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Text } from "app/components";
import { NewsProps } from './props';
import styles from './styles';

export const NewsCard = (props: NewsProps) => {
  const { imageUrl, title, datePublished, onPress } = props

  return (
    // <TouchableOpacity onPress={onPress}>
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
      <View style={{ padding: 8 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>Published on: {datePublished}</Text>
      </View>
    </TouchableOpacity>
    // </TouchableOpacity>

  );
};
