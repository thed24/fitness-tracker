import {
  Buddy,
  Data,
  Exercise,
  User,
  StrengthData,
  CardioData,
  Workout,
  UserSettings
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
  name: string;
  activities: ApiActivity[];
}

export interface ApiUser {
  id: string;
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
    id: workout.id,
    time: workout.time,
    completed: workout.completed,
    past: workout.past,
    name: workout.name,
    activities: workout.activities.map((activity) => {
      const exercise: Exercise = {
        id: activity.id,
        name: activity.name,
        type: activity.type,
        description: activity.description,
        mainMuscleGroup: activity.mainMuscleGroup,
        detailedMuscleGroup: activity.detailedMuscleGroup,
        otherMuscleGroups: activity.otherMuscleGroups,
        mechanics: activity.mechanics,
        equipment: activity.equipment,
        muscleGroupStats: activity.muscleGroupStats
      };

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
    username: user.username,
    email: user.email,
    password: user.password,
    workouts: user.workouts.map(WorkoutToApiWorkout),
    workoutBuddy: user.workoutBuddy,
    userSettings: user.userSettings
  };
}
