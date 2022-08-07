import React, { useEffect } from "react";
import { Text, Heading, Divider } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";
import { Screen, Button } from "components";

export function HomeScreen({ navigation }: NavigationProps) {
  const { user } = useStore();

  useEffect(() => {
    if (user) {
      navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
    }
  }, [user]);

  return (
    <Screen>
      <Heading marginTop="10">Welcome to Fitness Tracker!</Heading>
      <Text> Please register below to get started </Text>
      <Divider my="5" w="4/6" thickness="2" />
      <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      <Button onPress={() => navigation.navigate("Register")}>Register</Button>
    </Screen>
  );
}
