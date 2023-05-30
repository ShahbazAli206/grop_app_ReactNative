import "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeBaseProvider } from "native-base";
import Order_status from "./Order_status";
import WishData from "./Wishlist";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Services from "./services";
import React, { useContext } from "react";
import TabNavigator from "./TabNavigator";
import { AuthContext } from "../../AuthProvider";
import Profile from "./Profile";
import Notification from "./Notifications";
const bckimage = require("../../../assets/bck1.jpg");
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomDrawerContent = (props) => {
  const { user } = useContext(AuthContext);

  const items = [
    { name: "Dashboard", icon: "home" },
    { name: "Services", icon: "category" },
    { name: "Wishlist", icon: "favorite" },
    { name: "Order Status", icon: "shopping-cart" },
    { name: "Notifications", icon: "notifications" },
    { name: "Profile", icon: "account-circle" },
  ];

  return (
    <LinearGradient
      colors={["#ffaf40", "#e26af0", "#ffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          paddingTop: 25,
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: `http://127.0.0.1:8000/storage/${user.profile}` }}
          style={{ width: 160, height: 160, borderRadius: 140 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          Resident portal
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
            style={{ marginVertical: 5 }}
          />
        ))}
        <Text style={{ margin: 30, paddingLeft: 30 }}>-------***********-------</Text>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

function MyDrawer() {
  const { logout, user } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const defaultScreenOpt = {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          marginRight: 10,
          backgroundColor: "purple",
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
        colors={["#f2ff", "#F44336"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
    headerTintColor: "green",
    paddingleft: 120,
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 25,
    },
  };

  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={defaultScreenOpt}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={TabNavigator} />
      <Drawer.Screen name="Services" component={Services} />
      <Drawer.Screen name="Order Status" component={Order_status} />
      <Drawer.Screen name="Wishlist" component={WishData} />
      <Drawer.Screen name="Notifications" component={Notification} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
export default function Dash_Res() {
  return (
    <NativeBaseProvider>
      <MyDrawer />
    </NativeBaseProvider>
  );
}
