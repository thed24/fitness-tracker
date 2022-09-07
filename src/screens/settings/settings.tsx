import React from "react";
import { useStore } from "store";
import { Card, Screen } from "components";
import { Box, Heading, Pressable, SectionList, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function Settings() {
  const { user, setUser } = useStore();
  const navigation = useNavigation();
  const theme = useTheme();

  const sections = [
    {
      title: "Account",
      data: [
        {
          title: "Logout",
          onPress: () => {
            setUser(null);
            navigation.reset({ index: 0, routes: [{ name: "Home" as never }] });
          },
        },
        {
          title: "Change Password",
          onPress: () => {},
        },
        {
          title: "Delete Account",
          onPress: () => {},
        },
      ],
    },
    {
      title: "Settings",
      data: [
        {
          title: "Dark Mode",
          onPress: () => {},
        },
        {
          title: "Notifications",
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <Screen>
      <Heading marginTop="10"> Settings </Heading>
      <SectionList
        w="80%"
        sections={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Pressable onPress={item.onPress} _pressed={{ opacity: 0.5 }}>
            <Card
              shadow="0"
              _text={{ fontSize: "md" }}
              my={2}
              px={2}
            >
              {item.title}
            </Card>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Box
            w="100%"
            background={theme.colors.gray[100]}
            _text={{ fontSize: "md", fontWeight: "bold" }}
            bg={theme.colors.gray[100]}
            px={1}
            py={2}
          >
            {title}
          </Box>
        )}
      />
    </Screen>
  );
}
