import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    btnContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: '#F7F7F7',
    },
    addButton: {
        borderRadius: 10,
        backgroundColor: Colors.blue1,
        marginVertical: 0,
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default styles;