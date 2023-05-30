import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import styled from "styled-components/native";
import { AuthContext } from "../../AuthProvider";
import { LinearGradient } from "expo-linear-gradient";

const OrderFormWrapper = styled.View`
  padding: 20px;
`;
const FormTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const StyledTextInput = styled(TextInput)`
  margin-bottom: 10px;
`;
const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
axios.defaults.baseURL = "http://127.0.0.1:8000";
function WishData() {
  const bckimage = require("../../../assets/bck3.jpg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const { user } = useContext(AuthContext);
  const [userid, setuserid] = useState(user.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState();
  const [itemClicked, setitemClicked] = useState("");

  const getWishList = (userid) => {
    axios
      .get(`/api/users/${userid}/wishlists`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setDetails(response.data.data);
      })
      .catch((error) => {
        console.log(
          "opps error gaya while whishlist fetch data",
          error.response
        );
      });
  };

  useEffect(() => {
    getWishList(userid);
    const interval = setInterval(() => {
      getWishList(userid);
    }, 4000);
    return () => clearInterval(interval);
  }, [userid]);

  const AddToCart = () => {
    console.log(
      "\n\n\ndata is ready as \n\n######  **************  ######\n\n",
      name,
      "\n",
      email,
      "\n",
      address,
      "\n",
      phone,
      "\n",
      quantity,
      "\n",
      itemClicked.id,
      "\n",
      userid
    );
    axios
      .post(
        "/api/cart_add",
        {
          user_id: userid,
          name,
          email,
          address,
          phone,
          quantity,
          service_id: itemClicked.id,
          colors_id: "2",
        },
        { headers: { "Content-Type": "application/json" } }
      )

      .then((response) => {
        if (response && response.data) {
          console.log(
            "\nthis is the respinnseeeeee ::::\n " + response.order_id
          );
        }
      })

      .catch((error) => {
        console.log(
          "\n\n  errror aaa gayaaa in order placement \n######   ***   ######\n",
          error
        );
      });
  };
  const keyExtractor = (item, index) => index.toString();

  const Item = ({ item, title, id, category, price, image, colors }) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        setitemClicked(item);
      }}
    >
      <View style={styles.item}>
        <LinearGradient
          colors={["#cce6ff", "yellow", "#f9ff"]}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          style={{ flex: 1, borderRadius: 20 }}
        >
          <Image
            source={{ uri: `http://127.0.0.1:8000/storage/${image}` }}
            style={styles.image}
          />
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.value}>{title}</Text>
          <Text style={styles.title}>Category : </Text>
          <Text style={styles.value}>{category}</Text>
          <Text style={styles.title}>Charges: </Text>
          <Text style={styles.value}>{price}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            setitemClicked("");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <OrderFormWrapper>
                <FormTitle>Order Form</FormTitle>
                <StyledTextInput
                  label="Name"
                  value={name}
                  onChangeText={setName}
                />
                <StyledTextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <StyledTextInput
                  label="Address"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                />
                <StyledTextInput
                  label="Phone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <StyledTextInput
                  label="Quantity"
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                />
                <SubmitButton
                  mode="contained"
                  onPress={() => {
                    AddToCart();
                    setModalVisible(!modalVisible);
                  }}
                >
                  Submit
                </SubmitButton>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </OrderFormWrapper>
            </View>
          </View>
        </Modal>
        <SafeAreaView style={styles.container}>
          {details && (
            <FlatList
              numColumns={2}
              data={details.filter(
                (item, index, self) =>
                  index === self.findIndex((t) => t.id === item.id)
              )}
              renderItem={({ item }) => (
                <Item
                  item={item}
                  id={item.id}
                  category={item.category_name}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  colors={item.colors}
                />
              )}
              keyExtractor={keyExtractor}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  image_bck_vew: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  item: {
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 6,
    minWidth: 164,
    maxWidth: "99%",

    minHeight: 360,
    borderRadius: 20,
  },
  model_image: {
    width: 260,
    height: 195,
    borderRadius: 60,
  },
  image: {
    width: 160,
    height: 95,
    borderRadius: 20,
  },
  title: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
  value: {
    fontStyle: "italic",
    fontSize: 21,
    maxWidth: 130,
    color: "purple",
    textAlign: "center",
    paddingBottom: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#b3b3ff",
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
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 7,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  model_title: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  model_value: {
    fontSize: 16,
    maxWidth: 320,
    color: "green",
    textAlign: "center",
    paddingBottom: 7,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default WishData;
