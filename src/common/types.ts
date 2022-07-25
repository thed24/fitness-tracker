type ExerciseType = 'strength' | 'cardio';

interface BaseExercise {
    id: string;
    name: string;
    description: string;
    type: ExerciseType;
}

export interface StrengthExercise extends BaseExercise {
    type: 'strength';
    muscles: string[];
}

export interface CardioExercise extends BaseExercise {
    type: 'cardio';
}

export type Exercise = StrengthExercise | CardioExercise;

interface BaseData {
    type: ExerciseType;
}

export interface StrengthData extends BaseData {
    reps: number;
    sets: number;
    weight: number;
    type: 'strength';
}

export interface CardioData extends BaseData {
    distance: number;
    duration: number;
    type: 'cardio';
}

export type Data = StrengthData | CardioData;

export type Activity = Exercise & Data;

interface BaseWorkout {
    id: string;
    time: Date;
    activities: Activity[];
    past: boolean;
    completed: boolean;
}

export interface ScheduledWorkout extends BaseWorkout {
    past: false;
}

export interface CompletedWorkout extends BaseWorkout {
    past: true;
}

export type Workout = ScheduledWorkout | CompletedWorkout;

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    workouts: Workout[];
}
