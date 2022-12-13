import { Text } from "native-base";
import React, { useState } from "react";
import { Screen } from "components";
import { Formik, FormikProps } from "formik";
import { useExercises, useRegister } from "api";
import { Image } from "types";
import { RegisterForm } from "./forms/details/registerForm";
import { BuddyForm } from "./forms/buddy/buddyForm";
import { StatsForm } from "./forms/stats/statsForm";
import { RegisterSchema } from "./registerSchema";
import { NavigationButton } from "./components/navigationButton/navigationButton";

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
  maxes: Record<string, {reps: number, weight: number}>;
  avatar: Image | null;
}

export interface RegisterProps {
  form: FormikProps<RegisterValues>;
}

function RegisterScreen() {
  const { data: exercises } = useExercises();
  const { isLoading: registering, mutate: register } = useRegister();
  const [index, setIndex] = useState(0);

  const onSubmit = (registrationDetails: RegisterValues) => {
    register({ ...registrationDetails });
  };

  const getStep = (props: RegisterProps) => {
    switch (index) {
      case 0:
        return <RegisterForm form={props.form} />;
      case 1:
        return <BuddyForm form={props.form} />;
      case 2:
        return <StatsForm form={props.form} exercises={exercises ?? []} />;
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
          maxes: {},
        } as RegisterValues}
        onSubmit={onSubmit}
      >
        {(form) => (
          <>
            {getStep({ form })}
            <NavigationButton
              loading={registering}
              disabled={Object.keys(form.errors).length > 0}
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

const MemoizedScreen = React.memo(RegisterScreen);
export { MemoizedScreen as RegisterScreen };