import { Input, VStack } from "native-base";
import React from "react";
import { RegisterProps } from "../register";

export function BuddyForm({ form }: RegisterProps) {
  return (
    <VStack space={4} alignItems="center" marginTop="10">
      <Input
        onChangeText={form.handleChange("name")}
        onBlur={form.handleBlur("name")}
        value={form.values.name}
        placeholder="Name"
      />
      <Input
        onChangeText={form.handleChange("description")}
        onBlur={form.handleBlur("description")}
        value={form.values.description}
        placeholder="Description"
      />
      <Input
        onChangeText={form.handleChange("iconUrl")}
        onBlur={form.handleBlur("iconUrl")}
        value={form.values.iconUrl}
        placeholder="Icon URL"
      />
    </VStack>
  );
}
