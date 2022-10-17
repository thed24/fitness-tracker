import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from 'store';
import { useTheme } from 'native-base';
import { ProfileStack } from '../profileStack/profileStack';
import { HomeScreen } from '../../screens/home/home';
import { RegisterScreen } from '../../screens/register/register';
import { LogoutButton } from './components/logoutButton';

const Stack = createNativeStackNavigator();

export function MainStack() {
  const { user } = useStore();
  const theme = useTheme();
  const createLogoutButton = (props: any) => <LogoutButton {...props} />;

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: true,
            headerRight: createLogoutButton,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.white },
          }}
        />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
