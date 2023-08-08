/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
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
  },
  content: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginVertical: 16,
  },
  footer: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemText: {
    color: '#333',
    fontSize: 16,
  },
  iconButtonsContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'flex-end', // Position buttons to the right
    alignItems: 'center', // Vertically align buttons
  },
  iconButton: {
    marginLeft: 4, // Add margin between buttons
  },
});