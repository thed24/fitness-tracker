import React from "react";
import { useStore } from "store";
import { Screen, Avatar, FormLabel, Button } from "components";
import { Box, Select, useTheme, VStack } from "native-base";
import { RawEditUserRequest, useEditUser } from "api";
import { Badge, Image, Title } from "types";
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
    title: user?.title ?? null,
    badge: user?.badge ?? null,
  });

  if (!user) {
    return null;
  }

  const createSettingSection = (item: SettingSection) => (
    <UserSetting
      item={item}
      key={item.key}
      value={(Object.entries(userDetails)
        .filter(([key, value]) => key === item.key)?.[0][1] ?? "")
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
        badge={userDetails.badge ?? undefined}
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

          <Select 
            w="90%" 
            rounded={10} 
            variant="filled" 
            placeholder="Select a title"
            selectedValue={userDetails.title?.id.toString()}
            onValueChange={(val) => {
              setUserDetails((prev) => ({
                ...prev,
                title: user.inventory.find((item) => item.id.toString() === val) as Title | null,
              }));
            }}
          >
            <Select.Item label="None" value="null" />
            {user.inventory.map((item) => {
              if (item.rewardType === "title") {
                return (
                  <Select.Item
                    key={item.id}
                    label={item.name}
                    value={item.id.toString()}
                  />
                );
              }
              return null;
            })}
          </Select>

          <Select 
            w="90%" 
            rounded={10} 
            variant="filled" 
            placeholder="Select a badge"
            selectedValue={userDetails.badge?.id.toString()}
            onValueChange={(val) => {
              setUserDetails((prev) => ({
                ...prev,
                badge: user.inventory.find((item) => item.id.toString() === val) as Badge | null,
              }));
            }}
          >
            <Select.Item label="None" value="null" />
            {user.inventory.map((item) => {
              if (item.rewardType === "badge") {
                return (
                  <Select.Item
                    key={item.id}
                    label={item.name}
                    value={item.id.toString()}
                  />
                );
              }
              return null;
            })}
          </Select>
        </VStack>
      </Box>

      <Box w="95%" mt={2}>
        <FormLabel ml={2}>Settings</FormLabel>
        {settingsSections.data.map(createSettingSection)}
      </Box>

      <Button
        isLoading={isLoading}
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
