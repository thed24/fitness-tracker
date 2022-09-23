import { Button } from "components";
import { Box, CheckIcon, IconButton, Popover, Select } from "native-base";
import React, { useCallback } from "react";
import Icon from "react-native-vector-icons/Ionicons";
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
  const [isOpen, setIsOpen] = React.useState(false);

  const popOverChild = useCallback(
    (props: any) => (
      <IconButton
        {...props}
        key="filter-button"
        mt={-1}
        ml={1}
        onPress={() => setIsOpen(true)}
        _focus={{
          borderWidth: 0,
        }}
        icon={<Icon name="ios-funnel" size={15} />}
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
    <Box>
      <Popover
        isOpen={isOpen}
        offset={15}
        placement="bottom"
        trigger={popOverChild}
      >
        <Popover.Content w="56">
          <Popover.Arrow />
          <Popover.CloseButton onPress={() => setIsOpen(false)} />
          <Popover.Header>Exercise Filters</Popover.Header>
          <Popover.Body>
            {createSelect("muscleGroup", Object.values(MuscleGroups))}
            {createSelect("equipment", Object.values(Equipments))}
            {createSelect("type", Object.values(ExerciseTypes))}
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button
              onPress={() => {
                setFilters(localFilters);
                setIsOpen(false);
              }}
              size="md"
            >
              Save
            </Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}
