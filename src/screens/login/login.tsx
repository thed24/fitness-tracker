import React from 'react';
import { NavigationProps } from '..';
import { AuthForm } from '../../common';
import { State, useStore } from '../../store/store';
import * as SC from '../screens.style';

// eslint-disable-next-line no-unused-vars
export function LoginScreen({ navigation }: NavigationProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { login } = useStore();

  const changeEmail = (value: string) => {
    setEmail(value);
  };

  const changePassword = (value: string) => {
    setPassword(value);
  };

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, password);
      navigation.navigate('Profile');
    }, 2000);
  };

  if (loading) {
    return <SC.Container>Loading...</SC.Container>;
  }

  return (
    <SC.Container>
      <AuthForm
        // eslint-disable-next-line global-require
        logoImageSource={require('../../../assets/logo.png')}
        disableSignup
        disableDivider
        mainText="Login"
        onLoginPress={onSubmit}
        onSignupPress={() => {}}
        onEmailChange={changeEmail}
        onPasswordChange={changePassword}
      />
    </SC.Container>
  );
}
