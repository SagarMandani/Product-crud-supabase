import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 4,
    },
    input: {
        backgroundColor: Colors.white,
    },
    description: {
        fontSize: 13,
        color: Colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 12,
        color: Colors.danger,
        marginVertical: 3,
    },
})

export default styles;