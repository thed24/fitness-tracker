import * as Yup from 'yup';
import { CreateWorkoutValues } from './createWorkout';

export const CreateWorkoutSchema = Yup.object<
  Record<keyof CreateWorkoutValues, Yup.AnySchema>
>().shape({
  repeat: Yup.number()
    .required('Weeks to repeat is required')
    .min(0, 'Weeks to repeat must be at least 0'),
  date: Yup.date().required('A date is required'),
  workout: Yup.object().shape({
    name: Yup.string().required('A workout name is required').notOneOf(['']),
    activities: Yup.array()
      .required('At least one activity is required')
      .min(1, 'Atleast one activity is required'),
  }),
});
