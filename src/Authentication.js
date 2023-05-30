import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import RegistrationScreen from "./registration";

const Stack = createStackNavigator();
const bckimage = require("../assets/bck3.jpg");

function LoginScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("sa38299793@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground source={bckimage} style={styles.image}>
        <View style={styles.inter}>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
            />
            <View style={styles.lognWraper}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => login(email, password)}
              >
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.forgotPassword}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Forgot your password?</Text>
                <Text style={styles.modalText}>
                  Enter your email address and we'll send you a link to reset
                  your password.
                </Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
}
export const Authentication = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  reg_modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  reg_title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reg_input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  reg_button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  reg_buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  inter: {
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#8000ff",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: "#cce0ff",
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 18,
    color: "#007AFF",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#907AFF",
    paddingVertical: 10,
    borderRadius: 19,
    alignItems: "center",
    width: "50%",
    fontSize: 24,
  },
  lognWraper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "98%",
  },
});
