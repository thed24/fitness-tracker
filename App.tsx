import { NativeBaseProvider } from "native-base";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "store";
import { useFonts } from 'expo-font';
import APIProvider from "./src/api/apiProvider";
import { createTheme } from "./src/utils/theme";
import { MainStack } from "./src/stacks";

LogBox.ignoreLogs(["Require cycle: node_modules/victory"]);

const nativeBaseConfig = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default function App() {
  const { user } = useStore();
  const [fontsLoaded] = useFonts({
    'JakartaSans': require('./assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    'JakartaSansItalic': require('./assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf'),
  });

  return (
    <NativeBaseProvider config={nativeBaseConfig} theme={createTheme(user?.userSettings?.darkMode ?? false)}>
      <NavigationContainer>
        <APIProvider>
          <MainStack />
        </APIProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
