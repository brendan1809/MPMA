import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CardProps } from './props';
import styles from './styles';
import { Button } from '../Button';
import Icon from "react-native-vector-icons/FontAwesome"

export const CourseworkCard = (props: CardProps) => {
    const { headerText, contentItems, footerButtonText, onFooterPress } = props
    
    const renderItem = ({ item }: { item: string }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            {/* Add Icon button(s) here */}
            <View style={styles.iconButtonsContainer}>
              <TouchableOpacity>
                <Icon name="edit" size={35}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="remove" size={35} color="red" style={styles.iconButton}/>
              </TouchableOpacity>
            </View>
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
  