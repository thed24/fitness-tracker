import React from "react";
import { useStore } from "store";
import { Button } from "components";
import { useNavigation } from "@react-navigation/native";

export function LogoutButton() {
  const { setUser } = useStore();
  const navigation = useNavigation();

  const onLogout = () => {
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: "Home" as never }] });
  };

  return (
    <Button onPress={onLogout}>
      Logout
    </Button>
  );
}
