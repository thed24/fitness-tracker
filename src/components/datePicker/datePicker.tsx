import React from "react";
import DatePickerBase from "react-native-date-picker";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  mode: "date" | "time" | "datetime";
}

export function DatePicker({ mode, date, setDate }: Props) {
  const minDate = new Date();

  const handleDateChange = (newDate: Date) => {
    newDate.setHours(0, 0, 0, 0);
    setDate(newDate);
  };

  return (
    <DatePickerBase
      style={{ alignSelf: "center" }}
      androidVariant="nativeAndroid"
      date={date}
      onDateChange={handleDateChange}
      mode={mode}
      minimumDate={minDate}
    />
  );
}
