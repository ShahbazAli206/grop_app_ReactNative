import React, { useContext, useState, useEffect } from "react";
import {
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const Orders = () => {
  const bckimage = require("../../../assets/bck3.jpg");
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemClicked, setitemClicked] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");

  const updatedColumns = {
    name: name,
    email: email,
    status: status,
    phone: phone,
    address: address,
  };

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
  const add_var = (daattaa) => {
    setName(daattaa.name);
    setEmail(daattaa.email);
    setPhone(daattaa.phone);
    setStatus(daattaa.status);
    setAddress(daattaa.address);
  };
  const clear_var = () => {
    setName("");
    setEmail("");
    setPhone("");
    setStatus("");
  };

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => {
        console.log("\n aa gaya ******* data of orders \n ");
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const keyExtractor = (item, index) => index.toString();

  const renderHeader = () => {
    return (
      <LinearGradient
        colors={["#f2ff", "#00ffff", "#ffff"]}
        style={styles.header}
      >
        {/* <View style={styles.header}> */}
        <Text style={styles.headerText}>
          Add and Update Orders LIsted Below
        </Text>
      </LinearGradient>
    );
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setitemClicked(item);
        setModalVisible(true);
        add_var(item);
      }}
    >
      <View>
        <LinearGradient
          colors={[
            "#f2ff",
            "#ffff",
            "#00ffff",
            "#00ffff",
            "#00ffff",
            "#00ffff",
            "#ffff",
          ]}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            marginVertical: 5,
            marginHorizontal: 10,
            backgroundColor: "#9fffff",
            borderRadius: 10,
            shadowColor: "blue",
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 0.9,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>
              Order ID :: <Text style={styles.itemTitle_id}>{item.id}</Text>
            </Text>
            <Text style={styles.itemQuantity}>
              <Text style={styles.itemPrice}> Name: </Text>
              {item.name ? item.name : "Not available"}
            </Text>
            <Text style={styles.itemStatus}>
              <Text style={styles.itemPrice}> Status: </Text>
              {item.status}
            </Text>
            <Text style={styles.itemQuantity}>
              <Text style={styles.itemPrice}> Email : </Text>
              {item.email ? item.email : "Not available"}
            </Text>
            <Text style={styles.itemQuantity}>
              <Text style={styles.itemPrice}> Contact : </Text>
              {item.phone ? item.phone : "Not available"}
            </Text>
            <Text style={styles.itemQuantity}>
              <Text style={styles.itemPrice}> Address : </Text>
              {item.address ? item.address : "Not available"}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <FlatList
          data={orders}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
        />
        {itemClicked && (
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
            <LinearGradient
              colors={[
                "#f2ff",
                "#ff9f",
                "#00ffff",
                "#00ffff",
                "#00ffff",
                "#ff9f",
                "#f2ff",
              ]}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20%",
                maxHeight: "80%",
                margin: 20,
                // width: "90%",
                backgroundColor: "#ff9f",
                borderRadius: 20,
                padding: 35,
                shadowColor: "#fff5",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
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
            </LinearGradient>
          </Modal>
        )}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
    // padding: 10,
  },
  image_bck_vew: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    margin: 4,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#ccc",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  id: {
    flex: 1,
    textAlign: "center",
  },
  name: {
    flex: 2,
  },
  edit: {
    flex: 1,
    textAlign: "center",
  },
  delete: {
    flex: 1,
    textAlign: "center",
  },

  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "84%",
  },
  // updated style after space
  item: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#9fffff",
    borderRadius: 10,
    shadowColor: "blue",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#72511b",
    marginBottom: 5,
    fontWeight: "normal",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    alignItems: "center",
    textAlign: "center",
  },
  itemSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemStatus: {
    fontSize: 16,
    color: "#9900cc",
    marginTop: 5,
    marginBottom: 5,
  },
  itemTitle_id: {
    fontSize: 16,
    color: "brown",
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#f24220",
    fontWeight: "bold",
    marginBottom: 5,
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  modalView: {
    margin: 20,
    // width: "90%",
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
    backgroundColor: "#f24220",
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

export default Orders;
