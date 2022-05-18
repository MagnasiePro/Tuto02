import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapUser from '../components/MapUser';

const UserProfile = ({route}) => {
  const {user} = route?.params;

  return (
    <View style={local.container}>
      <Text>{user?.name}</Text>
      <Text>{user?.phone}</Text>
      <Text>{user?.website}</Text>
      <Text>{user?.company.name}</Text>
      <MapUser style={local.map} user={user} />
    </View>
  );
};

const local = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 400,
  },
});

export default UserProfile;
