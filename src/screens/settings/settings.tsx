import React from "react";
import { useStore } from "store";
import { Button, Screen, Avatar, FormLabel } from "components";
import { Box, useTheme, VStack } from "native-base";
import { RawEditUserRequest, useEditUser } from "api";
import { Image } from "types";
import { SettingSection, settingsSections } from "./settingsSections";
import { UserSetting } from "./components/userSetting";
import { UserField } from "./components/userField";

export function Settings() {
  const { user } = useStore();
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
    avatar: user?.avatar ?? null,
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
      <Avatar
        size="sm"
        callback={(image: Image) => {
          setUserDetails((prev) => ({
            ...prev,
            avatar: image,
          }));
        }}
      />

      <Box>
        <FormLabel>
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

      <Box w="95%" mt={2}>
        <FormLabel ml={2}>Settings</FormLabel>
        {settingsSections.data.map((item: SettingSection) => createSettingSection(item))}
      </Box>

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
