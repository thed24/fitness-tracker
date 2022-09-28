import React from "react";
import { useStore } from "store";
import { Button, Card, Screen } from "components";
import { Box, Text, Radio, SectionList, useTheme } from "native-base";
import { useEditSettings } from "api";
import { UserSettings } from "types";

export function Settings() {
  const { user } = useStore();
  const theme = useTheme();
  const { mutate, isLoading } = useEditSettings();
  const [userSettings, setUserSettings] = React.useState<Partial<UserSettings>>(
    user?.userSettings ?? {}
  );

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

  const strFromBool = (bool: boolean | undefined) => {
    if (bool === true) {
      return "true";
    }
    if (bool === false) {
      return "false";
    }
    return null;
  };

  return (
    <Screen>
      <SectionList
        mt={10}
        w="95%"
        sections={settingsSections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) =>
          createCard(
            <>
              <Text mb={2}>{item.title}</Text>
              <Radio.Group
                name={item.title}
                direction="row"
                space={4}
                defaultValue={Object.entries(user.userSettings)
                  .filter(([key, value]) => key === item.key)[0][1]
                  .toString()}
                onChange={(val) => {
                  setUserSettings((prev) => ({
                    ...prev,
                    [item.key]: val,
                  }));
                }}
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
      <Button
        isLoading={isLoading}
        mb="1/4"
        onPress={() =>
          mutate({
              userId: user.id,
              userSettings: {
                darkMode: strFromBool(userSettings?.darkMode),
                measurementUnit: userSettings?.measurementUnit ?? null,
                weightUnit: userSettings?.weightUnit ?? null,
              },
            })
        }
      >
        Save
      </Button>
    </Screen>
  );
}
