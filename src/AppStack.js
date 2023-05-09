
import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View } from "react-native";
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const Stack = createStackNavigator();

function DashboardScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setName(response.data.name);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  console.log('User:::', user)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard Screen Logged In View</Text>
      <Text>User   :    {user.email}</Text>
      <Text>User from Server   :   {name}</Text>
      <Text>User role   :   {user.created_at}</Text>
      <Text>User id   :   {user.id}</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Text>User: {user.email}</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('test Dashboard')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="test Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}
