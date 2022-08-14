import { Heading, Text } from "native-base";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Screen } from "components";
import { CompletedWorkout } from "types";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PastWorkoutCard } from "./components/pastWorkoutCard";

export function History() {
  const { user } = useStore();

  const pastWorkouts = (
    user ? user.workouts.filter((userFromState) => userFromState.past) : []
  ) as CompletedWorkout[];

  const { width } = Dimensions.get("window");
  const content =
    pastWorkouts.length > 0 ? (
      <GestureHandlerRootView>
        <Carousel
          loop={false}
          width={width / 1.3}
          height={width}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 50,
          }}
          data={pastWorkouts}
          renderItem={({ item, index }) => (
            <PastWorkoutCard pastWorkout={item} key={index} />
          )}
        />
      </GestureHandlerRootView>
    ) : (
      <Text> No past workouts exist </Text>
    );

  return (
    <Screen>
      <Heading marginTop="10"> Workout History </Heading>
      {content}
    </Screen>
  );
}
