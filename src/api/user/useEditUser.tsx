import { useMutation } from "@tanstack/react-query";
import { Badge, Image, Title, User } from "types";
import { queryClient } from "../apiProvider";
import { client } from "../client";

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
  title: Title | null;
  badge: Badge | null;
};

type EditUserRequest = {
  weightUnit: "pounds" | "kilograms";
  measurementUnit: "metric" | "imperial";
  username: string;
  weeklyWorkountAmountGoal: number;
  height: number;
  weight: number;
  age: number;
  darkMode: boolean;
  avatar: Image | null;
};

type EditUserResponse = {
  user: User;
}

export function useEditUser() {
  return useMutation(
    async (rawRequest: RawEditUserRequest) => {
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

      const { data } = await client.put<EditUserResponse>(`/users/${rawRequest.userId}`, request);
      return data.user;
    },
    {
      onSuccess(response) {
        queryClient.setQueryData(["user"], response);
      },
    }
  )
}
