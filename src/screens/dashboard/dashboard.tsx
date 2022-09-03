import React from "react";
import { Text, Heading } from "native-base";
import { useStore } from "store";
import { Screen } from "components";
import { WorkoutChart } from "./components/workoutChart";
import { BuddyStats } from "./components/buddyStats";

export function Dashboard() {
  const { user } = useStore();

  return (
    <Screen scrollable loading={!user}>
      <Heading marginTop="10"> Welcome back {user?.firstName}! </Heading>

      <Text fontSize="md" fontWeight="semibold" marginBottom={4}>
        Its time to get your workout on!
      </Text>

      <BuddyStats />

      <WorkoutChart />
    </Screen>
  );
}
