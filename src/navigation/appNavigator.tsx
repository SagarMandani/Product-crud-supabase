import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ProductListScreen, ProductFormScreen} from '../screens';
import {Constants} from '../common';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name={Constants.Screen.Products}
          component={ProductListScreen}
          options={{
            title: 'Products',
          }}
        />

        <Stack.Screen
          name={Constants.Screen.ProductForm}
          component={ProductFormScreen}
          options={({ route }: any) => ({
            title: route?.params?.product ? 'Edit Product' : 'Add Product',
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
