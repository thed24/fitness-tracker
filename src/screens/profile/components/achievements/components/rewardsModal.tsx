import { Button } from 'components';
import { Modal, Text } from 'native-base';
import React from 'react';
import { Reward } from 'types';
import { titleCase } from 'utils';

interface Props {
  rewards: Reward[];
  onClose: () => void;
}

export function RewardsModal({ rewards, onClose }: Props) {
  return (
    <Modal isOpen={rewards.length > 0} onClose={onClose} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Rewards Unlocked!</Modal.Header>
        <Modal.Body>
          {rewards.map((reward) => {
            if (reward.rewardType === 'experience') {
              return (
                <Text key={`${reward.id}`} fontSize="sm">
                  <>
                    {reward.amount} {reward.strengthLevel} XP
                  </>
                </Text>
              );
            }

            if (reward.rewardType === 'title') {
              return (
                <Text key={`${reward.id}`} fontSize="sm">
                  <> Title unlocked! &quot;{titleCase(reward.name)}&quot; </>
                </Text>
              );
            }

            return (
              <Text key={`${reward.id}`} fontSize="sm" color="gray.500">
                Unkown Reward
              </Text>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
