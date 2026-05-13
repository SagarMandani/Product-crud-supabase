import { StyleSheet } from 'react-native';
import Colors from './colors';

// style file
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 55
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    headerLeftStyle: {
        width: 40,
        marginLeft: 10
    },
    headerRightStyle: {
        width: 40,
        marginRight: 10,
    },
    backgroundPrimary: {
        backgroundColor: Colors.white
    },
    flexOne: {
        flex: 1
    },
    centerAlign: {
        alignItems: 'center'
    },
    centerJustify: {
        justifyContent: 'center'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column'
    },
});

export default styles;