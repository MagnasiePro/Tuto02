import React, {useRef, useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Map = ({navigation, usersList}) => {
  const mapRef = useRef();
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const HandlePermission = () => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation(position?.coords);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true},
    );
  };

  useEffect(() => {
    userLocation &&
      setMapRegion({
        ...mapRegion,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
      });
  }, [userLocation]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={local.map}
      showsUserLocation
      showsMyLocationButton
      mapType={'hybrid'}
      region={mapRegion}
      onMapReady={() => HandlePermission()}>
      {usersList &&
        usersList?.length &&
        usersList?.map((marker, index) => {
          return (
            <Marker
              key={index}
              identifier={String(marker?.id)}
              onPress={event =>
                navigation?.navigate('UserProfile', {
                  user: usersList?.find(
                    element => String(element.id) === event?.nativeEvent?.id,
                  ),
                })
              }
              coordinate={{
                latitude: parseFloat(marker?.address?.geo?.lat),
                longitude: parseFloat(marker?.address?.geo?.lng),
              }}
            />
          );
        })}
    </MapView>
  );
};

const local = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
