export const ExerciseTypes = ["strength", "cardio"];
export type ExerciseType = typeof ExerciseTypes[number];

export const MuscleGroups = [
  "Abs",
  "Biceps",
  "Chest",
  "Forearms",
  "Glutes",
  "Traps",
  "Shoulders",
  "Lats",
  "Legs",
  "Back",
  "Triceps"
];
export type MuscleGroup = typeof MuscleGroups[number];

export type Mechanics = "Compound" | "Isolation" | "Unknown";
export const Equipments = [
  "Bands",
  "Barbell",
  "Bench",
  "BodyOnly",
  "Dumbbell",
  "ExerciseBall",
  "EzBar",
  "FoamRoll",
  "Kettlebell",
  "MachineCardio",
  "MachineStrength",
  "Other",
  "PullBar",
  "WeightPlate",
  "Unknown"
];

export type Equipment = typeof Equipments[number];

interface BaseExercise {
  id: number;
  name: string;
  type: ExerciseType;
  mainMuscleGroup: MuscleGroup;
  detailedMuscleGroup: MuscleGroup | null;
  otherMuscleGroups: MuscleGroup[];
  mechanics: Mechanics;
  equipment: Equipment;
  muscleGroupStats: Record<MuscleGroup, number>;
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
  targetReps: number;
  targetSets: number;
  targetWeight: number;
  reps: number | null;
  sets: number | null;
  weight: number | null;
  type: "strength";
}

export interface CardioData extends BaseData {
  targetDistance: number;
  targetDuration: number;
  distance: number | null;
  duration: number | null;
  type: "cardio";
}

export type Data = StrengthData | CardioData;

export type Activity = Exercise & Data;

interface BaseWorkout {
  id: number;
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

export interface BuddyAnatomy {
  id: number;
  level: number;
  muscleGroup: MuscleGroup;
}

export type StrengthLevelTypes =
  | "Overall"
  | "Powerlifting"
  | "Bodybuilding"
  | "Weightlifting";

export interface BaseReward {
  id: number;
}

export interface Title extends BaseReward {
  name: string;
}

export interface Image {
  id: number;
  bytes: string;
  name: string;
  fileExtension: string;
}

export interface Badge extends BaseReward {
  name: string;
  image: Image;
}

export interface Experience extends BaseReward {
  amount: number;
  strengthLevel: StrengthLevelTypes;
}

export type Reward = BaseReward | Title | Badge | Experience;

export interface BaseAchievement {
  id: number;
  title: string;
  rewards: Reward[];
}

export interface WeightAchievement extends BaseAchievement {
  targetWeight: number;
  targetMuscleGroup: MuscleGroup;
  hasTargetMuscleGroup: boolean;
}

export interface RepsAchievement extends BaseAchievement {
  targetReps: number;
  targetMuscleGroup: MuscleGroup;
  hasTargetMuscleGroup: boolean;
}

export interface SetsAchievement extends BaseAchievement {
  targetSets: number;
  targetMuscleGroup: MuscleGroup;
  hasTargetMuscleGroup: boolean;
}

export interface DistanceAchievement extends BaseAchievement {
  targetDistance: number;
}

export interface LevelAchievement extends BaseAchievement {
  targetLevel: number;
  targetStrengthLevelType: StrengthLevelTypes;
}

export type Achievement =
  | WeightAchievement
  | RepsAchievement
  | SetsAchievement
  | DistanceAchievement
  | LevelAchievement;

export interface BuddyData {
  anatomy: BuddyAnatomy[];
  streak: number;
  muscleGroupStats: Record<MuscleGroup, number>;
  levelStats: Record<StrengthLevelTypes, number>;
  achievements: Achievement[];
}

export interface Buddy {
  id: number;
  name: string;
  data: BuddyData;
  level: number;
  powerliftingLevel: number;
  bodybuildingLevel: number;
  weightliftingLevel: number;
  streak: number;
}

export type GraphType = "Reps" | "Sets" | "Weight" | "Distance";

export interface UserSettings {
  weightUnit: "pounds" | "kilograms";
  measurementUnit: "metric" | "imperial";
  darkMode: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  age: number;
  weeklyWorkoutAmountGoal: number;
  workouts: Workout[];
  workoutBuddy: Buddy;
  avatar: Image | null;
  userSettings: UserSettings;
}
