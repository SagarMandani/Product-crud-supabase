import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  btnStyle: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: Colors.blue1,
    paddingVertical: 6,
    elevation: 2,
    shadowColor: Colors.blue1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  btnTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  }
});

export default styles;