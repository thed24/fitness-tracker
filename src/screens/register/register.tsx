import { Text } from "native-base";
import React from "react";
import {  NavigationButton, Screen } from "components";
import { Formik, FormikProps } from "formik";
import { useRegister } from "api";
import { Image } from "types";
import { RegisterForm } from "./forms/details/registerForm";
import { BuddyForm } from "./forms/buddy/buddyForm";
import { StatsForm } from "./forms/stats/statsForm";
import { RegisterSchema } from "./registerSchema";

export interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  buddyName: string;
  height: number;
  weight: number;
  weightUnit: "kilograms" | "pounds";
  measurementUnit: "metric" | "imperial";
  age: number;
  benchPressMax: number | null;
  squatMax: number | null;
  deadliftMax: number | null;
  avatar: Image | null;
}

export interface RegisterProps {
  form: FormikProps<RegisterValues>;
}

function RegisterScreen() {
  const { isLoading, mutate } = useRegister();
  const [index, setIndex] = React.useState(0);

  const onSubmit = (registrationDetails: RegisterValues) => {
    mutate({ ...registrationDetails });
  };

  const getStep = (props: RegisterProps) => {
    switch (index) {
      case 0:
        return <RegisterForm form={props.form} />;
      case 1:
        return <BuddyForm form={props.form} />;
      case 2:
        return <StatsForm form={props.form} />;
      default:
        return <Text>Well, this is awkward</Text>;
    }
  };

  return (
    <Screen scrollable>
      <Formik
        validationSchema={RegisterSchema}
        validateOnChange
        enableReinitialize
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
          buddyName: "",
          weightUnit: "kilograms",
          measurementUnit: "metric",
          height: 0,
          weight: 0,
          age: 0,
          benchPressMax: null,
          squatMax: null,
          deadliftMax: null,
        } as RegisterValues}
        onSubmit={onSubmit}
      >
        {(form) => (
          <>
            {getStep({ form })}
            <NavigationButton
              loading={isLoading}
              disabled={Object.keys(form.errors).length > 0}
              minSteps={0}
              maxSteps={2}
              currentIndex={index}
              setIndex={setIndex}
              onSubmit={form.handleSubmit}
              size="md"
            />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const MemoizedScreen = React.memo(RegisterScreen);
export { MemoizedScreen as RegisterScreen };