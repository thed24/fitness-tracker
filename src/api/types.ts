import {
  Buddy,
  User,
  Workout,
  UserSettings,
  Mechanics,
  Equipment,
  Image,
} from 'types';
import { Badge, Exercise, MuscleGroup, Reward, Title } from '../types/domain';

export type ApiData = {
  id: number;
  type: 'strength' | 'cardio';
  duration: number | null;
  distance: number | null;
  reps: number | null;
  sets: number | null;
  weight: number | null;
  targetDuration: number;
  targetDistance: number;
  targetReps: number;
  targetSets: number;
  targetWeight: number;
  notes: string | null;
  image: Image | null;
};

export interface ApiExercise {
  id: number;
  name: string;
  type: 'strength' | 'cardio';
  mainMuscleGroup: string;
  muscleGroupImage: Image;
  detailedMuscleGroup: string | null;
  otherMuscleGroups: string[];
  mechanics: Mechanics;
  equipment: Equipment;
  muscleGroupStats: Record<MuscleGroup, number>;
}

export interface ApiActivity {
  id: number;
  exercise: ApiExercise;
  data: ApiData;
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
  height: number;
  weight: number;
  age: number;
  weeklyWorkoutAmountGoal: number;
  workouts: ApiWorkout[];
  workoutBuddy: Buddy;
  userSettings: UserSettings;
  avatar: Image | null;
  inventory: Reward[];
  claimedAchievements: number[];
  title: Title | null;
  badge: Badge | null;
}

export function ApiExerciseToExercise(exercise: ApiExercise): Exercise {
  return {
    ...exercise,
    exerciseId: exercise.id,
  };
}

export function ApiWorkoutToWorkout(workout: ApiWorkout): Workout {
  const time = new Date();
  time.setHours(0, 0, 0, 0);

  return {
    id: workout.id,
    time: workout.time,
    completed: workout.completed,
    past: new Date(workout.time) < time,
    name: workout.name,
    activities: workout.activities.map((activity) => ({
      ...activity.exercise,
      ...activity.data,
      id: activity.id,
      exerciseId: activity.exercise.id,
      dataId: activity.data.id,
    })),
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
    userSettings: apiUser.userSettings,
    height: apiUser.height,
    weight: apiUser.weight,
    age: apiUser.age,
    weeklyWorkoutAmountGoal: apiUser.weeklyWorkoutAmountGoal,
    avatar: apiUser.avatar,
    inventory: apiUser.inventory,
    claimedAchievements: apiUser.claimedAchievements,
    title: apiUser.title,
    badge: apiUser.badge,
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
        id: activity.exerciseId,
        name: activity.name,
        type: activity.type,
        muscleGroupImage: activity.muscleGroupImage,
        mainMuscleGroup: activity.mainMuscleGroup,
        detailedMuscleGroup: activity.detailedMuscleGroup,
        otherMuscleGroups: activity.otherMuscleGroups,
        mechanics: activity.mechanics,
        equipment: activity.equipment,
        muscleGroupStats: activity.muscleGroupStats,
      };

      const data: ApiData =
        activity.type === 'strength'
          ? {
              id: activity.dataId,
              reps: activity.reps,
              sets: activity.sets,
              weight: activity.weight,
              targetReps: activity.targetReps,
              targetSets: activity.targetSets,
              targetWeight: activity.targetWeight,
              targetDistance: 0,
              targetDuration: 0,
              distance: 0,
              duration: 0,
              notes: activity.notes,
              image: activity.image,
              type: activity.type,
            }
          : {
              id: activity.dataId,
              distance: activity.distance,
              duration: activity.duration,
              targetDistance: activity.targetDistance,
              targetDuration: activity.targetDuration,
              targetReps: 0,
              targetSets: 0,
              targetWeight: 0,
              reps: 0,
              sets: 0,
              weight: 0,
              notes: activity.notes,
              image: activity.image,
              type: activity.type,
            };

      return {
        id: 0,
        exercise,
        data,
      };
    }),
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
    userSettings: user.userSettings,
    height: user.height,
    weight: user.weight,
    age: user.age,
    weeklyWorkoutAmountGoal: user.weeklyWorkoutAmountGoal,
    avatar: user.avatar,
    inventory: user.inventory,
    claimedAchievements: user.claimedAchievements,
    title: user.title,
    badge: user.badge,
  };
}
