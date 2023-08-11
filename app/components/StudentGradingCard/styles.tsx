/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10
  },
  header: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemText: {
    color: '#333',
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: 'black', // Change this color as needed
    borderBottomWidth: 1,       // Adjust the thickness of the line
    marginVertical: 15,         // Add vertical spacing
  },
  buttonMargin: {
    marginVertical: 10
  },
});