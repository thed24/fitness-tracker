import { Input, Text } from "native-base";
import React from "react";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function StatsForm({ form }: RegisterProps) {
  return (
    <SC.Container>
      <Input
        onChangeText={form.handleChange("height")}
        onBlur={form.handleBlur("height")}
        value={form.values.height.toString()}
        placeholder="Height (cm)"
      />
      <Input
        onChangeText={form.handleChange("weight")}
        onBlur={form.handleBlur("weight")}
        value={form.values.weight.toString()}
        placeholder="Weight (kg)"
      />
      <Input
        onChangeText={form.handleChange("age")}
        onBlur={form.handleBlur("age")}
        value={form.values.age.toString()}
        placeholder="Age"
      />
      <Text>
        These max values are optional, if your new or prefer a clean state feel
        free to skip them!
      </Text>
      <Input
        onChangeText={form.handleChange("benchPressMax")}
        onBlur={form.handleBlur("benchPressMax")}
        value={form.values.benchPressMax?.toString() ?? ""}
        placeholder="Bench Press Max (kg)"
      />
      <Input
        onChangeText={form.handleChange("squatMax")}
        onBlur={form.handleBlur("squatMax")}
        value={form.values.squatMax?.toString() ?? ""}
        placeholder="Squat Max (kg)"
      />
      <Input
        onChangeText={form.handleChange("deadliftMax")}
        onBlur={form.handleBlur("deadliftMax")}
        value={form.values.deadliftMax?.toString() ?? ""}
        placeholder="Deadlift Max (kg)"
      />
    </SC.Container>
  );
}
