import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: Colors.black,
        fontSize: 14,
        textAlign: 'center',
    },
    imgStyle: {
        height: 100,
        width: 100,
        marginBottom: 10
    }
});

export default styles;