import { Input } from "native-base";
import React from "react";
import { RegisterProps } from "../../register";
import * as SC from "../../register.styles";

export function RegisterForm({ form }: RegisterProps) {
  return (
    <SC.Container>
        <Input
        onChangeText={form.handleChange("username")}
        onBlur={form.handleBlur("username")}
        value={form.values.username}
        placeholder="Username"
        />
        <Input
        onChangeText={form.handleChange("email")}
        onBlur={form.handleBlur("email")}
        value={form.values.email}
        placeholder="Email"
        />
        <Input
        onChangeText={form.handleChange("firstName")}
        onBlur={form.handleBlur("firstName")}
        value={form.values.firstName}
        placeholder="First Name"
        />
        <Input
        onChangeText={form.handleChange("lastName")}
        onBlur={form.handleBlur("lastName")}
        value={form.values.lastName}
        placeholder="Last Name"
        />

        <Input
        onChangeText={form.handleChange("password")}
        onBlur={form.handleBlur("password")}
        value={form.values.password}
        placeholder="Password"
        />
        <Input
        onChangeText={form.handleChange("confirmPassword")}
        onBlur={form.handleBlur("confirmPassword")}
        value={form.values.confirmPassword}
        placeholder="Confirm Password"
        />
    </SC.Container>
  );
}
