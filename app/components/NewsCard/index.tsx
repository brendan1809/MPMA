import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from "app/components";
import { NewsProps } from './props';
import styles from './styles';

export const NewsCard = (props: NewsProps) => {
  const { imageUrl, title, datePublished, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>Published on: {datePublished}</Text>
      </View>
    </TouchableOpacity>

  );
};
