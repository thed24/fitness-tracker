import { DatePicker, FormLabel } from "components";
import { Box, Divider, Slider, Text, Card } from "native-base";
import React from "react";
import { titleCase } from "utils";
import { ActivityEntry } from "../components/activityEntry";
import { CreateWorkoutProps } from "../createWorkout";

export function ActivityDetails({ form }: CreateWorkoutProps) {
  const { date, repeat } = form.values;
  const setDate = (newDate: Date) => form.setFieldValue("date", newDate);
  const setRepeat = (newRepeat: number) => form.setFieldValue("repeat", newRepeat);

  const { workout } = form.values;

  const summary = React.useMemo(() => {
    type ExerciseSummary = {
      [key: string]: number;
      total: number;
    };

    const summaries = workout.activities.reduce(
      (acc, curr) => {
        const { type } = curr;
        if (type === "strength") {
          const { targetSets, targetReps, targetWeight, mainMuscleGroup } =
            curr;
          const volume = targetSets * targetReps * targetWeight;
          return {
            ...acc,
            [mainMuscleGroup]: volume + (acc[mainMuscleGroup] || 0),
            total: volume + acc.total,
          };
        }
        return { ...acc };
      },
      { total: 0 } as ExerciseSummary
    );

    const { total } = summaries;
    return Object.entries(summaries)
      .filter(([key]) => key !== "total")
      .map(([key, value]) => {
        const percentage = Math.round((value / total) * 100);
        return `${titleCase(key)}: ${percentage}%`;
      })
      .join(", ");
  }, [workout]);

  const deleteActivity = (activityIndex: number) => () => {
    const newActivities = [...workout.activities];
    newActivities.splice(activityIndex, 1);
    form.setFieldValue("workout", { ...workout, activities: newActivities });
  };

  return (
    <Box>
      <FormLabel>Summary</FormLabel>
      <Card my={2} py={-1}>
        {summary !== "" && (
          <>
            <Text mt={2}>{summary}</Text>
            <Divider mt={2} />
          </>
        )}
        {workout.activities.length > 0 ? (
          workout.activities.map((currentActivity, i) => (
            <ActivityEntry
              key={currentActivity.id}
              activity={currentActivity}
              deleteActivity={deleteActivity(i)}
            />
          ))
        ) : (
          <Text py={4}>No exercises added yet</Text>
        )}
      </Card>

      <FormLabel>Workout date</FormLabel>
      <Card mb={4}>
        <DatePicker date={date} setDate={setDate} mode="date" />
      </Card>

      <Text fontSize={16} fontWeight="semibold" textAlign="left">
        Schedule this for {repeat} {repeat === 1 ? "week" : "weeks"}
      </Text>
      <Card mt={4} px={10}>
        <Slider
          value={repeat}
          onChange={setRepeat}
          maxValue={10}
          minValue={1}
          step={1}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Card>
    </Box>
  );
}
