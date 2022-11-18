import { useEditWorkout, useGetUser } from "api";
import { HStack, Modal, TextArea, useTheme, VStack, Text } from "native-base";
import React, { useState } from "react";
import { StrengthActivity, Workout } from "types";
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "../../button/button";
import { Input } from "../../input/input";
import { ImagePicker } from "../../imagePicker/imagePicker";

interface Props {
  activity: StrengthActivity;
  workout: Workout;
  onClose: () => void;
  isOpen: boolean;
}

export function StrengthModal({ workout, activity, onClose, isOpen }: Props) {
  const { data: user } = useGetUser();
  const theme = useTheme();

  const [sets, setSets] = useState(activity.sets);
  const [reps, setReps] = useState(activity.reps);
  const [weight, setWeight] = useState(activity.weight);
  const [notes, setNotes] = useState(activity.notes);
  const [image, setImage] = useState(activity.image);

  const { mutate: editWorkout, isLoading } = useEditWorkout();

  const handleChange = (callback: (value: number) => void) => (value: string) => {
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
              rightElement={<Button variant="link" onPress={() => setSets(activity.targetSets)}>Fill</Button>}
              type="text"
              value={sets ?? undefined}
              onChangeText={handleChange(setSets)}
            />
            <Input
              placeholder={`Reps / ${activity.targetReps}`}
              rightElement={<Button variant="link" onPress={() => setReps(activity.targetReps)}>Fill</Button>}
              type="text"
              value={reps ?? undefined}
              onChangeText={handleChange(setReps)}
            />
            <Input
              placeholder={`Weight / ${activity.targetWeight}`}
              rightElement={<Button variant="link" onPress={() => setWeight(activity.targetWeight)}>Fill</Button>}
              type="text"
              value={weight ?? undefined}
              onChangeText={handleChange(setWeight)}
            />
            <TextArea
              placeholder="Notes"
              type="text"
              value={notes ?? undefined}
              autoCompleteType="off"
              onChangeText={(value) => setNotes(value)}
            />
            <HStack>
              <Text my="auto"> {image ? 'Image added' : 'No image added'} </Text>
              <ImagePicker ml="auto" callbacks={[ setImage ]}>
                <Icon
                  name="camera"
                  size={30}
                  color={theme.colors.primary[500]}
                />
              </ImagePicker>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button variant="secondary" onPress={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              onPress={() => {
                editWorkout({
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
                          notes,
                          image,
                        };
                      }
                      return a;
                    }),
                  },
                });
                onClose();
              }}
            >
              Save
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
