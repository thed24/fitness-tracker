import { DatePicker, Card } from "components";
import { Box, Slider, Text } from "native-base";
import React from "react";
import { CreateWorkoutProps } from "../createWorkout";

export function ActivityDetails({ form }: CreateWorkoutProps) {
  const { date, repeat } = form.values;
  const setDate = (newDate: Date) => form.setFieldValue("date", newDate);
  const setRepeat = (newRepeat: number) =>
    form.setFieldValue("repeat", newRepeat);

  return (
    <Box>
      <Text fontSize={16} fontWeight="semibold" textAlign="left">
        Workout Date
      </Text>

      <Card marginTop={4} marginBottom={4}>
        <DatePicker date={date} setDate={setDate} mode="date" />
      </Card>

      <Text fontSize={16} fontWeight="semibold" textAlign="left">
        Repeat for {repeat} additional weeks
      </Text>

      <Card marginTop={4} paddingLeft={10} paddingRight={10}>
        <Slider value={repeat} onChange={setRepeat} maxValue={10} minValue={-1} step={1}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Card>
    </Box>
  );
}
