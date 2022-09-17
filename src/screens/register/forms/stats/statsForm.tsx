import { FormInput } from "components";
import React from "react";
import { useStore } from "store";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function StatsForm({ form }: RegisterProps) {
  const { weightFormatter, measurementFormatter } = useStore();

  return (
    <SC.Container>
      <FormInput
        onChangeText={form.handleChange("height")}
        onBlur={form.handleBlur("height")}
        value={form.values.height.toString()}
        required
        error={
          form.errors.height && form.touched.height
            ? form.errors.height
            : undefined
        }
        name={measurementFormatter("Height")}
      />
      <FormInput
        onChangeText={form.handleChange("weight")}
        onBlur={form.handleBlur("weight")}
        value={form.values.weight.toString()}
        required
        error={
          form.errors.weight && form.touched.weight
            ? form.errors.weight
            : undefined
        }
        name={weightFormatter("Weight")}
      />
      <FormInput
        onChangeText={form.handleChange("age")}
        onBlur={form.handleBlur("age")}
        value={form.values.age.toString()}
        required
        error={
          form.errors.age && form.touched.age ? form.errors.age : undefined
        }
        name="Age"
      />
      <FormInput
        onChangeText={form.handleChange("benchPressMax")}
        onBlur={form.handleBlur("benchPressMax")}
        value={form.values.benchPressMax?.toString() ?? ""}
        error={
          form.errors.benchPressMax && form.touched.benchPressMax
            ? form.errors.benchPressMax
            : undefined
        }
        name={weightFormatter("Bench Press Max")}
      />
      <FormInput
        onChangeText={form.handleChange("squatMax")}
        onBlur={form.handleBlur("squatMax")}
        value={form.values.squatMax?.toString() ?? ""}
        error={
          form.errors.squatMax && form.touched.squatMax
            ? form.errors.squatMax
            : undefined
        }
        name={weightFormatter("Squat Max")}
      />
      <FormInput
        onChangeText={form.handleChange("deadliftMax")}
        onBlur={form.handleBlur("deadliftMax")}
        value={form.values.deadliftMax?.toString() ?? ""}
        error={
          form.errors.deadliftMax && form.touched.deadliftMax
            ? form.errors.deadliftMax
            : undefined
        }
        name={weightFormatter("Deadlift Max")}
      />
    </SC.Container>
  );
}
