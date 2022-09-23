import * as Yup from "yup";
import { LoginValues } from "./login";

export const LoginSchema = Yup.object<
  Record<keyof LoginValues, Yup.AnySchema>
>().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});
