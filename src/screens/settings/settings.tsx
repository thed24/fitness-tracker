import React from "react";
import { useStore } from "store";
import { Button, Screen, Avatar, FormLabel } from "components";
import { Box, SectionList, useTheme, VStack } from "native-base";
import { RawEditUserRequest, useEditUser } from "api";
import { SettingSection, settingsSections } from "./settingsSections";
import { UserSetting } from "./components/userSetting";
import { UserField } from "./components/userField";

export function Settings() {
  const { user, getWeightFormatter, getWeasurementFormatter } = useStore();
  const theme = useTheme();

  const { mutate, isLoading } = useEditUser();
  const [userDetails, setUserDetails] = React.useState<RawEditUserRequest>({
    userId: user?.id ?? 0,
    username: user?.username ?? "",
    email: user?.email ?? "",
    weightUnit: user?.userSettings.weightUnit ?? "pounds",
    measurementUnit: user?.userSettings.measurementUnit ?? "metric",
    darkMode: user?.userSettings.darkMode ? "true" : "false",
    weeklyWorkountAmountGoal: user?.weeklyWorkoutAmountGoal ?? 0,
    height: user?.height ?? 0,
    weight: user?.weight ?? 0,
    age: user?.age ?? 0,
  });

  if (!user) {
    return null;
  }

  const createSettingSection = (item: SettingSection) => (
    <UserSetting
      item={item}
      value={Object.entries(user.userSettings)
        .filter(([key, value]) => key === item.key)[0][1]
        .toString()}
      onChange={(val) => {
        setUserDetails((prev) => ({
          ...prev,
          [item.key]: val,
        }));
      }}
    />
  );

  return (
    <Screen scrollable>
      <Avatar my={4} size="2xl" />

      <Box>
        <FormLabel fontWeight="bold" mr="auto">
          Profile
        </FormLabel>

        <VStack w="100%" space={2} alignItems="center">
          <UserField
            value={userDetails.username}
            placeholder="Username"
            onChange={(text) =>
              setUserDetails((prev) => ({
                ...prev,
                username: text,
              }))
            }
            icon="account"
          />

          <UserField
            placeholder="Email"
            value={userDetails.email}
            onChange={(text) =>
              setUserDetails((prev) => ({
                ...prev,
                email: text,
              }))
            }
            icon="email"
          />

          <UserField
            placeholder="Height"
            value={userDetails.height}
            suffix={userDetails.measurementUnit === "metric" ? "cm" : "in"}
            onChange={(text) =>
              setUserDetails((prev) => ({
                ...prev,
                height: parseInt(text, 10),
              }))
            }
            icon="ruler"
          />

          <UserField
            placeholder="Weight"
            value={userDetails.weight}
            suffix={userDetails.weightUnit === "pounds" ? "lbs" : "kg"}
            onChange={(text) =>
              setUserDetails((prev) => ({
                ...prev,
                weight: parseInt(text, 10),
              }))
            }
            icon="scale"
          />

          <UserField
            placeholder="Age"
            value={userDetails.age}
            onChange={(text) =>
              setUserDetails((prev) => ({
                ...prev,
                age: parseInt(text, 10),
              }))
            }
            icon="cake"
          />
        </VStack>
      </Box>

      <SectionList
        mt={4}
        w="95%"
        h="100%"
        nestedScrollEnabled
        sections={settingsSections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => createSettingSection(item)}
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
            ...userDetails,
            userId: user.id,
          })
        }
      >
        Save
      </Button>
    </Screen>
  );
}
