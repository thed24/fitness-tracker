import { Heading, Stack, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { useStore } from "store";
import { Button, ErrorAlert, Pagination, Screen } from "components";
import { ScheduledWorkout } from "types";
import { useAddWorkout, useEditWorkout } from "api";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { AddWorkoutModal } from "./components/addWorkoutModal";
import { ScheduledWorkoutCard } from "./components/scheduledWorkoutCard";

export function Schedule() {
  const {
    error: editError,
    isLoading: editLoading,
    mutate: editWorkout,
  } = useEditWorkout();

  const {
    error: addError,
    isLoading: addLoading,
    mutate: addWorkout,
  } = useAddWorkout();

  const { user } = useStore();
  const [errors, setErrors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const progressValue = useSharedValue<number>(0);

  useEffect(() => {
    if (editError instanceof Error) {
      setErrors([editError.message]);
    }
    if (addError instanceof Error) {
      setErrors([addError.message]);
    }
  }, [editError, addError]);

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
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
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
        <Pagination
          data={scheduledWorkouts}
          animValue={progressValue}
          length={scheduledWorkouts.length}
        />
      </GestureHandlerRootView>
    ) : (
      <Text> No workouts scheduled </Text>
    );

  return (
    <Screen loading={editLoading || addLoading}>
      {errors.length > 0 && (
        <ErrorAlert errors={errors} clearErrors={() => setErrors([])} />
      )}
      <AddWorkoutModal
        onSubmit={(workout) => addWorkout({ userId: user.id, workout })}
        isOpen={showModal}
        setIsOpen={setShowModal}
      />
      <Heading marginTop="10"> Workout Schedule </Heading>
      {content}
      <Stack w="md" position="absolute" bottom={5}>
        <Button centered onPress={() => setShowModal(true)}>
          Add Workout
        </Button>
      </Stack>
    </Screen>
  );
}
