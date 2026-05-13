import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './style';
import { Icons } from '../../common';

const Header = (props: any) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => props.goBack()} style={styles.backView}>
                <Image
                    style={styles.image}
                    source={Icons.back}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

export default Header;