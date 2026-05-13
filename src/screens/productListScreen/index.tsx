import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../components/productCard';
import styles from './style';
import useProducts from '../../hooks/useProducts';
import { CommonStyles, Constants, Strings } from '../../common';
import Button from '../../components/button';
import { EmptyView } from '../../components';

const ProductListScreen = ({ navigation }: any) => {
  const { products, loadProducts, loading, onDelete } = useProducts();

  useFocusEffect(
    useCallback(() => {
      loadProducts();
      return () => {};
    }, [loadProducts]),
  );

  const onConfirmDelete = (productId: number) => {
    Alert.alert(
      Strings.appName,
      Strings.deleteProduct,
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
            onDelete(productId);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      {products?.length > 0 ? (
        <FlatList
          data={products}
          refreshing={loading}
          onRefresh={() => loadProducts(true)}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onDelete={() => onConfirmDelete(item.id)}
              onEdit={() =>
                navigation.navigate(Constants.Screen.ProductForm, {
                  product: item,
                })
              }
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <EmptyView message={Strings.noData} />
      )}
      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          style={styles.addButton}
          onPress={() =>
            navigation.navigate(Constants.Screen.ProductForm, {
              product: '',
            })
          }
        >
          {Strings.addProduct}
        </Button>
      </View>

      <SafeAreaView style={CommonStyles.backgroundPrimary} edges={['bottom']} />
    </View>
  );
};

export default ProductListScreen;
