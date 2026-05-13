import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from './style';
import { Colors, Strings } from '../../common';

// spinner loading
export const Spinner = () => {
    return (
        <View style={styles.container}>
            <View style={styles.spinnerBox}>
                <ActivityIndicator color={Colors.primary} size='large' />
                <Text style={styles.spinnerText}>{Strings.pleaseWait}</Text>
            </View>
        </View>
    )
}

// spinner more loading
export const SpinnerMoreLoading = () => {
    return (
        <View style={styles.moreLoading}>
            <ActivityIndicator color={Colors.primary} size='large' />
        </View>
    )
}