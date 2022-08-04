import { Formik } from "formik";
import { Button, Heading, Input, VStack } from "native-base";
import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import { NavigationProps } from "..";
import { ErrorAlert, Screen } from "components";
import { useStore } from "store";
import { useRegister } from "../../api/auth/useRegister";

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}

// eslint-disable-next-line no-unused-vars
export function RegisterScreen({ navigation }: NavigationProps) {
  const { data, error, isLoading, mutate } = useRegister();
  const [errors, setErrors] = React.useState<string[]>([]);
  const { setUser, user } = useStore();

  useEffect(() => {
    if (data) {
      setUser(data.user);
      navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
    } else if (error) {
      setErrors([error.message]);
    }
  }, [data, error]);

  const onSubmit = ({
    email,
    password,
    firstName,
    lastName,
    username,
    confirmPassword,
  }: RegisterValues) => {
    mutate({ email, password, firstName, lastName, username, confirmPassword });
  };

  const onRegisterPress =
    (callback: (e?: any) => void) => (event: GestureResponderEvent) => {
      event.preventDefault();
      callback();
    };

  const onClearErrors = () => {
    setErrors([]);
  };

  return (
    <Screen loading={isLoading}>
      {errors.length > 0 && (
        <ErrorAlert errors={errors} clearErrors={onClearErrors} />
      )}
      <Heading marginTop="10">Register</Heading>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          username: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <VStack space={4} alignItems="center" marginTop="10">
            <Input
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              placeholder="Username"
            />
            <Input
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
            />
            <Input
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              placeholder="First Name"
            />
            <Input
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              placeholder="Last Name"
            />

            <Input
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
            />
            <Input
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              placeholder="Confirm Password"
            />
            <Button w="100%" onPress={onRegisterPress(handleSubmit)}>
              Register
            </Button>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}
