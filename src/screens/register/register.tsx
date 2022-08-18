import { Text } from "native-base";
import React, { useEffect } from "react";
import { ErrorAlert, Screen } from "components";
import { Formik, FormikProps } from "formik";
import { NavigationProps } from "types";
import { useRegister } from "../../api/auth/useRegister";
import { Navigation } from "./components/navigation/navigation";
import { RegisterForm } from "./forms/details/registerForm";
import { BuddyForm } from "./forms/buddy/buddyForm";
import { StatsForm } from "./forms/stats/statsForm";
import { RegisterSchema } from "./registerSchema";

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
  const [errors, setErrors] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if (error instanceof Error) {
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
          <RegisterForm form={props.form} />
        );
      case 1:
        return (
          <StatsForm form={props.form} />
        );
      case 2:
        return (
          <BuddyForm form={props.form} />
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
      <Formik
        validationSchema={RegisterSchema}
        validateOnChange
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
              disabled={Object.keys(form.errors).length > 0}
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
