import React from "react";
import { useTheme, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { GradientIcon } from "./components/gradientIcon";
import { IoniconsIconsNames, TabIcon } from "./components/tabIcon";
import { LogoutButton } from "./components/logoutButton";
import { CreateWorkout } from "../../screens/create/createWorkout";
import { Settings } from "../../screens/settings/settings";

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  const createLogoutButton = (props: any) => <LogoutButton {...props} />;

  const createTab = (
    name: string,
    icon: IoniconsIconsNames,
    component: React.FC<any>,
    action: boolean = false
  ) => {
    const createIcon = (focused: boolean) =>
      action ? (
        <GradientIcon name={icon} focused={focused} />
      ) : (
        <TabIcon name={icon} focused={focused} />
      );

    const createLabel = (focused: boolean) => (
      <Text
        mt={-2}
        style={{
          color: focused ? theme.colors.primary[500] : theme.colors.gray[500],
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {action ? "" : name}
      </Text>
    );

    return (
      <Tab.Screen
        name={name}
        component={component}
        options={(props) => ({
          headerRight: () => createLogoutButton(props),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarIconStyle: action
            ? {
                paddingLeft: 5,
                paddingRight: 5,
              }
            : {},
          tabBarLabel: ({ focused }) => createLabel(focused),
          tabBarIcon: ({ focused }) => createIcon(focused),
        })}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: theme.colors.white,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          height: 50,
          width: "95%",
          alignContent: "center",
          alignSelf: "center",
          position: "absolute",
          left: 10,
          bottom: 10,
          borderRadius: 20,
        },
      }}
      initialRouteName="Dashboard"
    >
      {createTab("Dashboard", "ios-home-sharp", DashboardStack)}
      {createTab("Create", "ios-add-sharp", CreateWorkout, true)}
      {createTab("Settings", "ios-settings-sharp", Settings)}
    </Tab.Navigator>
  );
}
