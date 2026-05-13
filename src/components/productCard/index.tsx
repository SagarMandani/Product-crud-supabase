import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

interface Props {
    item: any;
    onDelete: () => void;
    onEdit: () => void;
}

const ProductCard = ({
    item,
    onDelete,
    onEdit,
}: Props) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.price}>
                ₹ {item.price}
            </Text>

            <Text style={styles.qty}>
                Qty: {item.quantity}
            </Text>

            <View style={styles.row}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default React.memo(ProductCard);