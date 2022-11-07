import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from 'store';
import { useTheme } from 'native-base';
import { HomeScreen } from '../../screens/home/home';
import { RegisterScreen } from '../../screens/register/register';
import { MainDrawerStack } from '../mainDrawerStack/mainDrawerStack';

const Stack = createNativeStackNavigator();

export function MainStack() {
  const { user } = useStore();
  const theme = useTheme();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name="Drawer Stack"
            component={MainDrawerStack}
            options={{
              headerStyle: { backgroundColor: theme.colors.white },
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
