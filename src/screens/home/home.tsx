import React from 'react';
import { Text, Heading, Button, Divider } from 'native-base';
import { NavigationProps } from '..';
import * as SC from '../screens.style';
import { useStore } from '../../store/store';

export function HomeScreen({ navigation }: NavigationProps) {
  const { user } = useStore();

  if (user) {
    navigation.navigate('Profile');
  }

  return (
    <SC.Container>
      <Heading>Welcome to Fitness Tracker!</Heading>
      <Text> Please register below to get started </Text>
      <Divider my="5" w="4/6" thickness="2" />
      <Button margin="15px" paddingLeft="70px" paddingRight="70px" onPress={() => navigation.navigate('Login')}> Login </Button>
      <Button margin="5px" paddingLeft="63px" paddingRight="63px" onPress={() => navigation.navigate('Register')}> Register </Button>
    </SC.Container>
  );
}
