import { Box, Heading, Text, useTheme, View } from "native-base";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Screen, WorkoutCard } from "components";
import { CompletedWorkout } from "types";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PaginationDot from "react-native-animated-pagination-dot";

export function History() {
  const { user } = useStore();
  const theme = useTheme();
  const { width } = Dimensions.get("window");
  const pastWorkouts = (
    user
      ? user.workouts
          .filter((userFromState) => userFromState.past)
          .sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          )
      : []
  ) as CompletedWorkout[];
  const [activeIndex, setActiveIndex] = React.useState(pastWorkouts.length - 1);

  const content =
    pastWorkouts.length > 0 ? (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Carousel
          loop={false}
          defaultIndex={pastWorkouts.length - 1}
          width={width}
          height={width}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index) => setActiveIndex(index)}
          data={pastWorkouts}
          renderItem={({ item, index }) => (
            <View margin="auto">
              <WorkoutCard workout={item} key={index} footer={null} />
            </View>
          )}
        />
        <Box marginLeft="auto" marginRight="auto">
          <PaginationDot
            activeDotColor={theme.colors.primary[500]}
            curPage={activeIndex}
            maxPage={pastWorkouts.length}
          />
        </Box>
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
