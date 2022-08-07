import { FormInput } from "components";
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
        error={form.errors.buddyName}
        name="Name"
      />
      <FormInput
        onChangeText={form.handleChange("buddyDescription")}
        onBlur={form.handleBlur("buddyDescription")}
        value={form.values.buddyDescription}
        required
        error={form.errors.buddyDescription}
        name="Description"
      />
      <FormInput
        onChangeText={form.handleChange("buddyIconId")}
        onBlur={form.handleBlur("buddyIconId")}
        value={form.values.buddyIconId.toString()}
        required
        error={form.errors.buddyIconId}
        name="Icon Id"
      />
    </SC.Container>
  );
}
