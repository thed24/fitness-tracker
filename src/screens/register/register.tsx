/* eslint-disable react/prop-types */
import { Box, Heading, Text } from "native-base";
import React, { useEffect } from "react";
import { ErrorAlert, Screen } from "components";
import { useStore } from "store";
import { Formik, FormikProps } from "formik";
import { NavigationProps } from "types";
import { useRegister } from "../../api/auth/useRegister";
import { Navigation } from "./navigation/navigation";
import { RegisterForm } from "./details/registerForm";
import { BuddyForm } from "./buddy/buddyForm";

export interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface RegisterProps {
  form: FormikProps<RegisterValues>;
}

export function RegisterScreen({ navigation }: NavigationProps) {
  const { data, error, isLoading, mutate } = useRegister();
  const { setUser, user } = useStore();
  const [errors, setErrors] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState(0);

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
    name,
    description,
    iconUrl,
  }: RegisterValues) => {
    mutate({
      email,
      password,
      firstName,
      lastName,
      username,
      confirmPassword,
      name,
      description,
      iconUrl,
    });
  };

  const onClearErrors = () => {
    setErrors([]);
  };

  const getStep = (props: RegisterProps) => {
    switch (index) {
      case 0:
        return (
          <Box textAlign="center">
            <Text>Enter your personal details below</Text>
            <RegisterForm form={props.form} />
          </Box>
        );
      case 1:
        return (
          <Box textAlign="center">
            <Text>Enter the details of your workout buddy below</Text>
            <BuddyForm form={props.form} />
          </Box>
        );
      default:
        return <Text>Well, this is awkward</Text>;
    }
  };

  return (
    <Screen loading={isLoading}>
      {errors.length > 0 && (
        <ErrorAlert errors={errors} clearErrors={onClearErrors} />
      )}

      <Heading marginTop="10">Register</Heading>
      <Formik
        initialValues={{
          firstName: "Dom",
          lastName: "Test",
          username: "Test",
          email: "test@gmail.com",
          password: "123456",
          confirmPassword: "123456",
          name: "Test Buddy",
          description: "This is a test buddy",
          iconUrl: "123",
        }}
        onSubmit={onSubmit}
      >
        {(form) => (
          <>
            {getStep({ form })}
            <Navigation
              minSteps={0}
              maxSteps={1}
              currentIndex={index}
              setIndex={setIndex}
              onSubmit={form.handleSubmit}
            />
          </>
        )}
      </Formik>
    </Screen>
  );
}
