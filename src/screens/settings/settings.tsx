import React from "react";
import { useStore } from "store";
import { Button, Card, Input, Screen, Avatar, FormLabel } from "components";
import { Box, Text, Radio, SectionList, useTheme, VStack, Divider } from "native-base";
import { useEditSettings } from "api";
import { UserSettings } from "types";
import Icon from "react-native-vector-icons/Ionicons";
import { SettingSection, settingsSections } from "./settingsSections";

export function Settings() {
  const { user } = useStore();
  const theme = useTheme();
  const { mutate, isLoading } = useEditSettings();
  const [userSettings, setUserSettings] = React.useState<UserSettings>(
    user?.userSettings ?? {
      darkMode: true,
      weightUnit: "kilograms",
      measurementUnit: "metric",
    }
  );

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

  const createSettingSection = (item: SettingSection) => (
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
  );

  return (
    <Screen scrollable>
      <Avatar my={8} size="2xl" />

      <VStack mt={2} space={4} alignItems="center">
        <FormLabel fontWeight="bold" mr="auto">
          Username
        </FormLabel>
        <Input
          w="90%"
          onChangeText={() => null}
          placeholder="Username"
          value={user.username}
          type="text"
          mt={-4}
          leftElement={
            <>
              <Icon
                name="person"
                size={24}
                color={theme.colors.gray[400]}
                style={{ marginLeft: 10 }}
              />
              <Divider orientation="vertical" ml={2} h="3/4" />
            </>
          }
        />
        <FormLabel fontWeight="bold" mr="auto">
          Email
        </FormLabel>
        <Input
          w="90%"
          onChangeText={() => null}
          placeholder="Email"
          value={user.email}
          type="text"
          mt={-4}
          leftElement={
            <>
              <Icon
                name="mail"
                size={24}
                color={theme.colors.gray[400]}
                style={{ marginLeft: 10 }}
              />
              <Divider orientation="vertical" ml={2} h="3/4" />
            </>
          }
        />
      </VStack>

      <SectionList
        mt={10}
        w="95%"
        h="100%"
        sections={settingsSections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => createCard(createSettingSection(item))}
        renderSectionHeader={({ section: { title } }) => (
          <Box
            w="100%"
            ml={2}
            background={theme.colors.gray[300]}
            _text={{ fontSize: "md", fontWeight: "bold" }}
          >
            {title}
          </Box>
        )}
      />
      <Button
        isLoading={isLoading}
        mb="1/4"
        mt={4}
        onPress={() =>
          mutate({
            userId: user.id,
            userSettings: {
              darkMode: userSettings.darkMode.toString() as "true" | "false",
              measurementUnit: userSettings.measurementUnit,
              weightUnit: userSettings.weightUnit,
            },
          })
        }
      >
        Save
      </Button>
    </Screen>
  );
}
