import React from 'react';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';

import KeywordsScreen from './Keywords';
import CameraScreen from './Camera';

const StartStack = createStackNavigator();

function StartScreen() {
  return (
    <StartStack.Navigator initialRouteName="Keywords">
      <StartStack.Screen
        name="Keywords"
        component={KeywordsScreen}
        options={{ headerShown: false }}
      />
      <StartStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </StartStack.Navigator>
  );
}

export default StartScreen;
