import { AuthContext } from "../../AuthProvider";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  Animated,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const bckimage = require("../../../assets/img_2.jpg");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [itemClicked, setitemClicked] = useState("");


  const update_order = () => {
    axios
      .put(`/api/order_update/${itemClicked.id}`, updatedColumns)
      .then((response) => {
        console.log(
          "\n aa gaya ******* data of orders \n ",
          response.data.message
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log("\n this is data for call \n", updatedColumns);
    clear_var();
  };
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
        <View style={{ flexDirection: "row" }}>
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
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            setitemClicked("");
            setName("");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.form_header}>
                {" "}
                Edit Order{" "}
                <Text style={styles.form_header_id}>
                  ( ' {itemClicked.id} ' )
                </Text>
              </Text>
              <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.form_input}
                  value={name}
                  onChangeText={setName}
                  placeholder={itemClicked.name}
                />
              </View>

              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.form_input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={itemClicked.email}
                />
              </View>
              <View>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.form_input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder={itemClicked.phone}
                />
              </View>

              <View>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.form_input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder={itemClicked.address}
                />
              </View>

              <View>
                <Text style={styles.label}>Status</Text>
                <TextInput
                  style={styles.form_input}
                  value={status}
                  onChangeText={setStatus}
                  placeholder={itemClicked.status}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.UpdateButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setitemClicked("");
                    update_order();
                    console.log("\n this is data for call \n", updatedColumns);
                  }}
                >
                  <Text style={styles.UpdateButtonText}>Update</Text>
                </Pressable>

                <Pressable
                  style={styles.CloseButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    clear_var();
                  }}
                >
                  <Text style={styles.UpdateButtonText}>Close Modal</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            marginTop: 30,
          }}
        >
          <Pressable
            style={{
              marginRight: 6,
              backgroundColor: "purple",
              padding: 6,
              borderRadius: 15,
            }}
            onPress={notificationHandler}
          >
            <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
              Orders Updates
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginRight: 6,
              backgroundColor: "purple",
              padding: 6,
              borderRadius: 15,
            }}
            onPress={notificationHandler}
          >
            <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
              New Services
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginRight: 6,
              backgroundColor: "purple",
              padding: 6,
              borderRadius: 15,
            }}
            onPress={notificationHandler}
          >
            <Text style={{ color: "white", fontSize: 19, fontStyle: "italic" }}>
              Notifications
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View>
            <Text>Nothing to Updates available</Text>
          </View>
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
  image_view: {
    top: 30,
    right: 5,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
  image_icon: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  info_icon: {
    position: "absolute",
    flexDirection: "row-reverse",
    top: 32,
    right: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    padding: 5,
  },
  info_view: {
    flex: 1.2,
    marginTop: 24,
    marginHorizontal: 7,
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
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "purple",
    width: "98%",
    minHeight: 6,
  },
  info_text: {
    marginTop: 18,
    textShadowColor: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },

  info: {
    flexDirection: "column",
  },
  profileImage: {
    width: 180,
    height: 210,
    borderRadius: 90,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "#ff9f",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  form_header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  form_header_id: {
    fontSize: 16,
    color: "purple",
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    textAlignVertical: "top",
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
    marginTop: 3,
    marginBottom: 2,
  },
  form_input: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 250,
    borderColor: "#907AFF",
    borderWidth: 2,
    borderRadius: 9,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  UpdateButton: {
    backgroundColor: "#907AFF",
    padding: 10,
    borderRadius: 19,
    alignItems: "center",
    width: 120,
    fontSize: 24,
    marginBottom: 8,
  },
  CloseButton: {
    backgroundColor: "#9f6A12",
    padding: 10,
    borderRadius: 19,
    alignItems: "center",
    width: 120,
    fontSize: 24,
    marginBottom: 8,
  },
  UpdateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
