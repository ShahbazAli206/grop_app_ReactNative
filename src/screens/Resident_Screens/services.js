import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import { LinearGradient } from "expo-linear-gradient";

axios.defaults.baseURL = "http://127.0.0.1:8000";
function Services({ navigation }) {
  const bckimage = require("../../../assets/bck3.jpg");
  const { user, logout } = useContext(AuthContext);
  const [userid, setuserid] = useState(user.id);
  const [Is_present, setIs_present] = useState();
  const [dataa, setdataa] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemClicked, setitemClicked] = useState("");

  const getServicesData = () => {
    axios
      .get("/api/home_data")
      .then((response) => {
        if (response && response.data) {
          setdataa(response.data);
          console.log("congrats, data fetch successfully");
        }
      })
      .catch((error) => {
        console.log("hooooo errror aaa", error.response);
      });
  };

  const item_present = (serviceId) => {
    setIs_present();
    axios
      .get(`/api/item_present/${serviceId}/${userid}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data) {
          setIs_present(response.data.is_present);
          // console.log("\n Clicked service is present in wislhist already\n", response.data.is_present);
          console.log(
            "\n Clicked service is NOT ** present in wislhist\n",
            Is_present
          );
        }
      })
      .catch((error) => {
        console.log(
          "opps error while checking if item is present in wishlist",
          error
        );
      });
  };

  const wish_add = (id, userid) => {
    axios
      .post(
        "/api/wishlist_add",
        { user_id: userid, service_id: id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response && response.data) {
          setdataa(response.data);
          console.log(
            "congrats, product has been added to wishlist, successfully"
          );
        }
      })

      .catch((error) => {
        console.log("\n\n\na gggggg  errror aaa gayaaa \n\n############\n\n");
      });
    getServicesData();
  };

  const wish_remove = (id, userid) => {
    axios
      .delete(`/api/wishlist_remove/${userid}/${id}`)
      .then((response) => {
        console.log(
          "congrats, product has removed from wishlist, successfully",
          response.data.success
        );
        // update state or perform any other action
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });

    getServicesData();
  };
  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    getServicesData();
  }, []);

  const Item = ({ item, title, id, price, image, colors }) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        setitemClicked(item);
        item_present(id);
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
          <Text style={styles.title}>Name, id={id} </Text>
          <Text style={styles.value}>{title}</Text>
          <Text style={styles.title}>Charges: </Text>
          <Text style={styles.value}>{price}</Text>
          <Text style={styles.title}>Timing</Text>
          {colors &&
            colors.map((x) => (
              <Text style={styles.value}>
                {" "}
                {x.code} to {x.code1}
              </Text>
            ))}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',backgroundColor:  '#d9ffb3', justifyContent: 'center'
      }}
    >
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <SafeAreaView style={styles.container}>
          <FlatList
            numColumns={2}
            data={dataa}
            renderItem={({ item }) => (
              <Item
                item={item}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                colors={item.colors}
              />
            )}
            keyExtractor={keyExtractor}
          />
        </SafeAreaView>
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
              <Image
                source={{
                  uri: `http://127.0.0.1:8000/storage/${itemClicked.image}`,
                }}
                style={styles.image}
              />
              <Text style={styles.model_title}>Name {itemClicked.id}</Text>
              <Text style={styles.model_value}>{itemClicked.title}</Text>
              <Text style={styles.model_title}>Category</Text>
              <Text style={styles.model_value}>{}</Text>
              <Text style={styles.model_title}>Charges(min): </Text>
              <Text style={styles.model_value}>{itemClicked.price}</Text>
              <Text style={styles.model_title}>Timing</Text>
              {itemClicked.colors &&
                itemClicked.colors.map((x) => (
                  <Text style={styles.model_value}>
                    {" "}
                    {x.code} to {x.code1}
                  </Text>
                ))}
              <Text style={styles.model_title}>Description</Text>
              <Text style={styles.model_value}>{itemClicked.description}</Text>

              {Is_present ? (
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => {
                    wish_remove(itemClicked.id, userid);
                    getServicesData();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Remove from Wishlist</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => {
                    wish_add(itemClicked.id, userid);
                    getServicesData();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Add to Wishlist</Text>
                </Pressable>
              )}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    // backgroundColor: "#f9c27f",
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 6,
    minWidth: 164,
    maxWidth: "99%",

    minHeight: 360,
    borderRadius: 20,
  },
  image: {
    width: 160,
    height: 95,
    borderRadius: 20,
  },
  title: {
    color: "blue",
    fontSize: 26,
    textAlign: "center",
  },
  value: {
    fontSize: 18,
    maxWidth: 130,
    color: "purple",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffb3d9",
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
    marginBottom: 7,
    elevation: 2,
    // color:'#2196F3',
  },
  buttonOpen: {
    backgroundColor: "#3ff9ff",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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

export default Services;