import { Input } from "native-base";
import React from "react";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function BuddyForm({ form }: RegisterProps) {
  return (
    <SC.Container>
      <Input
        onChangeText={form.handleChange("buddyName")}
        onBlur={form.handleBlur("buddyName")}
        value={form.values.buddyName}
        placeholder="Name"
      />
      <Input
        onChangeText={form.handleChange("buddyDescription")}
        onBlur={form.handleBlur("buddyDescription")}
        value={form.values.buddyDescription}
        placeholder="Description"
      />
      <Input
        onChangeText={form.handleChange("buddyIconId")}
        onBlur={form.handleBlur("buddyIconId")}
        value={form.values.buddyIconId.toString()}
        placeholder="Icon Id"
      />
    </SC.Container>
  );
}
