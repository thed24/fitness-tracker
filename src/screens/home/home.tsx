import React from 'react';
import {
  Text, Heading, Button, Divider,
} from 'native-base';
import { NavigationProps } from '..';
import { useStore } from 'store';
import { Screen } from '../../components';

export function HomeScreen({ navigation }: NavigationProps) {
  const { user } = useStore();

  if (user) {
    navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
  }

  return (
    <Screen>
      <Heading marginTop="10">Welcome to Fitness Tracker!</Heading>
      <Text> Please register below to get started </Text>
      <Divider my="5" w="4/6" thickness="2" />
      <Button margin="15px" paddingLeft="70px" paddingRight="70px" onPress={() => navigation.navigate('Login')}> Login </Button>
      <Button margin="5px" paddingLeft="63px" paddingRight="63px" onPress={() => navigation.navigate('Register')}> Register </Button>
    </Screen>
  );
}
