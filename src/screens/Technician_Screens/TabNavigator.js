import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Profile from "./Profile";
import Chat from "./Chat";
import Tech_Dashboard from "./Tech_Dashboard";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "ios-home" : "ios-home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Chat") {
            return (
              <Ionicons
                name={
                  focused
                    ? "ios-chatbubble-ellipses"
                    : "ios-chatbubble-ellipses-outline"
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name={
                  focused ? "ios-person-circle" : "ios-person-circle-outline"
                }
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "tomato",
      })}
    >
      <Tab.Screen name="Home" component={Tech_Dashboard} />
      <Tab.Screen name="Chat" options={{ tabBarBadge: 3 }} component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
