import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { Authentication } from "./Authentication";
import Dash_Res from "./screens/Resident_Screens/Home";
import Dash_Tech from "./screens/Technician_Screens/Home";
import * as SecureStore from "expo-secure-store";
import Dash_Admin from "./screens/Admin_Screens/Home";

export default function Routes() {
  const { user, setUser, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if the user is logged in or not
    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          // decode it
          console.log("####***  securestore  **####");
          // login();
          userObject = JSON.parse(userString);
          setUser(userObject);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? (
        user.role == 1 ? (
          <Dash_Admin /> // user.role == 2
        ) : user.role == 2 ? (
          <Dash_Res /> // user.role == 1
        ) : (
          <Dash_Tech />
        ) // user.role == 3
      ) : (
        <Authentication />
      )}
    </NavigationContainer>
  );
}
