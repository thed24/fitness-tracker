import {
  Buddy,
  Data,
  Exercise,
  User,
  StrengthExercise,
  CardioExercise,
  StrengthData,
  CardioData,
  Workout
} from "types";

export interface ApiActivity {
  id: string;
  exercise: Exercise;
  data: Data;
}

export interface ApiWorkout {
  id: string;
  time: string;
  completed: boolean;
  past: boolean;
  activities: ApiActivity[];
}

export interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  workouts: ApiWorkout[];
  workoutBuddy: Buddy;
}

export function ApiWorkoutToWorkout(workout: ApiWorkout): Workout {
  return {
    id: workout.id,
    time: workout.time,
    completed: workout.completed,
    past: workout.past,
    activities: workout.activities.map((activity) => ({
      ...activity.exercise,
      ...activity.data,
      id: activity.id
    }))
  };
}

export function ApiUserToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    userName: apiUser.userName,
    email: apiUser.email,
    password: apiUser.password,
    workouts: apiUser.workouts.map((workout) => ApiWorkoutToWorkout(workout)),
    workoutBuddy: apiUser.workoutBuddy
  };
}

export function WorkoutToApiWorkout(workout: Workout): ApiWorkout {
  return {
    id: workout.id,
    time: workout.time,
    completed: workout.completed,
    past: workout.past,
    activities: workout.activities.map((activity) => {
      const exercise: Exercise =
        activity.type === "strength"
          ? ({
              id: activity.id,
              name: activity.name,
              type: activity.type,
              description: activity.description,
              primaryMuscleGroup: activity.primaryMuscleGroup
            } as StrengthExercise)
          : ({
              id: activity.id,
              name: activity.name,
              type: activity.type,
              description: activity.description,
              primaryMuscleGroup: activity.primaryMuscleGroup
            } as CardioExercise);

      const data: Data =
        activity.type === "strength"
          ? ({
              reps: activity.reps,
              sets: activity.sets,
              weight: activity.weight,
              type: activity.type
            } as StrengthData)
          : ({
              distance: activity.distance,
              duration: activity.duration,
              type: activity.type
            } as CardioData);

      return {
        id: activity.id,
        exercise,
        data
      };
    })
  };
}

export function UserToApiUser(user: User): ApiUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    password: user.password,
    workouts: user.workouts.map((workout) => WorkoutToApiWorkout(workout)),
    workoutBuddy: user.workoutBuddy
  };
}
