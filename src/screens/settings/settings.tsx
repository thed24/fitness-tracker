import React from "react";
import { useStore } from "store";
import { Card, Screen } from "components";
import {
  Box,
  Text,
  Pressable,
  Radio,
  SectionList,
  useTheme,
} from "native-base";
import { useEditSettings } from "api";

export function Settings() {
  const { user } = useStore();
  const theme = useTheme();

  const { mutate } = useEditSettings();

  const sections = [
    {
      title: "Account",
      data: [
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
      w="95%"
      marginLeft="auto"
      marginRight="auto"
      _text={{ fontSize: "md" }}
      my={2}
      px={2}
    >
      {children}
    </Card>
  );

  return (
    <Screen>
      <SectionList
        w="95%"
        marginTop="10"
        marginBottom={-20}
        sections={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Pressable onPress={item.onPress} _pressed={{ opacity: 0.5 }}>
            {createCard(<Text>{item.title}</Text>)}
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Box
            ml={2}
            w="100%"
            background={theme.colors.gray[100]}
            _text={{ fontSize: "md", fontWeight: "bold" }}
          >
            {title}
          </Box>
        )}
      />

      <SectionList
        w="95%"
        sections={settingsSections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) =>
          createCard(
            <>
              <Text mb={2}>
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
                    <Text>{option.title}</Text>
                  </Radio>
                ))}
              </Radio.Group>
            </>
          )
        }
        renderSectionHeader={({ section: { title } }) => (
          <Box
            w="100%"
            ml={2}
            background={theme.colors.gray[100]}
            _text={{ fontSize: "md", fontWeight: "bold" }}
          >
            {title}
          </Box>
        )}
      />
    </Screen>
  );
}
