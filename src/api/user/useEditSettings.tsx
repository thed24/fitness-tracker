import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";

export type RawEditSettingsRequest = {
  userId: number;
  userSettings: {
    weightUnit: "pounds" | "kilograms";
    measurementUnit: "metric" | "imperial";
    darkMode: "true" | "false";
  };
};

type EditSettingsRequest = {
  weightUnit: "pounds" | "kilograms";
  measurementUnit: "metric" | "imperial";
  darkMode: boolean;
};

export function useEditSettings() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: RawEditSettingsRequest) => {
      try {
        const boolFromStr = (str: string) => {
          if (str === "true") {
            return true;
          }
          return false;
        };

        const request = {
          darkMode: boolFromStr(rawRequest.userSettings.darkMode),
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
