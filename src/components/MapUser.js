import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const MapUser = ({style, user}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={style}
      mapType={'hybrid'}
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      initialRegion={{
        latitude: parseFloat(user?.address?.geo?.lat),
        longitude: parseFloat(user?.address?.geo?.lng),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{
          latitude: parseFloat(user?.address?.geo?.lat),
          longitude: parseFloat(user?.address?.geo?.lng),
        }}
      />
    </MapView>
  );
};

export default MapUser;
