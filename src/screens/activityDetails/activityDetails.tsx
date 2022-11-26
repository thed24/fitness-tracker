import { useGetUser } from 'api';
import { Card, FlatList, Image, useTheme, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { Activity } from '../../types/domain';

interface Props {
  route: {
    params: {
      mainActivityId: number;
    };
  };
}

export function ActivityDetailsScreen({ route }: Props) {
  const { data: user } = useGetUser();
  const theme = useTheme();

  const activities = user?.workouts.flatMap((w) => w.activities) ?? [];
  const mainActivity = activities.find(
    (a) => a.id === route.params.mainActivityId
  );

  if (mainActivity === undefined) {
    return <Text>Activity not found</Text>;
  }

  const filteredActivities = activities.filter(
    (a) => a.exerciseId === mainActivity?.exerciseId && a.id !== mainActivity.id
  );

  const createActivityCard = (activity: Activity, isMain: boolean = false) => (
    <>
      <Card
        key={activity.id}
        my={4}
        mx="auto"
        w="90%"
        borderWidth={1}
        borderColor={
          isMain ? theme.colors.primary[500] : theme.colors.gray[300]
        }
      >
        <Text key={`${activity.id} Name`}>{activity.name}</Text>
        <Text key={`${activity.id} Notes`}>Notes: {activity?.notes ?? 'None'}</Text>
        {activity.type === 'strength' && (
          <View key={`${activity.id} View`}>
            <Text key={`${activity.id} Sets`}>
              Target: {activity.targetSets} x {activity.targetReps} at{' '}
              {activity.targetWeight}
            </Text>
            {activity.sets && activity.reps && activity.weight && (
              <Text key={`${activity.id} Actual Sets`}>
                Result: {activity.sets} x {activity.reps} at {activity.weight}
              </Text>
            )}
          </View>
        )}
        {activity.image && (
          <Image
            key={`${activity.id} Image`}
            alt={`${activity.name} image`}
            mt={4}
            width={200}
            height={200}
            source={{
              uri: `data:image/${activity.image.fileExtension};base64,${activity.image.bytes}`,
            }}
          />
        )}
      </Card>
      {isMain && <Text fontWeight="bold" mx="auto" key={`${activity.id} Other`}> Other {activity.name} Workouts </Text>}
    </>
  );

  return (
    <View>
      <FlatList
        data={filteredActivities}
        ListHeaderComponent={createActivityCard(mainActivity, true)}
        renderItem={({ item }) => createActivityCard(item)}
      />
    </View>
  );
}
