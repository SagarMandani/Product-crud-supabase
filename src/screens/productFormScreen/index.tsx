import React, { useState } from 'react';
import { Alert, Keyboard, View } from 'react-native';
import { Button, TextInput } from '../../components';
import { addProduct, updateProduct } from '../../services/productService';
import styles from './style';
import { Strings, showToast, formatApiError } from '../../common';

const AddProductScreen = ({ navigation, route }: any) => {
  const product = route?.params?.product;
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(
    product?.price ? String(product.price) : '',
  );
  const [quantity, setQuantity] = useState(
    product?.quantity ? String(product.quantity) : '',
  );

  const onConfirmAdd = (type: string) => {
    if (!name.trim() || !price.trim() || !quantity.trim()) {
      showToast(Strings.appName, Strings.fieldsError, 'error');
      return;
    }
    Alert.alert(
      Strings.appName,
      type == 'add' ? Strings.addProductMsg : Strings.updateProductMsg,
      [
        {
          text: Strings.no,
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: Strings.yes,
          style: 'destructive',
          onPress: () => {
            onSubmit(type);
          },
        },
      ],
      { cancelable: true },
    );
  };

  const onSubmit = async (type: string) => {
    try {
      Keyboard.dismiss();
      if (type == 'add') {
        await addProduct({
          name,
          price: Number(price),
          quantity: Number(quantity),
        });
        showToast(Strings.appName, Strings.proAddMsg, 'success');
      } else if (type == 'update') {
        await updateProduct(product.id, {
          name,
          price: Number(price),
          quantity: Number(quantity),
        });
        showToast(Strings.appName, Strings.proUpdateMsg, 'success');
      }
      navigation.goBack();
    } catch (e) {
      const code = (e as any)?.code;
      const message =
        code === '42501'
          ? Strings.blocksAction
          : `${type == 'update' ? Strings.add : Strings.update} ${
              Strings.failed
            }`;
      const description =
        code === '42501'
          ? `${Strings.enable} ${
              type == 'update' ? Strings.INSERT : Strings.UPDATE
            } ${Strings.policiesErr}`
          : formatApiError(e) + (code ? ` (code: ${code})` : '');
      showToast(message, description, 'error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        label={Strings.productName}
      />

      <TextInput
        value={price}
        onChangeText={setPrice}
        label={Strings.price}
        keyboardType="numeric"
      />

      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        label={Strings.quantity}
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        style={styles.btnStyle}
        labelStyle={styles.btnTitle}
        onPress={() => onConfirmAdd(product ? 'update' : 'add')}
      >
        {product ? Strings.updateProduct : Strings.addProduct}
      </Button>
    </View>
  );
};

export default AddProductScreen;
