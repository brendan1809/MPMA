import React from 'react';
import { View, Text } from 'react-native';
import { CardProps } from './props';
import styles from './styles';
import { Button } from '../Button';

export const StudentGradingCard = (props: CardProps) => {
    const { headerText, gradeText, footerButtonText, onFooterPress } = props

    return (
      <View style={styles.cardContainer}>
        <Text style={styles.header}>{headerText}</Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.itemText}>Grade: {gradeText}</Text>
        <Button style={styles.buttonMargin} title={footerButtonText} onPress={onFooterPress} />
      </View>
    );
};
  