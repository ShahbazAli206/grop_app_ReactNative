import React, { useContext, useState, useEffect } from "react";
import {
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const bckimage = require("../../../assets/bck3.jpg");
  const [categories, setcategories] = useState([]);

  const onAccept = (item) => {
    // handle the add button press here
    console.log("onAccept button pressed\n", item.order_id);
    axios
      .put(`/api/orders/${item.order_id}/status`)
      .then((response) => {
        console.log("\n Congrats the Order is Accepted by You \n ", categories);
        setcategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    tech_Orders();
  };

  const renderHeader = () => {
    return (
      <LinearGradient
        colors={["#f24220", "#00ffff", "#ffff", "#f2ff"]}
        style={styles.header}
      >
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Jobs</Text>
        <Text style={[styles.headerText, styles.name]}>Address</Text>
        <Text style={[styles.headerText, styles.edit]}>Status</Text>
        <Text style={[styles.headerText, styles.delete]}>Accept</Text>
      </LinearGradient>
    );
  };

  const tech_Orders = () => {
    console.log("g sir");
    axios
      .get(`/api/tech_orders/${user.category_id}`)
      .then((response) => {
        console.log("\n Got it, ******* data of tech_Orders \n ", categories);
        setcategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    tech_Orders();
  }, []);
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <LinearGradient
        colors={[
          "#f2ff",
          "#ffff",
          "#00ffff",
          "#00ffff",
          // "#ffff",
          // "#f2ff",
        ]}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
          backgroundColor: "#9fffff",
          borderRadius: 10,
          shadowColor: "blue",
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 0.9,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View style={styles.itemLeft}>
          <View style={styles.itemid_view}>
            <Text style={styles.itemText_id}>{item.order_id}</Text>
          </View>

          <View style={styles.itemid_view}>
            <Text style={styles.itemText_id}>{item.job}</Text>
          </View>

          <View style={styles.itemText_view}>
            <Text style={styles.itemText_name}>
              ksdfjldjflsdjfljdcflkj{item.address}
            </Text>
          </View>
        </View>

        <View style={styles.itemRight}>
          <View>
            <Text style={styles.itemText_id}>{item.status}</Text>
          </View>

          <TouchableOpacity
            onPress={() => onAccept(item)}
            style={styles.stattus}
          >
            <AntDesign name="check" size={30} color="green" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <FlatList
          data={categories}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          style={styles.list}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_bck_vew: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "#f24220",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "purple",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 15,
  },
  headerText: {
    fontSize: 17,
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  id: {
    flex: 1,
    textAlign: "center",
  },
  name: {
    flex: 4,
  },
  stattus: {
    paddingEnd: 6,
  },

  delete: {
    flex: 2,
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

    flexDirection: "row",
    marginVertical: 15,
    marginHorizontal: 1,
    paddingHorizontal: 5,
  },
  list: {
    paddingHorizontal: 1,
    paddingVertical: 10,
  },
  itemLeft: {
    flex: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
  },
  itemRight: {
    flex: 1.2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
  },

  itemText_id: {
    color: "purple",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemText_name: {
    flex: 3,
    fontSize: 16,
    marginRight: 15,
  },
  itemText_view: {
    flex: 5,
  },
  itemid_view: {
    flex: 2,
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
    color: "#552b2b",
    fontWeight: "bold",
    marginBottom: 5,
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

export default Orders;
