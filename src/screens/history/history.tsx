import { Text, View } from "native-base";
import React from "react";
import { useStore } from "store";
import { Screen, WorkoutCard, Carousel } from "components";
import { CompletedWorkout } from "types";

export function History() {
  const { getPastWorkouts } = useStore();

  const pastWorkouts = getPastWorkouts();

  const renderItem = (item: CompletedWorkout, index: number) => (
    <View margin="auto">
      <WorkoutCard workout={item} key={index} footer={null} />
    </View>
  );

  const content = pastWorkouts.length > 0 ? (
      <Carousel renderItem={renderItem} items={pastWorkouts} />
    ) : (
      <Text marginTop={10}> No past workouts exist </Text>
    );

  return (
    <Screen>
      {content}
    </Screen>
  );
}
