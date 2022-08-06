import { Card, Heading, HStack, Text } from "native-base";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Screen } from "components";

export function History() {
  const { pastWorkouts } = useStore();

  const content =
    pastWorkouts.length > 0 ? (
      <Carousel
        width={350}
        height={350}
        mode="parallax"
        pagingEnabled
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 35,
          parallaxAdjacentItemScale: 0.8,
        }}
        data={pastWorkouts()}
        renderItem={({ item }) => (
          <Card shadow="8" height="5/6">
            <Heading> Workout on {item.time.toLocaleDateString()} </Heading>
            <Heading size="md" margin="2">
              Exercises
            </Heading>
            {item.activities.map((activity) => {
              switch (activity.type) {
                case "strength":
                  return (
                    <HStack justifyContent="center">
                      <Text> {activity.name}: </Text>
                      <Text>
                        {activity.sets} x {activity.reps} at {activity.weight}kg{" "}
                      </Text>
                    </HStack>
                  );
                case "cardio":
                  return (
                    <HStack justifyContent="center">
                      <Text> {activity.name}: </Text>
                      <Text>
                        {activity.distance} km in {activity.duration} minutes{" "}
                      </Text>
                    </HStack>
                  );
                default:
                  return null;
              }
            })}
          </Card>
        )}
      />
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
