import React from 'react';
import { View, Text } from 'react-native';
import { CardProps } from './props';
import styles from './styles';

export const Card = (props: CardProps) => {
    const { headerText, contentText, footerText } = props
    return (
        <View style={styles.cardContainer}>
        <Text style={styles.header}>{headerText}</Text>
        <Text style={styles.content}>{contentText}</Text>
        <Text style={styles.footer}>{footerText}</Text>
        </View>
    );
};
  