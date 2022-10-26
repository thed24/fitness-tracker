import React from "react";
import { Text, Heading } from "native-base";
import { useStore } from "store";
import { Screen } from "components";
import { WorkoutChart } from "./components/workoutChart/workoutChart";
import { BuddyStats } from "./components/buddyStats/buddyStats";
import { Achievements } from "./components/achievements/achievements";

export function Profile() {
  const { user } = useStore();

  const streakText = (user?.workoutBuddy?.data?.streak ?? 0) > 0
    ? `\nYou're on a roll, keep up the ${user?.workoutBuddy.data.streak} day streak!`
    : null;

  return (
    <Screen scrollable loading={!user}>
      <Heading marginTop="5"> Welcome back, {user?.username} </Heading>

      <Text fontSize="md" fontWeight="semibold" textAlign="center" mb={4}>
        Its time to get your workout on
        {streakText}
      </Text>

      <WorkoutChart />
      <BuddyStats />
      <Achievements />
    </Screen>
  );
}
