import React from "react";
import DatePickerBase from "react-native-date-picker";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  mode: "date" | "time" | "datetime";
}

export function DatePicker({ mode, date, setDate }: Props) {
  const minDate = new Date();

  return (
    <DatePickerBase
      style={{ alignSelf: "center" }}
      androidVariant="nativeAndroid"
      date={date}
      onDateChange={setDate}
      mode={mode}
      minimumDate={minDate}
    />
  );
}
