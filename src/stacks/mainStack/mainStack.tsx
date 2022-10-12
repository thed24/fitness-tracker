import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStore } from "store";
import { ProfileStack } from "../profileStack/profileStack";
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { HomeScreen } from "../../screens/home/home";
import { RegisterScreen } from "../../screens/register/register";


const Stack = createNativeStackNavigator();

export function MainStack() {
  const { user } = useStore();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Profile"
            component={ProfileStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardStack}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
