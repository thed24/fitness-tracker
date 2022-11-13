import React, { useEffect, useState } from 'react';
import { Text, Card, Box, Progress, useTheme, HStack, Spinner } from 'native-base';
import { useStore } from 'store';
import { Accordion, Button } from 'components';
import { titleCase } from 'utils';
import { useRecordAchievement, useUserAchievements } from 'api';
import { Reward, User, UserAchievement } from 'types';
import { RewardsModal } from './components/rewardsModal';

export function Achievements() {
  const { user } = useStore();
  const theme = useTheme();
  const { data: achievements } = useUserAchievements({ userId: user?.id ?? 0 });
  const { mutate: recordAchievement, data: recordResponse, isLoading: recordingAchievement } = useRecordAchievement();
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (recordResponse) {
      setRewards(recordResponse.rewards);
    }
  }, [recordResponse]);

  const createReward = (reward: Reward) => {
    if (reward.rewardType === 'experience') {
      return (
        <Text key={`${reward.id}-exp`} fontSize="sm"><> {reward.amount} {reward.strengthLevel} XP </></Text>
      );
    }

    if (reward.rewardType === 'title') {
      return (
        <Text key={`${reward.id}-title`} fontSize="sm"><> title, &quot;{titleCase(reward.name)}&quot; </></Text>
      );
    }

    return (
      <Text key={`${reward.id}-unknown`} fontSize="sm" color="gray.500"> Unkown Reward </Text>
    );
  };

  const createAchievement = (currentUser: User, userAchievement: UserAchievement) => {
    if (userAchievement.achievementType === 'streak') {
      return (
        <>
          <HStack key={`${userAchievement.title}-streak-stack`}>
            <Text
              key={`${userAchievement.title}-streak-title`}
              fontSize="sm"
            >
              {userAchievement.progress}
            </Text>
            <Text
              key={`${userAchievement.title}-streak-subtitle`}
              fontSize="sm"
            >
              /{userAchievement.targetStreak}
            </Text>
            <Text 
              key={`${userAchievement.title}-streak-subbertitle`}
              ml="auto" 
              fontSize="sm"
            >
              Unlocks {userAchievement.rewards.map(createReward)}
            </Text>
          </HStack>
          <Progress
            key={`${userAchievement.title}-streak-progress`}
            value={currentUser.workoutBuddy.data.streak}
            max={userAchievement.targetStreak}
          />
        </>
      );
    }

    if (userAchievement.achievementType === 'weight') {
      return (
        <>
          <HStack key={`${userAchievement.title}-weight-stack`}>
            <Text key={`${userAchievement.title}-weight-title`} fontSize="sm">{`${userAchievement.progress}/${userAchievement.targetWeight} for ${userAchievement.targetMuscleGroup}`}</Text>
            <Text key={`${userAchievement.title}-weight-description`} fontSize="sm" ml="auto">
              Unlocks {userAchievement.rewards.map(createReward)}
            </Text>
          </HStack>
          <Progress
            key={`${userAchievement.title}-weight-progress`}
            value={userAchievement.progress}
            max={userAchievement.targetWeight}
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
    <>
      <RewardsModal rewards={rewards} onClose={() => setRewards([])} />
      <Card w="90%" my={4}>
        <Accordion title="Achievements">
          {achievements.map((achievement) => (
            <Box key={`${achievement.title}-box`} my={4}>
              <HStack key={`${achievement.title}-stack`} space={4}>
                <Text key={`${achievement.title}-title`}>{titleCase(achievement.title)}</Text>
                <Text key={`${achievement.title}-description`} w="65%" textAlign="right" ml="auto" fontSize="sm" color={theme.colors.gray[500]}> {achievement.description} </Text>
              </HStack>
              {createAchievement(user, achievement)}
              {achievement.isCompleted && 
                <Button 
                  style={{ marginTop: 10 }} 
                  onPress={() => recordAchievement({ userId: user.id, achievementId: achievement.id })} 
                  isLoading={recordingAchievement} key={`${achievement.title}-button`}> 
                    Claim 
                  </Button>
              }
            </Box>
          ))}
        </Accordion>
      </Card>
    </>
  );
}
