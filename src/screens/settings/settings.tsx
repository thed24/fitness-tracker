import React, { useEffect, useMemo, useState } from "react";
import { Screen, Avatar, FormLabel, Button } from "components";
import { Box, Select, useColorModeValue, useTheme, VStack } from "native-base";
import { RawEditUserRequest, useEditUser, useGetUser } from "api";
import { Badge, Image, Title } from "types";
import { SettingSection, settingsSections } from "./settingsSections";
import { UserSetting } from "./components/userSetting";
import { UserField } from "./components/userField";

function SettingsInternal() {
  const { data: user } = useGetUser();
  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.white, theme.colors.gray[900]);

  const initialState = useMemo(() => ({
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
  } as RawEditUserRequest), [user]);

  const { mutateAsync, isLoading } = useEditUser();
  const [userDetails, setUserDetails] = useState<RawEditUserRequest>(initialState);

  useEffect(() => {
    setUserDetails(initialState);
  }, [initialState]);

  if (!user || !userDetails) {
    return null;
  }

  const createSettingSection = (item: SettingSection) => (
    <UserSetting
      item={item}
      key={item.key}
      value={(Object.entries(userDetails)
        .filter(([key, value]) => key === item.key)?.[0][1] ?? "")
        .toString()}
      onChange={async (val) => {
        await mutateAsync({...userDetails, [item.key]: val});
      }}
    />
  );

  return (
    <Screen scrollable>
      <Avatar
        user={user}
        size="sm"
        editable
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
            backgroundColor={bg}
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
            backgroundColor={bg}
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

      <Button
        style={{ width: "90%", marginTop: 10 }}
        isLoading={isLoading}
        onPress={() =>
          mutateAsync({
            ...userDetails,
            userId: user.id,
          })
        }
      >
        Save
      </Button>

      <Box w="95%" mt={2}>
        <FormLabel ml={2}>Settings</FormLabel>
        {settingsSections.data.map(createSettingSection)}
      </Box>
    </Screen>
  );
}

export const Settings = React.memo(SettingsInternal);