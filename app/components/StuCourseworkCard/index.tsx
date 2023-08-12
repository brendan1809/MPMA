import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CardProps } from './props';
import styles from './styles';

export const StuCourseworkCard = (props: CardProps) => {
    const { headerText, contentItems } = props
    
    const renderItem = ({ item }: { item: string }) => {
        return (
          <View style={styles.itemContainer}>
            <TouchableOpacity>
              <Text style={styles.itemText}>{item}</Text>
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
      </View>
    );
};
  