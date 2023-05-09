import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../AuthProvider";
import { Button, Text, View } from "react-native";
import axios from "axios";


const Products = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default Products;
