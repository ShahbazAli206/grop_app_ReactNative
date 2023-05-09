import React, { useContext, useState, useEffect } from "react";
import {ImageBackground, Modal, Pressable, TouchableOpacity, Text,   StatusBar,  View, Image, StyleSheet,FlatList,  SafeAreaView } from "react-native";
import axios from 'axios';
import { AuthContext } from "../../AuthProvider";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
function WishlistScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)
  const [userid, setuserid] = useState(user.id);
  const [wishdata, setwishdata] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [details,setDetails] = useState("");
  const [itemClicked,setitemClicked] = useState("");
  const bckimage = require( '../../../assets/bck3.jpg');

  const AddToCart = ( (id, userid)=>{
    setidd(id);
  
    axios.post('/api/wishlist_add', 
    {
      user_id: userid,
      service_id: id,
    },
    {headers: {  'Content-Type' : 'application/json'} })
  
    .then(response => {
       if(response && response.data){
         setdataa(response.data);
          console.log('congrats, product has been added to wishlist, successfully');}})
  
    .catch(error => {
       console.log("\n\n\na gggggg  errror aaa gayaaa \n\n############\n\n");
      })
  })
  useEffect(() => {
    axios.get('/api/users/2/wishlists', {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then(response => {
           setwishdata(response.data.data);
          //  console.log('\n\ncongrats, data fetch successfully\n******** ######  masahallah ##### *********\n\n\n\n', wishdata);
          })
      .catch(error => {
        console.log("hooooo errror aaa", error.response);
      })
  }, []);
  
  const Item = ({item, title, id, category, price, image, colors}) => (
  <TouchableOpacity 
  onPress={() => {setModalVisible(true); setitemClicked(item);}}
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
    <View style={{ flex: 1 }}>
      <ImageBackground source={bckimage}  style={styles.image_bck_vew}>      
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
            <Image source={{ uri: `http://127.0.0.1:8000/storage/${itemClicked.image}`, }} style={styles.model_image} />
            <Text style={styles.model_title}>Name {itemClicked.id}</Text>
            <Text style={styles.model_value}>{itemClicked.title}</Text>
            {/* <Text style={styles.model_title}>Category</Text>
            <Text style={styles.model_value}>{}</Text> */}
            <Text style={styles.model_title}>Charges(min): </Text> 
            <Text style={styles.model_value}>{itemClicked.price}</Text>
            {/* <Text style={styles.model_title}>Timing</Text>
            {itemClicked.colors && itemClicked.colors.map(x => <Text style={styles.model_value}> {x.code} to {x.code1}</Text>)} */}
            <Text style={styles.model_title}>Description</Text>
            <Text style={styles.model_value}>{itemClicked.description}</Text>
  
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {AddToCart(itemClicked.id, userid); setModalVisible(!modalVisible)} }
              >
                <Text style={styles.textStyle}>Order now</Text>
              {/* <Text style={styles.textStyle}>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</Text> */}
            </Pressable>   

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
      {/* </View> */}
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
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
  model_image:{
    width: 260,
    height: 195,
    borderRadius: 60,
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
    backgroundColor: '#b3b3ff',
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
    marginBottom:7,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  model_title: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  model_value: {
    fontSize: 16,
    maxWidth: 320,
    color:'green',
    textAlign: 'center',
    paddingBottom: 7,

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

export default WishlistScreen;