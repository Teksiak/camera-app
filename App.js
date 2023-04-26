import { StyleSheet, StatusBar, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Views/Main';
import Gallery from './components/Views/Gallery';
import BigPhoto from './components/Views/BigPhoto';
import CameraScreen from './components/Views/CameraScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Gallery" component={Gallery} options={{
          headerShown: false
        }} />
        <Stack.Screen name="BigPhoto" component={BigPhoto} options={{
          headerShown: false
        }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
