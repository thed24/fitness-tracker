import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { useColorModeValue, useTheme } from "native-base";
import { Profile } from "../../screens/profile/profile";
import { Schedule } from "../../screens/schedule/schedule";
import { History } from "../../screens/history/history";

export function DashboardStack() {
  const Tab = createMaterialTopTabNavigator();
  const { width } = Dimensions.get("window");
  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.gray[300], theme.colors.gray[700]);
  const popout = useColorModeValue(theme.colors.white, theme.colors.gray[900]);

  const screens = [
    {
      name: "History",
      component: History,
    },
    {
      name: "Stats",
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
        backgroundColor: bg,
      }}
      screenOptions={(props) => ({
        swipeEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary[500],
          width: props.route.name === "Profile" ? "33%" : "28%",
          marginLeft: props.route.name === "History" ? "4%" : "0%",
        },
        tabBarStyle: {
          backgroundColor: popout,
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
          marginTop: 15,
          borderRadius: 75,
          width: "95%",
          marginLeft: "2.5%",
        },
      })}
      initialRouteName="Stats"
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
