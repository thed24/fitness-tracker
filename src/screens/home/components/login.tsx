import { Formik } from "formik";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { FormInput } from "components";
import { View, Button } from "native-base";
import { useLogin } from "api";
import { LoginSchema } from "./loginSchema";
import * as SC from "./login.styles";

export interface LoginValues {
  email: string;
  password: string;
}

export function Login() {
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
    <View w="100%">
      <Formik
        validationSchema={LoginSchema}
        validateOnChange
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <SC.Container>
            <FormInput
              required
              hideLabel
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email && touched.email ? errors.email : undefined}
              name="Email"
            />
            <FormInput
              required
              type="password"
              error={
                errors.password && touched.password
                  ? errors.password
                  : undefined
              }
              hideLabel
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              name="Password"
            />
            <Button mt={4} w="100%" isLoading={isLoading} onPress={onLoginPress(handleSubmit)}>
              Sign In
            </Button>
          </SC.Container>
        )}
      </Formik>
    </View>
  );
}
