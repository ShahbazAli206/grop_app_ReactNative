import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Adm_Dashboard } from "./Adm_Dashboard";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen
        name="Home"
        component={Adm_Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        options={{ tabBarBadge: 3, headerShown: false }}
        component={Adm_Dashboard}
      />
      <Tab.Screen
        name="Profile"
        component={Adm_Dashboard}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
