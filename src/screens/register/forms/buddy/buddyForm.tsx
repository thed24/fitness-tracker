import { FormInput } from "components";
import { Radio } from "native-base";
import React from "react";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function BuddyForm({ form }: RegisterProps) {
  return (
    <SC.Container>
      <FormInput
        onChangeText={form.handleChange("buddyName")}
        onBlur={form.handleBlur("buddyName")}
        value={form.values.buddyName}
        required
        error={
          form.errors.buddyName && form.touched.buddyName
            ? form.errors.buddyName
            : undefined
        }
        name="Buddy Name"
      />

      <Radio.Group
        name="Measurement Unit"
        direction="row"
        marginTop={4}
        space={4}
        defaultValue="metric"
        value={form.values.measurementUnit}
        onChange={(value) => form.setFieldValue("measurementUnit", value)}
      >
        <Radio value="metric">Metric</Radio>
        <Radio value="imperial">Imperial</Radio>
      </Radio.Group>

      <Radio.Group
        name="Weight Unit"
        direction="row"
        marginTop={4}
        space={4}
        defaultValue="kilograms"
        value={form.values.weightUnit}
        onChange={(value) => form.setFieldValue("weightUnit", value)}
      >
        <Radio value="kilograms">Kg</Radio>
        <Radio value="pounds">Lb</Radio>
      </Radio.Group>
    </SC.Container>
  );
}
