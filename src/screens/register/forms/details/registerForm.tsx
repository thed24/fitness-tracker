import React from "react";
import { FormInput } from "components";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function RegisterForm({ form }: RegisterProps) {
  return (
    <SC.Container>
      <FormInput
        required
        onChangeText={form.handleChange("username")}
        onBlur={form.handleBlur("username")}
        value={form.values.username}
        name="Username"
        error={form.errors.username}
      />
      <FormInput
        required
        onChangeText={form.handleChange("email")}
        onBlur={form.handleBlur("email")}
        value={form.values.email}
        name="Email"
        error={form.errors.email}
      />
      <FormInput
        required
        onChangeText={form.handleChange("firstName")}
        onBlur={form.handleBlur("firstName")}
        value={form.values.firstName}
        name="First Name"
        error={form.errors.firstName}
      />
      <FormInput
        required
        onChangeText={form.handleChange("lastName")}
        onBlur={form.handleBlur("lastName")}
        value={form.values.lastName}
        name="Last Name"
        error={form.errors.lastName}
      />
      <FormInput
        required
        type="password"
        onChangeText={form.handleChange("password")}
        onBlur={form.handleBlur("password")}
        value={form.values.password}
        name="Password"
        error={form.errors.password}
      />
      <FormInput
        required
        type="password"
        onChangeText={form.handleChange("confirmPassword")}
        onBlur={form.handleBlur("confirmPassword")}
        value={form.values.confirmPassword}
        name="Confirm Password"
        error={form.errors.confirmPassword}
      />
    </SC.Container>
  );
}
