import React from 'react';
import { Text, Heading, Button } from 'native-base';
import { NavigationProps } from '..';
import * as SC from '../screens.style';
import { useStore } from '../../store/store';

// eslint-disable-next-line no-unused-vars
export function ProfileScreen({ navigation }: NavigationProps) {
  const { user, logout } = useStore();

  const onLogout = () => {
    logout();
    navigation.navigate('Home');
  };

  return (
    <SC.Container>
      <Heading>
        Welcome, {user.name}!
      </Heading>
      <Button marginTop="30px" onPress={onLogout}> Logout </Button>
    </SC.Container>
  );
}
