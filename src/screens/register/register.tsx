import React from 'react';
import { NavigationProps } from '..';
import { AuthForm } from '../../common';
import { useStore } from '../../store/store';
import * as SC from '../screens.style';

// eslint-disable-next-line no-unused-vars
export function RegisterScreen({ navigation }: NavigationProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { register } = useStore();

  const changeEmail = (value: string) => {
    setEmail(value);
  };

  const changePassword = (value: string) => {
    setPassword(value);
  };

  const changeName = (value: string) => {
    setName(value);
  };

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      register({
        id: '0', email, password, name,
      });
      navigation.navigate('Profile');
    }, 2000);
  };

  if (loading) {
    return <SC.Container>Loading...</SC.Container>;
  }

  return (
    <SC.Container>
      <AuthForm
        mainText="Register"
        // eslint-disable-next-line global-require
        logoImageSource={require('../../../assets/logo.png')}
        disableDivider
        disableSignup
        onLoginPress={onSubmit}
        onSignupPress={() => {}}
        onNameChange={changeName}
        onEmailChange={changeEmail}
        onPasswordChange={changePassword}
      />
    </SC.Container>
  );
}
