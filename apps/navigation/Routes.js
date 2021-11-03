import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

import HomeNavigator from './HomeNavigator';

import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';

// import {COLORS} from '../constants';

// import LottieView from 'lottie-react-native';

const Routes = () => {
  const {user, setUser, visible} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    // return (
    // <>
    //   <StatusBar hidden />
    //   <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    //     {/* <ActivityIndicator size="large" color={COLORS.lightViolet} /> */}
    //     <LottieView
    //       source={require('../asset/13498-new-year-party.json')}
    //       autoPlay
    //       loop
    //     />
    //   </View>
    // </>
    // );
    return null;
  } else {
    return (
      <NavigationContainer>
        {user ? <HomeNavigator /> : <AuthStack />}
      </NavigationContainer>
    );
  }
};

export default Routes;
