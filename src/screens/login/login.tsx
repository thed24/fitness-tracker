import { Formik } from 'formik';
import {
  Button, Heading, Input, VStack,
} from 'native-base';
import React, { useEffect } from 'react';
import { GestureResponderEvent, TextInput, View } from 'react-native';
import { NavigationProps } from '..';
import { ErrorAlert, Screen } from 'common';
import { useStore } from 'store';

interface LoginValues {
  email: string;
  password: string;
}

// eslint-disable-next-line no-unused-vars
export function LoginScreen({ navigation }: NavigationProps) {
  const [loading, setLoading] = React.useState(false);

  const {
    login, clearErrors, user, errors,
  } = useStore();

  useEffect(
    () => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
      }
    },
    [user],
  );

  const onSubmit = ({ email, password }: LoginValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, password);
    }, 2000);
  };

  const onLoginPress = (callback: (e?: any) => void) => (event: GestureResponderEvent) => {
    event.preventDefault();
    callback();
  };

  return (
    <Screen loading={loading}>
      {errors.length > 0 && (<ErrorAlert errors={errors} clearErrors={clearErrors} />)}
      <Heading marginTop="10">
        Login
      </Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({
          handleChange, handleBlur, handleSubmit, values,
        }) => (
          <VStack space={4} alignItems="center" marginTop="10">
            <Input
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
            />
            <Input
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
            />
            <Button w="100%" onPress={onLoginPress(handleSubmit)}> Login </Button>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}
