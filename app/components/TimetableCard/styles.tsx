/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    marginTop: 8
  },
  cardContainer: {
    flexDirection: 'row',
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
  cardContent: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseCode: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  courseTime: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  courseTeacher: {
    fontSize: 14,
    color: '#999',
  },
});