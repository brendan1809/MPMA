import React from 'react';
import { View, Text, Image } from 'react-native';
import { BannerCardProps } from './props';
import styles from './styles';

export const BannerCard = (props: BannerCardProps) => {
    const { imageUrl, title, content } = props
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardText}>{content}</Text>
            </View>
        </View>
    );
};
