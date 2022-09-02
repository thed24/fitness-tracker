import React from "react";
import { Text, Heading, Divider } from "native-base";
import { useStore } from "store";
import { Screen } from "components";
import { WorkoutChart } from "./components/workoutChart";
import { BuddyStats } from "./components/buddyStats";

export function Dashboard() {
  const { user } = useStore();

  return (
    <Screen scrollable loading={!user}>
      <Heading marginTop="10"> Welcome, {user?.firstName}! </Heading>

      <Text fontSize="md" fontWeight="semibold">
        Its time to get your workout on!
      </Text>

      <Divider marginTop="4" w="3/4" bg="gray.400" />

      <BuddyStats />

      <WorkoutChart />
    </Screen>
  );
}
