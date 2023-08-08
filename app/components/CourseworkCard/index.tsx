import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CardProps } from './props';
import styles from './styles';
import { Button } from '../Button';

export const Card = (props: CardProps) => {
    const { headerText, contentItems, footerButtonText, onFooterPress } = props
    
    const renderItem = ({ item }: { item: string }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            {/* Add Icon button(s) here */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Button</Text>
            </TouchableOpacity>
          </View>
        );
      };

    return (
      <View style={styles.cardContainer}>
        <Text style={styles.header}>{headerText}</Text>
        {contentItems.length > 0 ? (
          <FlatList
            data={contentItems}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        ) : (
          <Text style={styles.emptyText}>No items to display.</Text>
        )}
        <Button title={footerButtonText} onPress={onFooterPress} />
      </View>
    );
};
  