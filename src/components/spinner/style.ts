import { StyleSheet } from 'react-native';
import { Colors, Constants } from '../../common';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        height: Constants.Ratio.Height,
        width: Constants.Ratio.Width,
        backgroundColor: Colors.BlackRGB(0.3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerBox: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        padding: 30,
        borderRadius: 10
    },
    spinnerText: {
        marginTop: 10,
        fontSize: 15
    },
    moreLoading: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;