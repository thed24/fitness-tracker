import { FormInput } from "components";
import React from "react";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function StatsForm({ form }: RegisterProps) {
  return (
    <SC.Container>
      <FormInput
        onChangeText={form.handleChange("height")}
        onBlur={form.handleBlur("height")}
        value={form.values.height.toString()}
        required
        error={form.errors.height}
        name="Height (cm)"
      />
      <FormInput
        onChangeText={form.handleChange("weight")}
        onBlur={form.handleBlur("weight")}
        value={form.values.weight.toString()}
        required
        error={form.errors.weight}
        name="Weight (kg)"
      />
      <FormInput
        onChangeText={form.handleChange("age")}
        onBlur={form.handleBlur("age")}
        value={form.values.age.toString()}
        required
        error={form.errors.age}
        name="Age"
      />
      <FormInput
        onChangeText={form.handleChange("benchPressMax")}
        onBlur={form.handleBlur("benchPressMax")}
        value={form.values.benchPressMax?.toString() ?? ""}
        error={form.errors.benchPressMax}
        name="Bench Press Max (kg)"
      />
      <FormInput
        onChangeText={form.handleChange("squatMax")}
        onBlur={form.handleBlur("squatMax")}
        value={form.values.squatMax?.toString() ?? ""}
        error={form.errors.squatMax}
        name="Squat Max (kg)"
      />
      <FormInput
        onChangeText={form.handleChange("deadliftMax")}
        onBlur={form.handleBlur("deadliftMax")}
        value={form.values.deadliftMax?.toString() ?? ""}
        error={form.errors.deadliftMax}
        name="Deadlift Max (kg)"
      />
    </SC.Container>
  );
}
