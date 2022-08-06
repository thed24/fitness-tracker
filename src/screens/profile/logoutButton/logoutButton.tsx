import React from "react";
import { Button, Text } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";

export function LogoutButton({ navigation }: NavigationProps) {
  const { setUser } = useStore();

  const onLogout = () => {
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <Button marginRight="2" bg="transparent" onPress={onLogout}>
      <Text fontSize="md" fontWeight="semibold">Logout</Text>
    </Button>
  );
}
