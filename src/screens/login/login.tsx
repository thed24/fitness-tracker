import { Formik } from "formik";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { FormInput, Screen, Button } from "components";
import { NavigationProps } from "types";
import { VStack } from "native-base";
import { useLogin } from "api";
import { LoginSchema } from "./loginSchema";
import * as SC from "./login.styles";

export interface LoginValues {
  email: string;
  password: string;
}

export function LoginScreen({ navigation }: NavigationProps) {
  const { isLoading, mutate } = useLogin();

  const onSubmit = ({ email, password }: LoginValues) => {
    mutate({ email, password });
  };

  const onLoginPress =
    (callback: (e?: any) => void) => (event: GestureResponderEvent) => {
      event.preventDefault();
      callback();
    };

  return (
    <Screen loading={isLoading}>
      <Formik
        validationSchema={LoginSchema}
        validateOnChange
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <SC.Container>
              <FormInput
                required
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={errors.email && touched.email ? errors.email : undefined}
                name="Email"
              />
              <FormInput
                required
                type="password"
                error={errors.password && touched.password ? errors.password : undefined}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                name="Password"
              />
            </SC.Container>
            <VStack
              position="absolute"
              bottom={5}
              space={4}
              alignItems="center"
              marginTop="10"
              w="75%"
            >
              <Button size="md" onPress={onLoginPress(handleSubmit)}>
                Login
              </Button>
            </VStack>
          </>
        )}
      </Formik>
    </Screen>
  );
}
