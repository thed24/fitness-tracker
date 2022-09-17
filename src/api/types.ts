import {
  Buddy,
  User,
  Workout,
  UserSettings,
  Mechanics,
  Equipment
} from "types";
import { MuscleGroup } from "../types/domain";

export type ApiData = {
  id: number;
  type: "strength" | "cardio";
  duration: number;
  distance: number;
  reps: number;
  sets: number;
  weight: number;
};

export interface ApiExercise {
  id: number;
  name: string;
  type: "strength" | "cardio";
  mainMuscleGroup: string;
  detailedMuscleGroup: string | null;
  otherMuscleGroups: string[];
  mechanics: Mechanics;
  equipment: Equipment;
}

export interface ApiActivity {
  id: number;
  exercise: ApiExercise;
  data: ApiData;
  muscleGroupStats: Record<MuscleGroup, number>;
}

export interface ApiWorkout {
  id: number;
  time: string;
  completed: boolean;
  past: boolean;
  name: string;
  activities: ApiActivity[];
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  password: string;
  workouts: ApiWorkout[];
  workoutBuddy: Buddy;
  userSettings: UserSettings;
}

export function ApiWorkoutToWorkout(workout: ApiWorkout): Workout {
  return {
    id: workout.id,
    time: workout.time,
    completed: workout.completed,
    past: workout.past,
    name: workout.name,
    activities: workout.activities.map((activity) => ({
      ...activity.exercise,
      ...activity.data,
      muscleGroupStats: activity.muscleGroupStats,
      id: activity.id
    }))
  };
}

export function ApiUserToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    username: apiUser.username,
    email: apiUser.email,
    password: apiUser.password,
    workouts: apiUser.workouts.map(ApiWorkoutToWorkout),
    workoutBuddy: apiUser.workoutBuddy,
    userSettings: apiUser.userSettings
  };
}

export function WorkoutToApiWorkout(workout: Workout): ApiWorkout {
  return {
    id: 0,
    time: workout.time,
    completed: workout.completed,
    past: workout.past,
    name: workout.name,
    activities: workout.activities.map((activity) => {
      const exercise: ApiExercise = {
        id: 0,
        name: activity.name,
        type: activity.type,
        mainMuscleGroup: activity.mainMuscleGroup,
        detailedMuscleGroup: activity.detailedMuscleGroup,
        otherMuscleGroups: activity.otherMuscleGroups,
        mechanics: activity.mechanics,
        equipment: activity.equipment
      };

      const data: ApiData =
        activity.type === "strength"
          ? {
              id: 0,
              reps: activity.reps,
              sets: activity.sets,
              weight: activity.weight,
              distance: 0,
              duration: 0,
              type: activity.type
            }
          : {
              id: 0,
              distance: activity.distance,
              duration: activity.duration,
              reps: 0,
              sets: 0,
              weight: 0,
              type: activity.type
            };

      return {
        id: 0,
        exercise,
        data,
        muscleGroupStats: activity.muscleGroupStats
      };
    })
  };
}

export function UserToApiUser(user: User): ApiUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
    workouts: user.workouts.map(WorkoutToApiWorkout),
    workoutBuddy: user.workoutBuddy,
    userSettings: user.userSettings
  };
}
