import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './screens/Start';
import MainScreen from './screens/Main';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
