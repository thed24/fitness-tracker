import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

export function DatePicker({ date, setDate }: Props) {
  const onChange = (event: DateTimePickerEvent, newDate?: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <RNDateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      is24Hour
      onChange={onChange}
    />
  )
}
