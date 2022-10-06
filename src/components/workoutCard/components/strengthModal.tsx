import { useEditWorkout } from "api";
import { HStack, Modal, VStack, Text } from "native-base";
import React from "react";
import { useStore } from "store";
import { StrengthData, StrengthExercise, Workout } from "types";
import { Button } from "../../button/button";
import { Input } from "../../input/input";

interface Props {
  activity: StrengthExercise & StrengthData;
  workout: Workout;
  onClose: () => void;
  isOpen: boolean;
}

export function StrengthModal({ workout, activity, onClose, isOpen }: Props) {
  const { user } = useStore();
  const [sets, setSets] = React.useState(activity.sets);
  const [reps, setReps] = React.useState(activity.reps);
  const [weight, setWeight] = React.useState(activity.weight);

  const { mutateAsync: editWorkout, isLoading } = useEditWorkout();

  const handleChange =
    (callback: (value: number) => void) => (value: string) => {
      const parsedValue = parseInt(value, 10);
      if (Number.isNaN(parsedValue)) {
        return;
      }
      callback(parsedValue);
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Update exercise</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            <Input
              placeholder={`Sets / ${activity.targetSets}`}
              type="text"
              value={sets ?? undefined}
              onChangeText={handleChange(setSets)}
            />
            <Input
              placeholder={`Reps / ${activity.targetReps}`}
              type="text"
              value={reps ?? undefined}
              onChangeText={handleChange(setReps)}
            />
            <Input
              placeholder={`Weight / ${activity.targetWeight}`}
              type="text"
              value={weight ?? undefined}
              onChangeText={handleChange(setWeight)}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button>
              <Text>Cancel</Text>
            </Button>
            <Button
              loading={isLoading}
              onPress={async () => {
                await editWorkout({
                  userId: user!.id,
                  workout: {
                    ...workout,
                    activities: workout.activities.map((a) => {
                      if (a.id === activity.id) {
                        return {
                          ...a,
                          sets,
                          reps,
                          weight,
                        };
                      }
                      return a;
                    }),
                  },
                });
                onClose();
              }}
            >
              <Text>Save</Text>
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
