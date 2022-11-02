import React from 'react';
import { Text, Card, Box, Progress, useTheme, HStack, Spinner } from 'native-base';
import { useStore } from 'store';
import { Accordion } from 'components';
import { titleCase } from 'utils';
import { useAchievements } from 'api';
import { Achievement, Reward, StrengthData, StrengthExercise, User } from 'types';

export function Achievements() {
  const { user, getPastWorkouts } = useStore();
  const theme = useTheme();
  const { data: achievements } = useAchievements();

  const workouts = getPastWorkouts();

  const createReward = (reward: Reward) => {
    if (reward.rewardType === 'experience') {
      return (
        <Text key={`${reward.id}`} fontSize="sm"><> {reward.amount} {reward.strengthLevel} XP </></Text>
      );
    }

    if (reward.rewardType === 'title') {
      return (
        <Text key={`${reward.id}`} fontSize="sm"><> title, &quot;{titleCase(reward.name)}&quot; </></Text>
      );
    }

    return (
      <Text key={`${reward.id}`} fontSize="sm" color="gray.500"> Unkown Reward </Text>
    );
  };

  const createAchievement = (currentUser: User, achievement: Achievement) => {
    if (achievement.achievementType === 'streak') {
      return (
        <>
          <HStack key={`${achievement.title}-streak-stack`}>
            <Text
              key={`${achievement.title}-streak-title`}
              fontSize="sm"
            >
              {currentUser.workoutBuddy.data.streak}
            </Text>
            <Text
              key={`${achievement.title}-streak-subtitle`}
              fontSize="sm"
            >
              /{achievement.targetStreak}
            </Text>
            <Text 
              key={`${achievement.title}-streak-subbertitle`}
              ml="auto" 
              fontSize="sm"
            >
              Unlocks {achievement.rewards.map(createReward)}
            </Text>
          </HStack>
          <Progress
            key={`${achievement.title}-streak-progress`}
            value={currentUser.workoutBuddy.data.streak}
            max={achievement.targetStreak}
          />
        </>
      );
    }

    if (achievement.achievementType === 'weight') {
      const weightForMusclegroup = workouts
        .filter((w) => w.activities.map((a) => a.mainMuscleGroup === achievement.targetMuscleGroup))
        .flatMap((w) => w.activities.map((a) => a as StrengthExercise & StrengthData))
        .reduce((acc, curr) => acc + (curr?.weight ? curr.weight : 0), 0);

      return (
        <>
          <HStack key={`${achievement.title}-weight-stack`}>
            <Text key={`${achievement.title}-weight-title`} fontSize="sm">{`${weightForMusclegroup}/${achievement.targetWeight} for ${achievement.targetMuscleGroup}`}</Text>
            <Text key={`${achievement.title}-weight-`} fontSize="sm" ml="auto">
              Unlocks {achievement.rewards.map(createReward)}
            </Text>
          </HStack>
          <Progress
            key={`${achievement.title}-weight-progress`}
            value={weightForMusclegroup}
            max={achievement.targetWeight}
          />
        </>
      );
    }
  };

  if (!user || !achievements) {
    return (
      <Card w="90%" backgroundColor={theme.colors.white} my={4}>
        <Spinner />
      </Card>
    )
  }

  return (
    <Card w="90%" backgroundColor={theme.colors.white} my={4}>
      <Accordion title="Achievements">
        {achievements.map((achievement) => (
          <Box key={`${achievement.title}-box`} my={4}>
            <HStack key={`${achievement.title}-stack`} space={4}>
              <Text key={`${achievement.title}-title`}>{titleCase(achievement.title)}</Text>
              <Text key={`${achievement.title}-description`} w="65%" textAlign="right" ml="auto" fontSize="sm" color={theme.colors.gray[500]}> {achievement.description} </Text>
            </HStack>
            {createAchievement(user, achievement)}
          </Box>
        ))}
      </Accordion>
    </Card>
  );
}
