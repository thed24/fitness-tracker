import React from 'react';
import { NavigationProps } from '..';
import { AuthForm, Screen } from '../../common';
import { useStore } from '../../store/store';

// eslint-disable-next-line no-unused-vars
export function LoginScreen({ navigation }: NavigationProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { login, user } = useStore();

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
    }, 2000);
  };

  if (user) {
    navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
  }

  return (
    <Screen loading={loading}>
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
    </Screen>
  );
}
