import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Map from '../components/Map';
import {getUsers} from '../utils/api';

const Home = ({navigation, route}) => {
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    getUsers().then(res => setUsersList(res));
  }, []);

  return (
    <View style={local.mapContainer}>
      <Map navigation={navigation} usersList={usersList} />
    </View>
  );
};

const local = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});

export default Home;
