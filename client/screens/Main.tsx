import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

import ChatScreen from './Chat';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';
import CommentsScreen from './Comments';

const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Noop = () => {
  return (
    <View>
      <Text>Placeholder</Text>
    </View>
  );
};

const FeedStackGroup = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      <FeedStack.Screen name="FeedComments" component={CommentsScreen} />
    </FeedStack.Navigator>
  );
};

const ProfileStackGroup = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name="ProfileComments" component={CommentsScreen} />
    </ProfileStack.Navigator>
  );
};

function MainScreen() {
  return (
    <Wrapper>
      <Tab.Navigator initialRouteName="FeedTab">
        <Tab.Screen
          name="FeedTab"
          component={FeedStackGroup}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="FriendsTab"
          component={Noop}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="group" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackGroup}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <EvilIcons name="user" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="GroupsTab"
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
          name="NotificationsTab"
          component={ChatScreen}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="notifications" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
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
