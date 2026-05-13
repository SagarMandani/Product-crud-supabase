import React from 'react'
import { View, ActivityIndicator, Text,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, CommonStyles, Strings } from '../../common';
import styles from './style';

const Splash = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} edges={['top', 'left', 'right']} />
            <Text style={styles.appName}>{Strings.appName}</Text>
            <ActivityIndicator size='large' color={Colors.black} />
            <SafeAreaView style={CommonStyles.backgroundPrimary} edges={['bottom']} />
        </View>
    );
};

export default Splash;