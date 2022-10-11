import { CheckIcon, HStack, Select, useTheme } from "native-base";
import React from "react";
import { Equipments, MuscleGroups, ExerciseTypes } from "types";
import { titleCase } from "utils";

export interface Filters {
  muscleGroup: string | undefined;
  equipment: string | undefined;
  type: string | undefined;
}

interface Props {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export function ExerciseFilters({ filters, setFilters }: Props) {
  const theme = useTheme();

  const createOptions = (key: keyof Filters, options: string[]) => [
    <Select.Item
      label="Clear"
      key={`${key}-clear`}
      value=""
      onPress={() => setFilters({ ...filters, [key]: undefined })}
    />,
    ...options.map((option) => (
      <Select.Item
        label={titleCase(option)}
        value={option}
        key={`${key}-${option}`}
        onPress={() => setFilters({ ...filters, [key]: option })}
      />
    )),
  ];

  const createPlaceholder = (key: keyof Filters) => {
    switch (key) {
      case "muscleGroup":
        return "Musclegroup";
      case "equipment":
        return "Equipment";
      case "type":
        return "Exercise type";
      default:
        return "";
    }
  };

  const createSelect = (key: keyof Filters, options: string[]) => (
    <Select
      key={`${key}-select`}
      minW="1/3"
      p={-2}
      mb={2}
      borderWidth={0}
      textAlign="center"
      selectedValue={filters[key]}
      placeholder={createPlaceholder(key)}
      onValueChange={(itemValue) =>
        setFilters({ ...filters, [key]: itemValue })
      }
      _selectedItem={{
        bg: theme.colors.primary[500],
        endIcon: <CheckIcon key={`${key}-suffix`} size={4} />,
      }}
    >
      {createOptions(key, options)}
    </Select>
  );

  return (
    <HStack>
      {createSelect("muscleGroup", Object.values(MuscleGroups))}
      {createSelect("equipment", Object.values(Equipments))}
      {createSelect("type", Object.values(ExerciseTypes))}
    </HStack>
  );
}
