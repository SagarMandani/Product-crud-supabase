import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  price: {
    marginTop: 8,
    fontSize: 16,
  },
  qty: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  edit: {
    color: '#0A84FF',
    fontWeight: '700',
  },
  delete: {
    color: 'red',
    fontWeight: '700',
  },
});

export default styles;
