import { useNavigation } from '@react-navigation/native';
import { useGetUser } from 'api';
import dateFormat from 'dateformat';
import { Card, FlatList, Image, useTheme, Text, Divider, TextArea, Heading, View } from 'native-base';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Screen } from '../../components/screen/screen';
import { Activity, Workout } from '../../types/domain';

interface Props {
  route: {
    params: {
      mainActivityId: number;
    };
  };
}

type WorkoutAndActivity = { activity: Activity } & Omit<Workout, 'activities'>;

export function ActivityDetailsScreen({ route }: Props) {
  const { data: user } = useGetUser();
  const theme = useTheme();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const activities = user?.workouts.map((workout) => workout.activities.map((activity) => ({ ...workout, activity }))).flat() ?? [];
  const mainActivity = activities.find(
    (a) => a.activity.id === route.params.mainActivityId
  );

  if (mainActivity === undefined) {
    return <Text>Activity not found</Text>;
  }

  navigation.setOptions({
    title: mainActivity.activity.name,
  });

  const filteredActivities = activities.filter(
    (a) => a.activity.exerciseId === mainActivity?.activity.exerciseId && a.id !== mainActivity.id
  ).sort((a, b) => b.time.localeCompare(a.time));

  const createActivityCard = (workout: WorkoutAndActivity, isMain: boolean = false) => {
    const { activity } = workout;

    return (
      <View w={width} key={activity.id}>
        <Card
          key={activity.id}
          my={4}
          mx="auto"
          w="90%"
        >
          <Heading mx="auto" fontWeight="bold" key={`${activity.id} Title`}>{workout.name}</Heading>
          <Text mx="auto" key={`${activity.id} Time`}>{dateFormat(new Date(workout.time), 'dddd, mmmm dS')}</Text>
          <Divider my={4} />

          {activity.type === 'cardio' && (
            <View key={`${activity.id} View`}>
              <Text key={`${activity.id} Sets`}>
                <Text fontWeight="bold"> Goal </Text>
                {activity.targetDistance} in {activity.targetDuration}
              </Text>

              {activity.duration !== null && activity.distance !== null && (
                <Text key={`${activity.id} Actual Sets`}>
                  <Text fontWeight="bold"> Result </Text>
                  {activity.distance} in {activity.duration}
                </Text>
              )}

              {!activity.duration || !activity.distance && (
                <Text key={`${activity.id} Uncompleted`}>
                  <Text fontWeight="bold"> Result </Text>
                  Not completed
                </Text>
              )}
            </View>
          )}

          {activity.type === 'strength' && (
            <View key={`${activity.id} View`}>
              <Text key={`${activity.id} Sets`}>
                <Text fontWeight="bold"> Goal </Text>
                {activity.targetSets} x {activity.targetReps} at {activity.targetWeight}
              </Text>

              {activity.sets && activity.reps && activity.weight && (
                <Text key={`${activity.id} Actual Sets`}>
                  <Text fontWeight="bold"> Result </Text>
                  {activity.sets} x {activity.reps} at {activity.weight}
                </Text>
              )}

              {!activity.sets || !activity.reps || !activity.weight && (
                <Text key={`${activity.id} Uncompleted`}>
                  <Text fontWeight="bold"> Result </Text>
                  Not completed
                </Text>
              )}
            </View>
          )}

          <TextArea mx="auto" my={4} autoCompleteType="" key={`${activity.id} Notes`} value={activity.notes ?? 'None'} isDisabled />

          {activity.image && (
            <Image
              key={`${activity.id} Image`}
              alt={`${workout.name} image`}
              mx="auto"
              borderWidth={1}
              rounded={10}
              borderColor={theme.colors.gray[300]}
              width={500}
              height={200}
              source={{
                uri: `data:image/${activity.image.fileExtension};base64,${activity.image.bytes}`,
              }} />
          )}
        </Card>
        {isMain && <Text fontWeight="bold" mx="auto" key={`${activity.id} Other`}> Other {workout.activity.name} Workouts </Text>}
      </View>
    );
  };

  return (
    <Screen>
      <FlatList
        data={filteredActivities}
        ListHeaderComponent={createActivityCard(mainActivity, true)}
        renderItem={({ item }) => createActivityCard(item)}
      />
    </Screen>
  );
}
