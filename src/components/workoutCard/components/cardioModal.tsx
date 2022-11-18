import { useEditWorkout, useGetUser } from 'api';
import { HStack, Modal, TextArea, VStack, Text, useTheme } from 'native-base';
import React, { useState } from 'react';
import { CardioActivity, Workout } from 'types';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImagePicker } from '../../imagePicker/imagePicker';
import { Input } from '../../input/input';
import { Button } from '../../button/button';

interface Props {
  activity: CardioActivity;
  workout: Workout;
  onClose: () => void;
  isOpen: boolean;
}

export function CardioModal({ workout, activity, onClose, isOpen }: Props) {
  const { data: user } = useGetUser();
  const theme = useTheme();

  const [distance, setDistance] = useState(activity.distance);
  const [duration, setDuration] = useState(activity.duration);
  const [notes, setNotes] = useState(activity.notes);
  const [image, setImage] = useState(activity.image);

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
              rightElement={
                <Button
                  variant="link"
                  onPress={() => setDistance(activity.targetDistance)}
                >
                  Fill
                </Button>
              }
              type="text"
              value={distance ?? undefined}
              onChangeText={handleChange(setDistance)}
            />
            <Input
              placeholder="Duration"
              rightElement={
                <Button
                  variant="link"
                  onPress={() => setDuration(activity.targetDuration)}
                >
                  Fill
                </Button>
              }
              type="text"
              value={duration ?? undefined}
              onChangeText={handleChange(setDuration)}
            />
            <TextArea
              placeholder="Notes"
              type="text"
              value={notes ?? undefined}
              autoCompleteType="off"
              onChangeText={(value) => setNotes(value)}
            />
            <HStack>
              <Text my="auto">
                {image ? 'Image added' : 'No image added'}
              </Text>
              <ImagePicker ml="auto" callbacks={[setImage]}>
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
