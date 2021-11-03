import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import {COLORS} from '../constants';

export default OnboardingScreen = ({navigation}) => {
  const skip = ({...props}) => {
    return (
      <TouchableOpacity
        style={{
          height: 45,
          width: 60,
          marginLeft: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.lightViolet,
        }}
        {...props}>
        <Text style={{fontSize: 17, color: 'white'}}>Back</Text>
      </TouchableOpacity>
    );
  };

  const next = ({...props}) => {
    return (
      <TouchableOpacity
        style={{
          height: 45,
          width: 60,
          borderRadius: 10,
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.lightViolet,
        }}
        {...props}>
        <Text style={{fontSize: 17, color: 'white'}}>Next</Text>
      </TouchableOpacity>
    );
  };

  const done = ({...props}) => {
    return (
      <TouchableOpacity
        style={{
          height: 45,
          width: 60,
          marginRight: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.lightViolet,
        }}
        {...props}>
        <Text style={{fontSize: 17, color: 'white'}}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar hidden={true} />
      <Onboarding
        NextButtonComponent={next}
        SkipButtonComponent={skip}
        DoneButtonComponent={done}
        onDone={() => navigation.navigate('Login')}
        onSkip={() => navigation.navigate('Login')}
        pages={[
          {
            backgroundColor: '#FFF',
            image: (
              <Image
                source={require('../asset/cannabis.jpg')}
                style={{height: 300, width: 300}}
                resizeMode="cover"
              />
            ),
            title: 'Team ভালো থাকা',
            subtitle:
              'ওর ওটা আছে, আমার নেই কেন’—এ ধরনের চিন্তা আপনার নিজ মানসিক শক্তিকেই কমিয়ে দেয়।',
          },
          {
            backgroundColor: '#FF7F7F',
            image: (
              <Image
                source={require('../asset/cannabis1.jpg')}
                style={{height: 300, width: 300, borderRadius: 20}}
              />
            ),
            title: 'Team ভালো থাকা',
            subtitle: 'সবার আগে নিজেকে ভালোবাসতে শিখুন।',
          },
        ]}
      />
    </>
  );
};
