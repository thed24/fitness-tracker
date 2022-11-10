import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from 'store';
import { useColorMode } from 'native-base';
import { HomeScreen } from '../../screens/home/home';
import { RegisterScreen } from '../../screens/register/register';
import { MainDrawerStack } from '../mainDrawerStack/mainDrawerStack';

const Stack = createNativeStackNavigator();

export function MainStack() {
  const { user } = useStore();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    const darkMode = user?.userSettings?.darkMode ?? false;
    setColorMode(darkMode ? 'dark' : 'light');
  }, [setColorMode, user?.userSettings?.darkMode]);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name="Drawer"
            component={MainDrawerStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
