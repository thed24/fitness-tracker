import React from "react";
import { useStore } from "store";
import { Card, Screen } from "components";
import {
  Box,
  Text,
  Heading,
  Pressable,
  Radio,
  SectionList,
  useTheme,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useEditSettings } from "api";

export function Settings() {
  const { user, setUser } = useStore();
  const navigation = useNavigation();
  const theme = useTheme();

  const { mutate } = useEditSettings();

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
          onPress: () => null,
        },
        {
          title: "Delete Account",
          onPress: () => null,
        },
      ],
    },
  ];

  const settingsSections = [
    {
      title: "Settings",
      data: [
        {
          title: "Dark Mode",
          key: "darkMode",
          options: [
            {
              title: "On",
              value: "true",
            },
            {
              title: "Off",
              value: "false",
            },
          ],
        },
        {
          title: "Weight Unit",
          key: "weightUnit",
          options: [
            {
              title: "Pounds",
              value: "pounds",
            },
            {
              title: "Kilograms",
              value: "kilograms",
            },
          ],
        },
        {
          title: "Measurement Unit",
          key: "measurementUnit",
          options: [
            {
              title: "Metric",
              value: "metric",
            },
            {
              title: "Imperial",
              value: "imperial",
            },
          ],
        },
      ],
    },
  ];

  if (!user) {
    return null;
  }

  const createCard = (children: React.ReactNode) => (
    <Card
      shadow="0"
      _text={{ fontSize: "md" }}
      my={2}
      px={2}
    >
      {children}
    </Card>
  );

  return (
    <Screen>
      <Heading marginTop="10"> Settings </Heading>

      <SectionList
        w="80%"
        sections={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Pressable onPress={item.onPress} _pressed={{ opacity: 0.5 }}>
            {createCard(<Text>{item.title}</Text>)}
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

      <SectionList
        w="80%"
        sections={settingsSections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) =>
          createCard(
            <>
              <Text mb={2} fontWeight="bold">
                {item.title}
              </Text>
              <Radio.Group
                name={item.title}
                direction="row"
                space={4}
                defaultValue={Object.entries(user.userSettings)
                  .filter(([key, value]) => key === item.key)[0][1]
                  .toString()}
                onChange={(val) =>
                  mutate({
                    userId: user!.id,
                    userSettings: {
                      weightUnit: null,
                      measurementUnit: null,
                      darkMode: null,
                      [item.key]: val,
                    },
                  })
                }
              >
                {item.options.map((option) => (
                  <Radio value={option.value} key={option.title}>
                    {option.title}
                  </Radio>
                ))}
              </Radio.Group>
            </>
          )
        }
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
