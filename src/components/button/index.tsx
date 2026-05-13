import React from 'react'
import { Button as PaperButton } from 'react-native-paper';
import { Colors } from '../../common';
import styles from './style';

const Button = ({ mode, style, ...props }) => {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: Colors.primary },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

export default Button;