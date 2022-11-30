import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorMode } from 'native-base';
import { useGetUser } from 'api';
import { useStore } from 'store';
import { MainDrawerStack } from '../mainDrawerStack/mainDrawerStack';
import { ActivityDetailsScreen, CreateWorkout, HomeScreen, RegisterScreen } from '../../screens';

const Stack = createNativeStackNavigator();

export function MainStack() {
  const { data: user, isLoading: userLoading } = useGetUser();
  const { userId } = useStore();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    const darkMode = user?.userSettings?.darkMode ?? false;
    setColorMode(darkMode ? 'dark' : 'light');
  }, [setColorMode, user?.userSettings?.darkMode]);

  if (userId && userLoading) {
    return null;
  }

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
        <Stack.Screen
          name="Create"
          component={CreateWorkout}
        />
        <Stack.Screen
          name="Activity"
          component={ActivityDetailsScreen}
          initialParams={{ mainActivityId: 0 }}
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
