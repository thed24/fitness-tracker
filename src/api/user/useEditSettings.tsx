/* eslint-disable consistent-return */
import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";

type RawEditSettingsRequest = {
  userId: string;
  userSettings: {
    weightUnit: "pounds" | "kilograms" | null;
    measurementUnit: "metric" | "imperial" | null;
    darkMode: "true" | "false" | null;
  }
};

type EditSettingsRequest = {
  weightUnit: "pounds" | "kilograms" | null;
  measurementUnit: "metric" | "imperial" | null;
  darkMode: boolean | null;
};

export function useEditSettings() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: RawEditSettingsRequest) => {
      try {
        const request = {
          darkMode: rawRequest.userSettings.darkMode === "true",
          measurementUnit: rawRequest.userSettings.measurementUnit,
          weightUnit: rawRequest.userSettings.weightUnit,
        } as EditSettingsRequest;

        return (
          await client.put(`/users/${rawRequest.userId}/settings`, request)
        ).data;
      } catch (error) {
        handleError(error);
      }
    },
    {
      onSuccess() {
        if (user) {
          updateUser(user, setUser);
        }
      },
    }
  );
}
