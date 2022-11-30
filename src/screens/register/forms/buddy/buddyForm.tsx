import { FormInput, FormLabel } from 'components';
import { HStack, View } from 'native-base';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { RegisterProps } from '../../register';
import * as SC from '../../register.styles';

export function BuddyForm({ form }: RegisterProps) {
  return (
    <SC.Container>
      <FormInput
        onChangeText={form.handleChange('buddyName')}
        onBlur={form.handleBlur('buddyName')}
        value={form.values.buddyName}
        required
        error={
          form.errors.buddyName && form.touched.buddyName
            ? form.errors.buddyName
            : undefined
        }
        name="Buddy Name"
      />

      <View mr="auto">
        <FormLabel>Measurement Unit</FormLabel>
        <RadioButton.Group
          value={form.values.measurementUnit}
          onValueChange={(value) =>
            form.setFieldValue('measurementUnit', value)
          }
        >
          {['Metric', 'Imperial'].map((unit) => (
            <HStack key={unit} alignItems="center">
              <RadioButton key={unit} value={unit.toLowerCase()} />
              <FormLabel>{unit}</FormLabel>
            </HStack>
          ))}
        </RadioButton.Group>
      </View>

      <View mr="auto">
        <FormLabel>Height</FormLabel>
        <RadioButton.Group
          value={form.values.weightUnit}
          onValueChange={(value) => form.setFieldValue('weightUnit', value)}
        >
          {['Kilograms', 'Imperial'].map((unit) => (
            <HStack key={unit} alignItems="center">
              <RadioButton key={unit} value={unit.toLowerCase()} />
              <FormLabel>{unit}</FormLabel>
            </HStack>
          ))}
        </RadioButton.Group>
      </View>
    </SC.Container>
  );
}
