import { NativeBaseProvider } from "native-base";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import {
  HomeScreen,
  LoginScreen,
  ProfileStack,
  RegisterScreen,
} from "./src/screens";
import APIProvider from "./src/api/apiProvider";
import { theme } from "./src/utils/theme";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "Require cycle: node_modules/victory",
]);

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <APIProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Profile"
              component={ProfileStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </APIProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
