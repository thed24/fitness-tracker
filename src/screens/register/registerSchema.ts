import * as Yup from 'yup';
import { RegisterValues } from './register';

export const RegisterSchema = Yup.object<
  Record<keyof RegisterValues, Yup.AnySchema>
>().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .min(6, 'Password must be at least 6 characters')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  height: Yup.number()
    .required('Height is required')
    .min(1, 'Height must be positive'),
  weight: Yup.number()
    .required('Weight is required')
    .min(0, 'Weight must be positive'),
  age: Yup.number()
    .required('Age is required')
    .min(18, 'Age must be at least 18'),
  buddyName: Yup.string().required('Buddy Name is required'),
});
