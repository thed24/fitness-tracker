import { Heading, Text } from "native-base";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Pagination, Screen, WorkoutCard } from "components";
import { CompletedWorkout } from "types";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export function History() {
  const { user } = useStore();
  const progressValue = useSharedValue<number>(0);

  const pastWorkouts = (
    user
      ? user.workouts
          .filter((userFromState) => userFromState.past)
          .sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          )
      : []
  ) as CompletedWorkout[];

  const { width } = Dimensions.get("window");
  const content =
    pastWorkouts.length > 0 ? (
      <GestureHandlerRootView>
        <Carousel
          loop={false}
          defaultIndex={pastWorkouts.length - 1}
          width={width / 1.3}
          height={width}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 50,
          }}
          data={pastWorkouts}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          renderItem={({ item, index }) => (
            <WorkoutCard workout={item} key={index} footer={null} />
          )}
        />
        <Pagination
          data={pastWorkouts}
          animValue={progressValue}
          length={pastWorkouts.length}
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
