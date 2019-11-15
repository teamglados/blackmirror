import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Noop = () => {
  return (
    <View>
      <Text>Placeholder</Text>
    </View>
  );
};

function MainScreen() {
  return (
    <Wrapper>
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="group" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <EvilIcons name="user" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Groups"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={28}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="notifications" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <Feather name="menu" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
`;

export default MainScreen;
