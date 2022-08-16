export type ExerciseType = "strength" | "cardio";

type MuscleGroup =
  | "Abs"
  | "Biceps"
  | "Chest"
  | "Forearms"
  | "Glutes"
  | "Traps"
  | "Shoulders"
  | "Lats"
  | "Legs"
  | "Back"
  | "Triceps";

interface BaseExercise {
  id: string;
  name: string;
  description: string;
  type: ExerciseType;
  primaryMuscleGroup: string;
}

export interface StrengthExercise extends BaseExercise {
  type: "strength";
}

export interface CardioExercise extends BaseExercise {
  type: "cardio";
}

export type Exercise = StrengthExercise | CardioExercise;

interface BaseData {
  type: ExerciseType;
}

export interface StrengthData extends BaseData {
  reps: number;
  sets: number;
  weight: number;
  type: "strength";
}

export interface CardioData extends BaseData {
  distance: number;
  duration: number;
  type: "cardio";
}

export type Data = StrengthData | CardioData;

export type Activity = Exercise & Data;

interface BaseWorkout {
  id: string;
  time: string;
  activities: Activity[];
  past: boolean;
  completed: boolean;
  name: string;
}

export interface ScheduledWorkout extends BaseWorkout {
  past: false;
}

export interface CompletedWorkout extends BaseWorkout {
  past: true;
}

export type Workout = ScheduledWorkout | CompletedWorkout;

interface BuddyAnatomyBase {
  muscleGroup: MuscleGroup;
}
export interface BuddyAbs extends BuddyAnatomyBase {
  muscleGroup: "Abs";
}

export interface BuddyBiceps extends BuddyAnatomyBase {
  muscleGroup: "Biceps";
}

export interface BuddyChest extends BuddyAnatomyBase {
  muscleGroup: "Chest";
}

export interface BuddyForearms extends BuddyAnatomyBase {
  muscleGroup: "Forearms";
}

export interface BuddyGlutes extends BuddyAnatomyBase {
  muscleGroup: "Glutes";
}

export interface BuddyTraps extends BuddyAnatomyBase {
  muscleGroup: "Traps";
}

export interface BuddyShoulders extends BuddyAnatomyBase {
  muscleGroup: "Shoulders";
}

export interface BuddyLats extends BuddyAnatomyBase {
  muscleGroup: "Lats";
}

export interface BuddyLegs extends BuddyAnatomyBase {
  muscleGroup: "Legs";
}

export interface BuddyBack extends BuddyAnatomyBase {
  muscleGroup: "Back";
}

export interface BuddyTriceps extends BuddyAnatomyBase {
  muscleGroup: "Triceps";
}

export interface BuddyData {
  id: string;
  strength: number;
  flexibility: number;
  speed: number;
  streaks: number;
  AbsAnatomy: BuddyAbs;
  BicepsAnatomy: BuddyBiceps;
  ChestAnatomy: BuddyChest;
  ForearmsAnatomy: BuddyForearms;
  GlutesAnatomy: BuddyGlutes;
  TrapsAnatomy: BuddyTraps;
  ShouldersAnatomy: BuddyShoulders;
  LatsAnatomy: BuddyLats;
  LegsAnatomy: BuddyLegs;
  BackAnatomy: BuddyBack;
  TricepsAnatomy: BuddyTriceps;
}

export interface Buddy {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  data: BuddyData;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  workouts: Workout[];
  workoutBuddy: Buddy;
}
