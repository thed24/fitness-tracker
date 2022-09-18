import React from "react";
import { Text, Heading } from "native-base";
import { useStore } from "store";
import { Screen } from "components";
import { WorkoutChart } from "./components/workoutChart/workoutChart";
import { BuddyStats } from "./components/buddyStats/buddyStats";

export function Profile() {
  const { user } = useStore();

  return (
    <Screen scrollable loading={!user}>
      <Heading marginTop="10"> Welcome back {user?.username}! </Heading>

      <Text fontSize="md" fontWeight="semibold" marginBottom={4}>
        Its time to get your workout on!
      </Text>

      <BuddyStats />
      <WorkoutChart />
    </Screen>
  );
}
