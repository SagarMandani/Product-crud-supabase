import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appName: {
        marginBottom: 20,
        fontSize: 18
    },
})

export default styles;