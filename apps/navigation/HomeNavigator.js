import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {COLORS} from '../constants';
import {Home, Profile, Post} from '../screens';

import MessagesNavigator from './MessagesNavigator';

const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={'white'}
      inactiveColor={'grey'}
      barStyle={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 70,
        ...styles.shadow,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => ({
          tabBarIcon: ({focused}) => {
            return (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../asset/home.png')}
                  style={{
                    height: 28,
                    width: 28,
                    tintColor: focused ? COLORS.lightViolet : 'grey',
                    top: 10,
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={() => ({
          tabBarIcon: ({focused}) => {
            return (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../asset/plus.png')}
                  style={{
                    height: 28,
                    width: 28,
                    tintColor: focused ? COLORS.lightViolet : 'grey',
                    top: 10,
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        name="Message"
        component={MessagesNavigator}
        options={() => ({
          tabBarIcon: ({focused}) => {
            return (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../asset/message.png')}
                  style={{
                    height: 28,
                    width: 28,
                    tintColor: focused ? COLORS.lightViolet : 'grey',
                    top: 10,
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => ({
          tabBarIcon: ({focused}) => {
            return (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../asset/account.png')}
                  style={{
                    height: 28,
                    width: 28,
                    tintColor: focused ? COLORS.lightViolet : 'grey',
                    top: 10,
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 10,
  },
});

export default HomeNavigator;
