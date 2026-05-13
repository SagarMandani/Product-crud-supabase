import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const EmptyView = (props: any) => {
    const { message, child } = props;
    return (
        <View style={styles.emptyView}>
            <Text style={styles.emptyText}>{message}</Text>
            {child}
        </View>
    )
}

export default EmptyView;