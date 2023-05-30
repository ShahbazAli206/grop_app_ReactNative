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
  const { user } = useContext(AuthContext);
  const [userid, setuserid] = useState(user.id);
  const [dataa, setdataa] = useState([]);

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
        console.log("hooooo errror aaa\n\n\n", error.response);
      });
  };

  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    getServicesData();
  }, []);

  const Item = ({ item, title, id, price, image, colors }) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <LinearGradient
          colors={["#c2e9ff", "#f9c27f", "#f9ff"]}
          style={{
            width: "99%",
            flex: 1,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <Image
            source={{ uri: `http://127.0.0.1:8000/storage/${image}` }}
            style={styles.image}
          />
          <Text style={styles.title}>Name </Text>
          <Text style={styles.value}>{title}</Text>
          <Text style={styles.title}>Visit-Charges </Text>
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
    <View style={{ flex: 1 }}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
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
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 7,
    minHeight: 360,
    width: "98%",
  },
  image: {
    width: 140,
    height: 95,
    marginTop: 6,
    marginHorizontal: 10,
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
