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
  const items = [
    { name: "Home", icon: "home" },
    { name: "Profile", icon: "account-circle" },
    { name: "Services", icon: "category" },
    { name: "Order Status", icon: "shopping-cart" },
    { name: "Wishlist", icon: "favorite" },
    { name: "Notifications", icon: "notifications" },
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
          padding: 10,
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          // source={{ uri: 'https://example.com/myimage.png' }}
          source={bckimage}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          Resident portal
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} activeTintColor="#fff" labelStyle={{ fontSize: 29,  fontWeight: 'bold' }}/> */}
        {items.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.name}
            icon={({ color, size }) => (
              <Icon name={item.icon} color={color} size={size} />
            )}
            onPress={() => props.navigation.navigate(item.name)}
            labelStyle={{ fontWeight: "bold", fontSize: 20 }}
            style={{ marginVertical: 10 }}
          />
        ))}
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
      screenOptions={defaultScreenOpt}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Resident_Home" component={TabNavigator} />
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
