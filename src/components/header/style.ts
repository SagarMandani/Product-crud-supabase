import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 30,
        marginVertical: 10
    },
    backView: {
        padding: 5,
    },
    image: {
        width: 20,
        height: 20,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default styles;