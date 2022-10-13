import { useEditWorkout } from "api";
import { HStack, Modal, VStack, Text } from "native-base";
import React from "react";
import { useStore } from "store";
import { CardioData, CardioExercise, Workout } from "types";
import { Button } from "../../button/button";
import { Input } from "../../input/input";

interface Props {
  activity: CardioExercise & CardioData;
  workout: Workout;
  onClose: () => void;
  isOpen: boolean;
}

export function CardioModal({ workout, activity, onClose, isOpen }: Props) {
  const { user } = useStore();
  const [distance, setDistance] = React.useState(activity.distance);
  const [duration, setDuration] = React.useState(activity.duration);

  const { mutate: editWorkout } = useEditWorkout();

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
              placeholder="Distance"
              rightElement={<Button size="sm" onPress={() => setDistance(activity.targetDistance)}>Fill</Button>}
              type="text"
              value={distance ?? undefined}
              onChangeText={handleChange(setDistance)}
            />
            <Input
              placeholder="Duration"
              rightElement={<Button size="sm" onPress={() => setDuration(activity.targetDuration)}>Fill</Button>}
              type="text"
              value={duration ?? undefined}
              onChangeText={handleChange(setDuration)}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Modal.CloseButton>
              <Text>Cancel</Text>
            </Modal.CloseButton>
            <Modal.CloseButton
              onPress={() => {
                editWorkout({
                  userId: user!.id,
                  workout: {
                    ...workout,
                    activities: workout.activities.map((a) => {
                      if (a.id === activity.id) {
                        return {
                          ...a,
                          distance,
                          duration,
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
            </Modal.CloseButton>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
