import { DatePicker, Card, FormLabel } from "components";
import { Box, Slider, Text } from "native-base";
import React from "react";
import { CreateWorkoutProps } from "../createWorkout";

export function ActivityDetails({ form }: CreateWorkoutProps) {
  const { date, repeat } = form.values;
  const setDate = (newDate: Date) => form.setFieldValue("date", newDate);
  const setRepeat = (newRepeat: number) =>
    form.setFieldValue("repeat", newRepeat);

  return (
    <Box w="90%">
      <FormLabel>Workout date</FormLabel>
      <Card mb={4}>
        <DatePicker date={date} setDate={setDate} mode="date" />
      </Card>

      <Text fontSize={16} fontWeight="semibold" textAlign="left">
        Schedule this for {repeat} {repeat === 1 ? "week" : "weeks"}
      </Text>

      <Card mt={4} px={10}>
        <Slider value={repeat} onChange={setRepeat} maxValue={10} minValue={1} step={1}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Card>
    </Box>
  );
}
