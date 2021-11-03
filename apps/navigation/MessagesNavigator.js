import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Message, MessagesDetails} from '../screens';

const Stack = createStackNavigator();

const MessagesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Messages"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Messages" component={Message} />
      <Stack.Screen name="MessagesDetails" component={MessagesDetails} />
    </Stack.Navigator>
  );
};

export default MessagesNavigator;
