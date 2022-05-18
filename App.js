import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/routes/MainNavigator';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
