import { AuthContext } from "../../AuthProvider";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const bckimage = require("../../../assets/img_2.jpg");
  const bckProfile = require("../../../assets/img_bc_1.jpg");
  let shahbazali;
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
  const editProfile = () => {
    console.log("Edit Profile pressed");
  };
  const editinfo = () => {
    console.log("Edit info pressed");
  };
  const notificationHandler = () => {
    console.log("Edit Notifications pressed");
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <View style={{ flexDirection: "column" }}>
          <ImageBackground source={bckProfile} style={styles.profile_bck_img}>
            <View style={styles.image_view}>
              <TouchableOpacity onPress={editProfile}>
                <Image
                  source={{
                    uri: `http://127.0.0.1:8000/storage/${user.profile}`,
                  }}
                  style={styles.profileImage}
                />
                <View style={styles.image_icon}>
                  <AntDesign
                    name="camera"
                    size={23}
                    color="#ffe6e6"
                    onPress={editProfile}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.profile_info_text}>
                  {user.name ? user.name : "not available"}
                </Text>
                <Text style={styles.profile_info_text}>
                  {user.email ? user.email : "not available"}
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Info View */}
          <View style={styles.info_view}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.info_icon}>
                <AntDesign
                  name="edit"
                  size={23}
                  color="green"
                  onPress={editinfo}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.info_text}>Role :</Text>
                <Text style={styles.info_value}>{roleText}</Text>
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.info_text}>Name :</Text>
              <Text style={styles.info_value}>
                {user.name ? user.name : "not available"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.info_text}>Contact :</Text>
              <Text style={styles.info_value}>
                {user.phone ? user.phone : "not available"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.info_text}>Email :</Text>
              <Text style={styles.info_value}>
                {user.email ? user.email : "not available"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.info_text}>Address :</Text>
              <Text multiline={true} style={styles.info_value}>
                {user.address ? user.address : "not available"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            marginHorizontal: 6,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 16,
          }}
        >
          <Pressable
            style={{
              marginRight: 6,
              backgroundColor: "#f24660",
              padding: 6,
              borderRadius: 15,
            }}
            onPress={notificationHandler}
          >
            <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
              Order Update
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginRight: 6,
              backgroundColor: "#f24660",
              padding: 6,
              borderRadius: 15,
            }}
            onPress={notificationHandler}
          >
            <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
              Services
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginRight: 6,
              backgroundColor: "#f24660",
              padding: 6,
              paddingHorizontal: 14,
              borderRadius: 15,
            }}
            onPress={notificationHandler}
          >
            <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
              Notification
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  image_bck_vew: {
    flex: 1,
    resizeMode: "cover",
  },
  profile_bck_img: {
    // margin: 10,
    borderRadius: 20,
  },
  profile_bck_vew: {
    resizeMode: "cover",
  },
  image_view: {
    borderRadius: 20,
    // flex: 1,
    // margin: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image_icon: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#f24660",
    borderRadius: 20,
    padding: 5,
  },
  info_icon: {
    position: "absolute",
    flexDirection: "row-reverse",
    top: 20,
    right: 8,
    backgroundColor: "#f24660",
    borderRadius: 10,
    padding: 5,
  },
  info_view: {
    marginTop: 14,
    marginHorizontal: 10,
    textShadowColor: 5,
    paddingHorizontal: 5,
    fontWeight: "bold",
    fontSize: 34,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 23,
  },
  info_value: {
    marginTop: 2,
    textShadowColor: 5,
    paddingLeft: 40,
    fontWeight: "bold",
    fontSize: 18,
    color: "purple",
    width: "100%",
  },
  info_text: {
    marginTop: 15,
    textShadowColor: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  profile_info_text: {
    marginTop: 6,
    textShadowColor: 15,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },

  info: {
    flexDirection: "column",
  },
  profileImage: {
    width: 200,
    height: 210,
    borderRadius: 80,
  },
});

// /hiiiiiiiiiiiiiiiiiiiiiiii
