import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
const bckimage = require( '../assets/bck3.jpg');

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(null);
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');

  
  const handleRegisterPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bckimage}  style={styles.image}>
      <View style={styles.inter}>

      <Text style={styles.title}>Registration Form</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Category"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
     <TextInput
        placeholder="Role"
        style={styles.input}
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
     
     
     

      <View style={styles.dropdownContainer}>
      <View style={styles.buttonContainer}>
           <TouchableOpacity onPress={() => navigation.goBack()}>
             <Text style={styles.forgotPassword}>Login</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => setModalVisible(true)}>
             <Text style={styles.forgotPassword}>Forgot Password?</Text>
           </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.RegisterButton} onPress={handleRegisterPress }>
          <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      {/* <Button title="Register" onPress={handleRegisterPress} /> */}
      </View>
     </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  inter:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  RegisterButton: {
    backgroundColor: '#907AFF',
    paddingVertical: 10,
    borderRadius: 19,
    alignItems: 'center',
    width: '50%',
    fontSize: 24,
    fontWeight: 'bold !important',
  },
  loginButtonText:{
    fontSize: 20,
    fontWeight: '400',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#273c75', // Title color
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: '80%',
    backgroundColor: '#ffffff', // Input background color
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    width: '80%',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#273c75', // Label color
  },
 
});
