/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        flexDirection: 'row',
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
    cardImage: {
        borderRadius: 8,
        height: 100,
        marginRight: 16,
        width: 100,
    },
    cardText: {
        color: '#666',
        fontSize: 14,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});