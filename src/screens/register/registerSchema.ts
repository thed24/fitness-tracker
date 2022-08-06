import * as Yup from "yup";
import { RegisterValues } from "./register";

export const RegisterSchema = Yup.object<
  Record<keyof RegisterValues, Yup.AnySchema>
>().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .min(6, "Password must be at least 6 characters")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required")
});
