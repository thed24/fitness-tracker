import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { useTheme } from "native-base";
import { Profile } from "../../screens/profile/profile";
import { Schedule } from "../../screens/schedule/schedule";
import { History } from "../../screens/history/history";

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
      style={{
        backgroundColor: theme.colors.gray[300],
      }}
      screenOptions={(props) => ({
        swipeEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary[500],
          width: props.route.name === "Profile" ? "33%" : "28%",
          marginLeft: props.route.name === "History" ? "4%" : "0%",
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          elevation: 5,
          height: 50,
          marginTop: 15,
          borderRadius: 75,
          width: "95%",
          marginLeft: "2.5%",
        },
      })}
      initialRouteName="Profile"
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
}
