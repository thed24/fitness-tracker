import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { Image } from "types";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";

export type RawEditUserRequest = {
  userId: number;
  weightUnit: "pounds" | "kilograms";
  measurementUnit: "metric" | "imperial";
  darkMode: "true" | "false";
  username: string;
  email: string;
  weeklyWorkountAmountGoal: number;
  height: number;
  weight: number;
  age: number;
  avatar: Image | null;
};

type EditUserRequest = {
  weightUnit: "pounds" | "kilograms";
  measurementUnit: "metric" | "imperial";
  username: string;
  email: string;
  weeklyWorkountAmountGoal: number;
  height: number;
  weight: number;
  age: number;
  darkMode: boolean;
  avatar: Image | null;
};

export function useEditUser() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: RawEditUserRequest) => {
      try {
        const boolFromStr = (str: string) => {
          if (str === "true") {
            return true;
          }
          return false;
        };

        const request = {
          ...rawRequest,
          darkMode: boolFromStr(rawRequest.darkMode),
        } as EditUserRequest;

        return (await client.put(`/users/${rawRequest.userId}`, request)).data;
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
