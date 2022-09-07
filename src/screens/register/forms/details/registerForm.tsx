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
        error={
          form.errors.username && form.touched.username
            ? form.errors.username
            : undefined
        }
      />
      <FormInput
        required
        onChangeText={form.handleChange("email")}
        onBlur={form.handleBlur("email")}
        value={form.values.email}
        name="Email"
        error={
          form.errors.email && form.touched.email
            ? form.errors.email
            : undefined
        }
      />
      <FormInput
        required
        type="password"
        onChangeText={form.handleChange("password")}
        onBlur={form.handleBlur("password")}
        value={form.values.password}
        name="Password"
        error={
          form.errors.password && form.touched.password
            ? form.errors.password
            : undefined
        }
      />
      <FormInput
        required
        type="password"
        onChangeText={form.handleChange("confirmPassword")}
        onBlur={form.handleBlur("confirmPassword")}
        value={form.values.confirmPassword}
        name="Confirm Password"
        error={
          form.errors.confirmPassword && form.touched.confirmPassword
            ? form.errors.confirmPassword
            : undefined
        }
      />
    </SC.Container>
  );
}
