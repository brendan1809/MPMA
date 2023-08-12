import { spacing } from 'app/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  cardContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    margin: spacing.lg,
    padding: spacing.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "90%",
  },
  image: {
    borderRadius: 32,
    height: 180,
    marginBottom: spacing.md,
    width: 180,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  // eslint-disable-next-line react-native/no-color-literals
  studentId: {
    color: '#555555',
    fontSize: 14,
  },
});

export default styles;