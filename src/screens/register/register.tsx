/* eslint-disable react/prop-types */
import { Box, Heading, Text } from "native-base";
import React, { useEffect } from "react";
import { ErrorAlert, Screen } from "components";
import { useStore } from "store";
import { Formik, FormikProps } from "formik";
import { NavigationProps } from "types";
import { useRegister } from "../../api/auth/useRegister";
import { Navigation } from "./components/navigation/navigation";
import { RegisterForm } from "./forms/details/registerForm";
import { BuddyForm } from "./forms/buddy/buddyForm";
import { StatsForm } from "./forms/stats/statsForm";

export interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  buddyName: string;
  buddyDescription: string;
  buddyIconId: number;
  height: number;
  weight: number;
  age: number;
  benchPressMax: number | null;
  squatMax: number | null;
  deadliftMax: number | null;
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

  const onSubmit = (registrationDetails: RegisterValues) => {
    mutate({ ...registrationDetails });
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
            <Text>Enter your physical stats below</Text>
            <StatsForm form={props.form} />
          </Box>
        );
      case 2:
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
          buddyName: "Jim",
          buddyDescription: "Your favorite pal",
          buddyIconId: 1,
          height: 180,
          weight: 80,
          age: 20,
          benchPressMax: null,
          squatMax: null,
          deadliftMax: null,
        } as RegisterValues}
        onSubmit={onSubmit}
      >
        {(form) => (
          <>
            {getStep({ form })}
            <Navigation
              minSteps={0}
              maxSteps={2}
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
