import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from "../../AuthProvider";


export default function Profile() {
  const { user, logout } = useContext(AuthContext)

  return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Technician </Text>
      <Text>User   :    {user.email}</Text>
      <Text>User from Server   :   {user.name}</Text>
      <Text>User role   :   {user.role}</Text>
      <Text>User id   :   {user.id}</Text>
    </View>

  );
}