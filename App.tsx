import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import APIProvider from './src/api/apiProvider';
import { nativeTheme, paperTheme } from './src/utils/theme';
import { MainStack } from './src/stacks';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export default function App() {
  useFonts({
    JakartaSans: require('./assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    JakartaSansItalic: require('./assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf'),
  });

  return (
    <NativeBaseProvider config={nativeBaseConfig} theme={nativeTheme}>
      <NavigationContainer>
        <APIProvider>
          <PaperProvider theme={paperTheme}>
            <MainStack />
          </PaperProvider>
        </APIProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
