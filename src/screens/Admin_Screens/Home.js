import "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Orders from "./Orders";
import WishlistScreen from "./Wishlist";
import Categories from "./Categories";
import TabNavigator from "./TabNavigator";
import Profile from "./Profile";
import { AuthContext } from "../../AuthProvider";
const bckimage = require("../../../assets/bck1.jpg");
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomDrawerContent = (props) => {
  const { user } = useContext(AuthContext);
  const items = [
    { name: "Admin Dashboard", icon: "home" },
    { name: "Orders", icon: "favorite" },
    { name: "Services", icon: "shopping-cart" },
    { name: "Categories", icon: "category" },
    { name: "Users", icon: "account-circle" },
    { name: "Notifications", icon: "notifications" },
    { name: "Chat", icon: "chat" },
    { name: "Profile", icon: "account-circle" },
  ];

  let roleText;

  if (user.role === 2) {
    roleText = "Admin";
  } else if (user.role === 1) {
    roleText = "Resident";
  } else if (user.role === 3) {
    roleText = "Technician";
  } else {
    roleText = "unauthenticated";
  }

  return (
    <LinearGradient
      colors={["#e26af0", "#ffaf40", "#ffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          padding: 10,
          paddingBottom: 0,
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: `http://127.0.0.1:8000/storage/${user.profile}` }}
          style={{ width: 180, height: 180, borderRadius: 140 }}
        />
        <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
          {roleText} portal
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        {items.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.name}
            icon={({ color, size }) => (
              <Icon name={item.icon} color={color} size={size} />
            )}
            onPress={() => props.navigation.navigate(item.name)}
            labelStyle={{ fontWeight: "bold", fontSize: 20 }}
            style={{ marginVertical: 4 }}
          />
        ))}
        <Text style={{ margin: 20, paddingLeft: 30 }}>
          -------***********-------
        </Text>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

function MyDrawer() {
  const { logout } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const defaultScreenOpt = {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          marginRight: 10,
          backgroundColor: "#f24220",
          padding: 6,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
          logout
        </Text>
      </TouchableOpacity>
    ),

    headerStyle: { backgroundColor: "transparent" },
    headerBackground: () => (
      <LinearGradient
        colors={["#f2ff", "#F44336", "#fcff"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
    headerTintColor: "black",
    paddingleft: 120,
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 28,
    },
  };

  return (
    <Drawer.Navigator
      screenOptions={defaultScreenOpt}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Admin Dashboard" component={TabNavigator} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Notifications" component={WishlistScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Services" component={Categories} />
    </Drawer.Navigator>
  );
}
export default function Dash_Admin() {
  return (
    <NativeBaseProvider>
      <MyDrawer />
    </NativeBaseProvider>
  );
}
