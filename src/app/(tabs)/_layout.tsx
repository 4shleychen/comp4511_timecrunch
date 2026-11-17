import { Tabs } from "expo-router/js-tabs";
import { CalendarDaysIcon, HouseIcon, UserIcon, UsersIcon } from "lucide-react-native";
import { Text } from "react-native";

import { colors } from "@/constants/colors";

const tabs = [
  { name: "home", title: "Home", icon: HouseIcon },
  { name: "friends", title: "Friends", icon: UsersIcon },
  { name: "history", title: "History", icon: CalendarDaysIcon },
  { name: "profile", title: "Profile", icon: UserIcon },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "TimeCrunch",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabel: ({ color, children }) => (
          <Text style={{ color, fontSize: 11 }}>{children}</Text>
        ),
      }}
    >
      {tabs.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{ title, tabBarIcon: ({ color }) => <Icon color={color} size={24} /> }}
        />
      ))}
    </Tabs>
  );
}
