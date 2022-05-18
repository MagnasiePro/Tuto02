import {Platform} from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    console.log(
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
        result => result,
      ),
    );
  } else {
    console.log(
      await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]).then(statuses => statuses),
    );
  }
};

export const checkLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return Promise.resolve(
      await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              return false;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              requestLocationPermission();
              return true;
            case RESULTS.LIMITED:
              console.log(
                'The permission is limited: some actions are possible',
              );
              return false;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              return true;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              return false;
          }
        })
        .catch(error => {
          console.error('Oh oh, there is a problem');
        }),
    );
  } else {
    return Promise.resolve(
      await checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ])
        .then(statuses => {
          switch (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              return false;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              requestLocationPermission();
              return true;
            case RESULTS.LIMITED:
              console.log(
                'The permission is limited: some actions are possible',
              );
              return false;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              return true;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              return false;
          }
        })
        .catch(error => {
          console.error('Oh oh, there is a problem');
        }),
    );
  }
};
