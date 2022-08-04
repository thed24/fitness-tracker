import { Formik } from 'formik';
import {
  Button, Heading, Input, VStack,
} from 'native-base';
import React, { useEffect } from 'react';
import { GestureResponderEvent } from 'react-native';
import { NavigationProps } from '..';
import { ErrorAlert, Screen } from 'components';
import { useStore } from 'store';
import { useLogin } from '../../api/auth/useLogin';

interface LoginValues {
  email: string;
  password: string;
}

// eslint-disable-next-line no-unused-vars
export function LoginScreen({ navigation }: NavigationProps) {
  const { data, error, isLoading, mutate } = useLogin();
  const [errors, setErrors] = React.useState<string[]>([]);
  const { setUser } = useStore();

  useEffect(
    () => {
      if (data) {
        setUser(data.user);
        navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
      } else if (error) {
        setErrors([error.message]);
      }
    },
    [data, error],
  );

  const onSubmit = ({ email, password }: LoginValues) => {
    mutate({ email, password });
  };

  const onLoginPress = (callback: (e?: any) => void) => (event: GestureResponderEvent) => {
    event.preventDefault();
    callback();
  };

  const onClearErrors = () => {
    setErrors([]);
  }

  return (
    <Screen loading={isLoading}>
      {errors.length > 0 && (<ErrorAlert errors={errors} clearErrors={onClearErrors} />)}
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
