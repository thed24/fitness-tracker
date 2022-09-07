import { Box, Heading, Text, useTheme, View } from "native-base";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Screen } from "components";
import { ScheduledWorkout } from "types";
import { useEditWorkout } from "api";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PaginationDot from "react-native-animated-pagination-dot";
import { ScheduledWorkoutCard } from "./components/scheduledWorkoutCard";

export function Schedule() {
  const { isLoading: editLoading, mutate: editWorkout } = useEditWorkout();

  const { user } = useStore();
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!user) {
    return <Text>An error has occured, please sign out and try again.</Text>;
  }

  const scheduledWorkouts = (
    user ? user.workouts.filter((userFromState) => !userFromState.past) : []
  ) as ScheduledWorkout[];

  const { width } = Dimensions.get("window");
  const content =
    scheduledWorkouts.length > 0 ? (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Carousel
          loop={false}
          pagingEnabled
          width={width}
          height={width}
          scrollAnimationDuration={1000}
          data={scheduledWorkouts}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={({ item, index }) => (
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
          )}
        />
        <Box marginLeft="auto" marginRight="auto">
          <PaginationDot
            activeDotColor={theme.colors.primary[500]}
            curPage={activeIndex}
            maxPage={scheduledWorkouts.length}
          />
        </Box>
      </GestureHandlerRootView>
    ) : (
      <Text> No workouts scheduled </Text>
    );

  return (
    <Screen loading={editLoading}>
      <Heading marginTop="10"> Workout Schedule </Heading>
      {content}
    </Screen>
  );
}
