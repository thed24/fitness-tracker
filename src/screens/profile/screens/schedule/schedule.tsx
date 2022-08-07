import { Card, Heading, HStack, Text } from "native-base";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Button, ErrorAlert, Screen } from "components";
import { ScheduledWorkout } from "types";
import { useAddWorkout } from "api";
import { AddWorkoutModal } from "../../components/addWorkoutModal/addWorkoutModal";

export function Schedule() {
  const { error, isLoading, mutate } = useAddWorkout();
  const [errors, setErrors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useStore();

  useEffect(() => {
    if (error instanceof Error) {
      setErrors([error.message]);
    }
  }, [error]);

  if (!user) {
    return <Text>An error has occured, please sign out and try again.</Text>;
  }

  const scheduledWorkouts = user
    ? user.workouts.filter((userFromState) => !userFromState.past)
    : [];

  const content =
    scheduledWorkouts.length > 0 ? (
      <Carousel
        width={300}
        height={300}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 35,
          parallaxAdjacentItemScale: 0.8,
        }}
        data={scheduledWorkouts}
        renderItem={({ item }) => (
          <Card height="5/6">
            <Heading> Workout on {new Date(item.time).toLocaleDateString()} </Heading>
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
                        {activity.sets} x {activity.reps} at {activity.weight}kg
                      </Text>
                    </HStack>
                  );
                case "cardio":
                  return (
                    <HStack justifyContent="center">
                      <Text> {activity.name}: </Text>
                      <Text>
                        {activity.distance} km in {activity.duration} minutes
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
      <Text> No workouts scheduled </Text>
    );

  const handleAddWorkout = (workout: ScheduledWorkout) => {
    mutate({ userId: user.id, workout });
  };

  return (
    <Screen loading={isLoading}>
      {errors.length > 0 && (
        <ErrorAlert errors={errors} clearErrors={() => setErrors([])} />
      )}
      <AddWorkoutModal
        onSubmit={handleAddWorkout}
        isOpen={showModal}
        setIsOpen={setShowModal}
      />
      <Heading marginTop="10"> Workout Schedule </Heading>
      {content}
      <Button anchored onPress={() => setShowModal(true)}>
        Add Workout
      </Button>
    </Screen>
  );
}
