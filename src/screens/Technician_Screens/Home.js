import 'react-native-gesture-handler';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React, {useContext} from 'react';
import {Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from "../../AuthProvider";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Products from './products';

function MyDrawer() {

const { logout } = useContext(AuthContext)
  const Drawer = createDrawerNavigator();
  const defaultScreenOpt = {
    headerRight: ()=>(<TouchableOpacity
      onPress={() => logout()}
      style={{marginRight: 10, backgroundColor:'purple', padding: 6, borderRadius: 15}}
      >
      <Text style={{color: 'white', fontSize: 19, fontStyle:'italic'}}>logout</Text>
      </TouchableOpacity>
    ),
    headerStyle: {backgroundColor: 'transparent',},
    headerBackground: () => (
      <LinearGradient
      colors={['#f2ff', '#F44336']}
      style={{ flex:1}}
      start={{x:0, y:0}}
      end={{x:1, y:0}}
      />
    ),
    headerTintColor: 'green',
    paddingleft:120,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
    },
  };





  return (
   
    <Drawer.Navigator     screenOptions={defaultScreenOpt}    >
      <Drawer.Screen name="Home" component={Products} />
      <Drawer.Screen name="Cart" component={Products} />
      <Drawer.Screen name="Wishlist" component={Products} />
      <Drawer.Screen name="Notifications" component={Products} />
      <Drawer.Screen name="Profddile" component={Products} />
    </Drawer.Navigator>
    
  );
}
export default function Dash_Tech() {
  return (
    <NativeBaseProvider >
        <MyDrawer />
    </NativeBaseProvider>
  );
}