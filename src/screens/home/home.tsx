import React, { useEffect } from "react";
import { Text, Heading, Pressable, useTheme, Image } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";
import { Screen } from "components";
import { Login } from "./components/login";

export function HomeScreen({ navigation }: NavigationProps) {
  const { user } = useStore();
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
    }
  }, [user]);

  return (
    <Screen>
      <Heading mt={10}> Welcome to Pocket Coach! </Heading>
      <Text> Sign in or register below to get started! </Text>
      <Image w="3/4" h="2/5" source={require("../../../assets/images/otherlogo.png")} style={{ backgroundColor: 'transparent' }} />
      <Login />
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text>
          Don&apos;t have an account?
          <Text fontWeight="bold" color={theme.colors.primary[800]}>
            {" "}
            Register here!
          </Text>
        </Text>
      </Pressable>
    </Screen>
  );
}
