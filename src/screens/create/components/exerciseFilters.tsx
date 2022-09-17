/* eslint-disable react/jsx-props-no-spreading */
import { Button } from "components";
import {
  Box,
  CheckIcon,
  IconButton,
  Popover,
  Select,
  ThreeDotsIcon,
} from "native-base";
import React, { useCallback } from "react";
import { Equipments, MuscleGroups, ExerciseTypes } from "types";

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
  const [localFilters, setLocalFilters] = React.useState<Filters>(filters);

  const popOverChild = useCallback(
    (props: any) => (
      <IconButton
        {...props}
        key="filter-button"
        variant="unstyled"
        marginLeft={-1}
        _focus={{
          borderWidth: 0,
        }}
        icon={<ThreeDotsIcon key="filter-icon" size="3" color="coolGray.600" />}
      />
    ),
    [filters, setFilters]
  );

  const createOptions = (key: keyof Filters, options: string[]) => [
    <Select.Item
      label="Clear"
      key={`${key}-clear`}
      value=""
      onPress={() => setLocalFilters({ ...localFilters, [key]: undefined })}
    />,
    ...options.map((option) => (
      <Select.Item
        label={option}
        value={option}
        key={`${key}-${option}`}
        onPress={() => setLocalFilters({ ...localFilters, [key]: option })}
      />
    )),
  ];

  const createPlaceholder = (key: keyof Filters) => {
    switch (key) {
      case "muscleGroup":
        return "Select a muscle group";
      case "equipment":
        return "Select an equipment";
      case "type":
        return "Select an exercise type";
      default:
        return "";
    }
  };

  const createSelect = (key: keyof Filters, options: string[]) => (
    <Select
      key={`${key}-select`}
      selectedValue={localFilters[key]}
      minWidth={200}
      placeholder={createPlaceholder(key)}
      marginBottom={2}
      onValueChange={(itemValue) =>
        setLocalFilters({ ...localFilters, [key]: itemValue })
      }
      _selectedItem={{
        bg: "blue.600",
        endIcon: <CheckIcon key={`${key}-suffix`} size={4} />,
      }}
    >
      {createOptions(key, options)}
    </Select>
  );

  return (
    <Box alignItems="center">
      <Popover offset={15} placement="bottom" trigger={popOverChild}>
        <Popover.Content w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Exercise Filters</Popover.Header>
          <Popover.Body>
            {createSelect("muscleGroup", Object.values(MuscleGroups))}
            {createSelect("equipment", Object.values(Equipments))}
            {createSelect("type", Object.values(ExerciseTypes))}
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button onPress={() => setFilters(localFilters)} size="md">
              Save
            </Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}
