import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Buttons, CustomTextInput} from '../components';
import {DIM, COLORS} from '../constants';
import {AuthContext} from '../navigation/AuthProvider';

import LottieView from 'lottie-react-native';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const {login, animShow, setAnimShow} = useContext(AuthContext);

  const interval = () => {
    return (
      <>
        <StatusBar hidden />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <LottieView source={require('../asset/friends.json')} autoPlay loop />
      </>
    );
  };

  return (
    <>
      {animShow && interval()}
      {!animShow && (
        <View style={styles.container}>
          <StatusBar hidden />
          <View
            style={{
              height: 300,
              width: DIM.width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LottieView
              source={require('../asset/13498-new-year-party.json')}
              autoPlay
              loop
            />
            <Text
              style={{
                marginTop: 200,
                fontSize: 26,
                fontWeight: 'bold',
              }}>
              Team ভালো থাকা
            </Text>
          </View>
          <CustomTextInput
            text="Enter your email"
            iconName="mail"
            onChangeText={text => setEmail(text)}
          />
          <CustomTextInput
            text="Enter password"
            iconName="key"
            pass={1}
            onChangeText={text => setPass(text)}
            color={'turquoise'}
          />
          <Buttons
            title="Login"
            onPress={() => {
              setAnimShow(true);
              setTimeout(() => {
                login(email, pass);
                // setAnimShow(false);
              }, 3000);
            }}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                fontStyle: 'italic',
                marginRight: 8,
                fontWeight: '700',
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Sign up');
              }}>
              <Text
                style={{fontSize: 19, color: 'turquoise', fontWeight: '700'}}>
                Sign Up !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
