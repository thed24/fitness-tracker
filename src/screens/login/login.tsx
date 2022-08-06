import { Formik } from "formik";
import { Button, Heading } from "native-base";
import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import { ErrorAlert, FormInput, Screen } from "components";
import { useStore } from "store";
import { NavigationProps } from "types";
import { useLogin } from "../../api/auth/useLogin";
import { LoginSchema } from "./loginSchema";
import * as SC from "./login.styles";

export interface LoginValues {
  email: string;
  password: string;
}

// eslint-disable-next-line no-unused-vars
export function LoginScreen({ navigation }: NavigationProps) {
  const { data, error, isLoading, mutate } = useLogin();
  const [apiErrors, setApiErrors] = React.useState<string[]>([]);
  const { setUser } = useStore();

  useEffect(() => {
    if (data) {
      setUser(data.user);
      navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
    } else if (error) {
      setApiErrors([error.message]);
    }
  }, [data, error]);

  const onSubmit = ({ email, password }: LoginValues) => {
    mutate({ email, password });
  };

  const onLoginPress =
    (callback: (e?: any) => void) => (event: GestureResponderEvent) => {
      event.preventDefault();
      callback();
    };

  const onClearErrors = () => {
    setApiErrors([]);
  };

  return (
    <Screen loading={isLoading}>
      {apiErrors.length > 0 && (
        <ErrorAlert errors={apiErrors} clearErrors={onClearErrors} />
      )}
      <Heading marginTop="10">Login</Heading>
      <Formik
        validationSchema={LoginSchema}
        validateOnChange
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <SC.Container>
            <FormInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              name="Email"
            />
            <FormInput
              type="password"
              error={errors.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              name="Password"
            />
            <Button w="90%" onPress={onLoginPress(handleSubmit)}>
              Login
            </Button>
          </SC.Container>
        )}
      </Formik>
    </Screen>
  );
}
