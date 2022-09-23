import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { useTheme } from "native-base";
import { History } from "../history/history";
import { Schedule } from "../schedule/schedule";
import { Profile } from "../profile/profile";

export function DashboardStack() {
  const Tab = createMaterialTopTabNavigator();
  const { width } = Dimensions.get("window");
  const theme = useTheme();

  const screens = [
    {
      name: "History",
      component: History,
    },
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Schedule",
      component: Schedule,
    },
  ];

  return (
    <Tab.Navigator
      initialLayout={{
        width,
      }}
      screenOptions={(props) => ({
        swipeEnabled: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary[500],
          width: props.route.name === "Profile" ? "33%" : "28%",
          marginLeft: props.route.name === "History" ? "4%" : "0%",
        },
        tabBarStyle: {
          backgroundColor: theme.colors.gray[50],
          borderTopWidth: 0,
          height: 50,
          elevation: 10,
          marginTop: 10,
          borderRadius: 30,
          width: "95%",
          alignSelf: "center",
          justifyContent: "center",
        },
      })}
      initialRouteName="Profile"
    >
      {screens.map((screen) => (
        <Tab.Screen key={screen.name} name={screen.name} component={screen.component}/>
      ))}
    </Tab.Navigator>
  );
}
