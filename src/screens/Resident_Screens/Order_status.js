import React, { useContext, useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, ImageBackground, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import { LinearGradient } from "expo-linear-gradient";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const Order_status = () => {
  const { user } = useContext(AuthContext);
  const [userid, setuserid] = useState(user.id);
  const [dataa, setdataa] = useState("");
  const keyExtractor = (item, index) => index.toString();
  const bckimage = require( '../../../assets/bck3.jpg');

  const getorderStatu = (userid) => {
    axios
      .get(`/api/order_status/${userid}`)
      .then((response) => {
        setdataa(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getorderStatu(userid);
    const interval = setInterval(() => {
      getorderStatu(userid);
    }, 80000);
    return () => clearInterval(interval);
  }, [userid]);

  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <LinearGradient
          colors={["#cce6ff", "yellow", "#f9ff"]}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          style={{ flex: 1, flexDirection: "row",
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
          elevation: 3, }}
        >
      <Image
        style={styles.itemImage}
        source={{ uri: `http://127.0.0.1:8000/storage/${item.service.image}` }}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.service.title}</Text>
        <Text style={styles.itemStatus}>
          <Text style={styles.itemPrice}> Status: </Text> {item.status}
        </Text>
        <Text style={styles.itemTime}>
          {" "}
          <Text style={styles.itemPrice}>Time : </Text> {item.color.code} -{" "}
          {item.color.code1}
        </Text>
        <Text style={styles.itemShift}>
          <Text style={styles.itemPrice}> Shift : </Text> {item.color.name}
        </Text>
        <Text style={styles.itemQuantity}>
          <Text style={styles.itemPrice}> No. of Tasks : </Text>
          {item.quantity}
        </Text>
        <Text style={styles.itemQuantity}>
          <Text style={styles.itemPrice}> Charges (min) : </Text>
          {item.service.price}
        </Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      </LinearGradient>
    </View>
  );

  return (
    <ImageBackground source={bckimage}  style={styles.image_bck_vew}>

    <FlatList
      data={dataa}
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
          </ImageBackground>

  );
};
const styles = StyleSheet.create({
  itemContainer: {
    // margin: 1;
   },
  image_bck_vew: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  itemImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemStatus: {
    fontSize: 16,
    color: "#009900",
    marginBottom: 5,
  },
  itemTime: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  itemShift: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
    fontWeight: "normal",
  },
  itemPrice: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
});

export default Order_status;
