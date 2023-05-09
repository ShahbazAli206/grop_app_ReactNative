import React, { useState, useEffect } from "react";
import {Modal, Pressable, TouchableOpacity, Text,   StatusBar,  View, Image, StyleSheet,FlatList,  SafeAreaView } from "react-native";
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
function WishData({ navigation }) {
  const [wishdata, setwishdata] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [details,setDetails] = useState("");


  useEffect(() => {
    // axios.get('/api/tables/wishlists')
    axios.get('/api/users/2/wishlists', {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then(response => {
           setwishdata(response.data.data);
           console.log('\n\ncongrats, data fetch successfully\n******** ######  masahallah ##### *********\n\n\n\n', wishdata);
          })
      .catch(error => {
        console.log("hooooo errror aaa", error.response);
      })
  }, []);
  
  const Item = ({item, title, id, category, price, image, colors}) => (
  <TouchableOpacity 
  // onPress={() => {setModalVisible(true); setDetails(item)}}
  onPress={() => {navigation.navigate('Wishlist', {itemId: item})}}
  >
    <View style={styles.item}>
      <Image source={{ uri: `http://127.0.0.1:8000/storage/${image}`, }} style={styles.image} />
      <Text style={styles.title}>Name:</Text>
      <Text style={styles.value}>{title}</Text>
      <Text style={styles.title}>Category : </Text>
      <Text style={styles.value}>{category}</Text>
      <Text style={styles.title}>Charges: </Text> 
      <Text style={styles.value}>{price}</Text>
    </View>
  </TouchableOpacity>
  );
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          setDetails("");
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!{details.description}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          data={wishdata}
          renderItem={({item}) => <Item item={item} id={item.id} category={item.category_name} title={item.title} price={ item.price } image={item.image} colors={item.colors} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c27f',
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 6,
    minWidth: 164,
    maxWidth: '99%',

    minHeight: 360,
    borderRadius:20,
  },
  image:{
    width: 160,
    height: 95,
    borderRadius: 20,

   },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
  value: {
    fontStyle: 'italic',
    fontSize: 21,
    maxWidth: 130,
    color:'purple',
    textAlign: 'center',
    paddingBottom: 7,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default WishData;