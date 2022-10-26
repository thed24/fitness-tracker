import React from 'react';
import { Text, Card, Box, Progress, useTheme, HStack } from 'native-base';
import { useStore } from 'store';
import { Accordion } from 'components';
import { titleCase } from 'utils';
import { useAchievements } from 'api';
import { Achievement, Reward } from 'types';

export function Achievements() {
  const { user } = useStore();
  const theme = useTheme();
  const { data: achievements } = useAchievements();

  if (!user || !achievements) {
    return null;
  }

  const createReward = (reward: Reward) => {
    if (reward.rewardType === 'experience') {
      return (
        <Text fontSize="sm">
          <>{reward.amount} {reward.strengthLevel} XP</>
        </Text>
      );
    }

    return (
      <Text fontSize="sm" color="gray.500">
        Unkown Reward
      </Text>
    );
  }

  const createAchievement = (achievement: Achievement) => {
    if (achievement.achievementType === "streak") {
      return (
        <>
          <HStack mt={2}>
            <Text fontSize="sm">{user.workoutBuddy.data.streak}</Text>
            <Text fontSize="sm">/{achievement.targetStreak}</Text>
            <Text ml="auto" fontSize="sm">
              Unlocks{' '}{achievement.rewards.map(createReward)}
            </Text>
          </HStack>
          <Progress
            style={{ marginTop: 5 }}
            value={user.workoutBuddy.data.streak}
            size="md"
            max={achievement.targetStreak}
            borderWidth="2"
            borderColor={theme.colors.coolGray[600]}
          />
        </>
      );
    }
  };

  return (
    <Card w="90%" backgroundColor={theme.colors.white} my={4}>
      <Accordion title="Achievements">
        {achievements.map((achievement) => (
          <Box
            key={achievement.title}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Box w="100%">
              {titleCase(achievement.title)}
              <Text fontSize="sm" color={theme.colors.gray[500]}>
                {achievement.description}
              </Text>
              {createAchievement(achievement)}
            </Box>
          </Box>
        ))}
      </Accordion>
    </Card>
  );
}
