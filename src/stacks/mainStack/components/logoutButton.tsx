import React from "react";
import { Text } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";
import { Button } from "components";

export function LogoutButton({ navigation }: NavigationProps) {
  const { setUser } = useStore();

  const onLogout = () => {
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <Button variant="link" onPress={onLogout}>
      <Text fontSize="md" fontWeight="bold">Logout</Text>
    </Button>
  );
}
