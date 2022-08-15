import React from "react";
import { ScheduledWorkout } from "types";
import { Button, WorkoutCard } from "components";

interface Props {
  scheduledWorkout: ScheduledWorkout;
  onComplete: () => void;
}

export function ScheduledWorkoutCard({ scheduledWorkout, onComplete }: Props) {
  const footer = (
    <Button onPress={() => onComplete()} size="xl">
      Complete Workout
    </Button>
  );

  return <WorkoutCard workout={scheduledWorkout} footer={footer} />;
}
