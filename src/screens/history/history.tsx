import { Text, View } from "native-base";
import React from "react";
import { Screen, WorkoutCard, Carousel } from "components";
import { CompletedWorkout } from "types";
import { getPastWorkouts } from "utils";
import { useGetUser } from "api";

export function History() {
  const { data: user } = useGetUser();

  const pastWorkouts = getPastWorkouts(user);

  const renderItem = (item: CompletedWorkout, index: number) => (
    <View margin="auto">
      <WorkoutCard workout={item} key={index} footer={null} />
    </View>
  );

  const content = pastWorkouts.length > 0 
    ? (<Carousel renderItem={renderItem} items={pastWorkouts} defaultIndex={pastWorkouts.length - 1} />) 
    : (<Text fontSize="md" mt={10}> No past workouts exist </Text>);

  return (
    <Screen>
      {content}
    </Screen>
  );
}
