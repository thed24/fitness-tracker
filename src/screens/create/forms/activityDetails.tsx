import { DatePicker } from "components";
import { FormControl, Slider } from "native-base";
import React from "react";
import { CreateWorkoutProps } from "../createWorkout";

export function ActivityDetails({ form }: CreateWorkoutProps) {
  const { date, repeat } = form.values;
  const setDate = (newDate: Date) => form.setFieldValue("date", newDate);
  const setRepeat = (newRepeat: number) => form.setFieldValue("repeat", newRepeat);

  return (
    <>
      <FormControl.Label>Workout Date</FormControl.Label>
      <DatePicker date={date} setDate={setDate} mode="date" />

      <FormControl.Label>Repeat for {repeat} weeks</FormControl.Label>
      <Slider
        w="80%"
        value={repeat}
        onChange={setRepeat}
        maxValue={10}
        step={1}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </>
  );
}
