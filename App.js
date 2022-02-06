/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Dashboard from './src/component/Dashboard';

const App = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
     <Dashboard></Dashboard>
    </ScrollView>
  );
};


export default App;
