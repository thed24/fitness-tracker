export const ExerciseTypes = ['strength', 'cardio'];
export type ExerciseType = typeof ExerciseTypes[number];

export const MuscleGroups = [
  'Abs',
  'Biceps',
  'Chest',
  'Cardio',
  'Forearms',
  'Glutes',
  'Traps',
  'Shoulders',
  'Lats',
  'LowerLegs',
  'UpperLegs',
  'Back',
  'Triceps',
];
export type MuscleGroup = typeof MuscleGroups[number];

export type Mechanics = 'Compound' | 'Isolation' | 'Unknown';
export const Equipments = [
  'Bands',
  'Barbell',
  'Bench',
  'BodyOnly',
  'Dumbbell',
  'ExerciseBall',
  'EzBar',
  'FoamRoll',
  'Kettlebell',
  'MachineCardio',
  'MachineStrength',
  'Other',
  'PullBar',
  'WeightPlate',
  'Unknown',
];

export type Equipment = typeof Equipments[number];

export interface Image {
  id: number;
  bytes: string;
  name: string;
  fileExtension: string;
}

interface BaseExercise {
  id: number;
  name: string;
  type: ExerciseType;
  mainMuscleGroup: MuscleGroup;
  detailedMuscleGroup: MuscleGroup | null;
  otherMuscleGroups: MuscleGroup[];
  mechanics: Mechanics;
  equipment: Equipment;
  muscleGroupImage: Image;
  muscleGroupStats: Record<MuscleGroup, number>;
}

export interface StrengthExercise extends BaseExercise {
  type: 'strength';
}

export interface CardioExercise extends BaseExercise {
  type: 'cardio';
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
  type: 'strength';
}

export interface CardioData extends BaseData {
  targetDistance: number;
  targetDuration: number;
  distance: number | null;
  duration: number | null;
  type: 'cardio';
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
  muscleGroup: 'Abs';
}

export interface BuddyBiceps extends BuddyAnatomyBase {
  muscleGroup: 'Biceps';
}

export interface BuddyChest extends BuddyAnatomyBase {
  muscleGroup: 'Chest';
}

export interface BuddyForearms extends BuddyAnatomyBase {
  muscleGroup: 'Forearms';
}

export interface BuddyGlutes extends BuddyAnatomyBase {
  muscleGroup: 'Glutes';
}

export interface BuddyTraps extends BuddyAnatomyBase {
  muscleGroup: 'Traps';
}

export interface BuddyShoulders extends BuddyAnatomyBase {
  muscleGroup: 'Shoulders';
}

export interface BuddyLats extends BuddyAnatomyBase {
  muscleGroup: 'Lats';
}

export interface BuddyLowerLegs extends BuddyAnatomyBase {
  muscleGroup: 'LowerLegs';
}

export interface BuddyUpperLegs extends BuddyAnatomyBase {
  muscleGroup: 'UpperLegs';
}

export interface BuddyBack extends BuddyAnatomyBase {
  muscleGroup: 'Back';
}

export interface BuddyTriceps extends BuddyAnatomyBase {
  muscleGroup: 'Triceps';
}

export interface BuddyAnatomy {
  id: number;
  level: number;
  muscleGroup: MuscleGroup;
}

export type StrengthLevelTypes =
  | 'overall'
  | 'powerlifting'
  | 'bodybuilding'
  | 'weightlifting';

export type RewardType = 'badge' | 'title' | 'experience';

export interface BaseReward {
  id: number;
  rewardType: RewardType;
}

export interface Title extends BaseReward {
  name: string;
  rewardType: 'title';
}

export interface Badge extends BaseReward {
  name: string;
  image: Image;
  rewardType: 'badge';
}

export interface Experience extends BaseReward {
  amount: number;
  strengthLevel: StrengthLevelTypes;
  rewardType: 'experience';
}

export type Reward = Title | Badge | Experience;

export type AchievementType =
  | 'streak'
  | 'level'
  | 'reps'
  | 'sets'
  | 'weight'
  | 'distance';

export interface BaseAchievement {
  id: number;
  title: string;
  description: string;
  rewards: Reward[];
  achievementType: AchievementType;
}

export interface WeightAchievement extends BaseAchievement {
  targetWeight: number;
  targetMuscleGroup: MuscleGroup;
  hasTargetMuscleGroup: boolean;
  achievementType: 'weight';
}

export interface StreakAchievement extends BaseAchievement {
  targetStreak: number;
  achievementType: 'streak';
}

export interface RepsAchievement extends BaseAchievement {
  targetReps: number;
  targetMuscleGroup: MuscleGroup;
  hasTargetMuscleGroup: boolean;
  achievementType: 'reps';
}

export interface SetsAchievement extends BaseAchievement {
  targetSets: number;
  targetMuscleGroup: MuscleGroup;
  hasTargetMuscleGroup: boolean;
  achievementType: 'sets';
}

export interface DistanceAchievement extends BaseAchievement {
  targetDistance: number;
  achievementType: 'distance';
}

export interface LevelAchievement extends BaseAchievement {
  targetLevel: number;
  targetStrengthLevelType: StrengthLevelTypes;
  achievementType: 'level';
}

export type Achievement =
  | WeightAchievement
  | RepsAchievement
  | SetsAchievement
  | DistanceAchievement
  | LevelAchievement
  | StreakAchievement;

export type UserAchievement = Achievement & {
  isCompleted: boolean;
  progress: number;
};

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
}

export type GraphType = 'Reps' | 'Sets' | 'Weight' | 'Distance';

export interface UserSettings {
  weightUnit: 'pounds' | 'kilograms';
  measurementUnit: 'metric' | 'imperial';
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
  inventory: Reward[];
  claimedAchievements: number[];
  title: Title | null;
  badge: Badge | null;
}
