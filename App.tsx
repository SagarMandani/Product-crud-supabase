import React from 'react';
import { Text, TextInput } from 'react-native';
import AppNavigator from './src/navigation/appNavigator';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const App = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <AppNavigator />
      <FlashMessage position="top" floating={false} statusBarHeight={insets.top} />
    </>
  )
};

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

export default AppContainer;