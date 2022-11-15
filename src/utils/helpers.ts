import { CompletedWorkout, ScheduledWorkout, User } from 'types';
import {
  createDistanceFormatter,
  createMeasurementFormatter,
  createWeightFormatter,
} from './formatting';

/* eslint-disable no-console */
export type LogScope = 'info' | 'error' | 'debug';

export const log = (message: any, scope: LogScope = 'debug') => {
  if (process.env.NODE_ENV !== 'production') {
    const messageAsJson = JSON.stringify(message);
    switch (scope) {
      case 'info':
        console.info(messageAsJson);
        break;
      case 'error':
        console.error(messageAsJson);
        break;
      case 'debug':
        console.debug(messageAsJson);
        break;
      default:
        console.log(messageAsJson);
    }
  }
};

export const getWeightFormatter = (user: User | undefined) =>
  createWeightFormatter(user?.userSettings?.weightUnit || 'kilograms');

export const getDistanceFormatter = (user: User | undefined) =>
  createDistanceFormatter(user?.userSettings?.measurementUnit || 'metric');

export const getWeasurementFormatter = (user: User | undefined) =>
  createMeasurementFormatter(user?.userSettings?.measurementUnit || 'metric');

export const getScheduledWorkouts = (user: User | undefined) =>
  (user
    ? user.workouts.filter((workout) => !workout.past && !workout.completed)
    : []) as ScheduledWorkout[];

export const getPastWorkouts = (user: User | undefined) =>
  (user
    ? user.workouts
        .filter((workout) => workout.past || workout.completed)
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    : []) as CompletedWorkout[];
