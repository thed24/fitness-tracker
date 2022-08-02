import { Formik } from 'formik';
import {
  Button, Heading, Input, VStack,
} from 'native-base';
import React, { useEffect } from 'react';
import { GestureResponderEvent } from 'react-native';
import { NavigationProps } from '..';
import { Screen } from 'common';
import { useStore } from 'store';

interface RegisterValues {
  email: string;
  password: string;
  name: string;
}

// eslint-disable-next-line no-unused-vars
export function RegisterScreen({ navigation }: NavigationProps) {
  const [loading, setLoading] = React.useState(false);

  const { register, user } = useStore();

  useEffect(
    () => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
      }
    },
    [user],
  );

  const onSubmit = ({ email, password, name }: RegisterValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      register({
        id: '0', email, password, name, workouts: [],
      });
    }, 2000);
  };

  const onRegisterPress = (callback: (e?: any) => void) => (event: GestureResponderEvent) => {
    event.preventDefault();
    callback();
  };

  return (
    <Screen loading={loading}>
      <Heading marginTop="10">
        Register
      </Heading>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
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
            <Input
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name"
            />
            <Button w="100%" onPress={onRegisterPress(handleSubmit)}> Register </Button>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}
