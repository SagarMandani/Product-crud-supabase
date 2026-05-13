import React from 'react';
import { View, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import styles from './style';

interface Props {
    value: string;
    label: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: any;
    errorText?: string;
    description?: string;
}

const TextInput = ({ errorText, description, label, ...props }: Props) => {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                label={label}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

export default TextInput;