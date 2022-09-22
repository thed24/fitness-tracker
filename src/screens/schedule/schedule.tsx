import { Text, View } from "native-base";
import React from "react";
import { useStore } from "store";
import { Screen, Carousel } from "components";
import { ScheduledWorkout } from "types";
import { useEditWorkout } from "api";
import { ScheduledWorkoutCard } from "./components/scheduledWorkoutCard";

export function Schedule() {
  const { isLoading: editLoading, mutate: editWorkout } = useEditWorkout();
  const { user, getScheduledWorkouts } = useStore();
  
  const scheduledWorkouts = getScheduledWorkouts();

  if (!user) {
    return <Text>An error has occured, please sign out and try again.</Text>;
  }

  const renderItem = (item: ScheduledWorkout, index: number) => (
    <View margin="auto">
      <ScheduledWorkoutCard
        scheduledWorkout={item}
        onComplete={() =>
          editWorkout({
            userId: user.id,
            workout: { ...item, completed: true, past: true },
          })
        }
        key={index}
      />
    </View>
  );

  const content =
    scheduledWorkouts.length > 0 ? (
      <Carousel renderItem={renderItem} items={scheduledWorkouts} />
    ) : (
      <Text marginTop={10}> No workouts scheduled </Text>
    );

  return (
    <Screen loading={editLoading}>
      {content}
    </Screen>
  );
}
