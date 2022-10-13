import React from "react";
import { ScheduledWorkout } from "types";
import { WorkoutCard } from "components";
import { Button } from "native-base";

interface Props {
  scheduledWorkout: ScheduledWorkout;
  onComplete: () => void;
}

export function ScheduledWorkoutCard({ scheduledWorkout, onComplete }: Props) {
  const footer = (
    <Button onPress={() => onComplete()}>
      Complete Workout
    </Button>
  );

  return <WorkoutCard workout={scheduledWorkout} footer={footer} />;
}
