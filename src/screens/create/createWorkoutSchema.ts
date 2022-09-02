import * as Yup from "yup";
import { CreateWorkoutValues } from "./createWorkout";

export const CreateWorkoutSchema = Yup.object<
  Record<keyof CreateWorkoutValues, Yup.AnySchema>
>().shape({
  repeat: Yup.number()
    .required("Repeat is required")
    .min(0, "Repeat must be at least 0"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date must be in the future"),
  workout: Yup.object().shape({
    name: Yup.string().required("Workout is required"),
    activities: Yup.array()
      .min(1, "At least one activity is required")
      .required()
  })
});
