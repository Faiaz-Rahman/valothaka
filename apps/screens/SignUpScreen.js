import React, {useContext, useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Modal,
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {CustomTextInput, Buttons} from '../components';
import {COLORS, DIM} from '../constants';
import {AuthContext} from '../navigation/AuthProvider';

const headerText = 'Write down 2 secret codes.';

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifier, setVerifier] = useState();
  const [verified, setVerified] = useState(false);
  const [text, setText] = useState('VERIFY');

  const [modal, setModal] = useState(false);

  const {register} = useContext(AuthContext);

  const verify = () => {
    const str = verifier.replace(/\s+/g, '');
    // console.log(str);

    if (str === '00700' || str === '00007') {
      setVerified(true);
      setText('VERIFIED!');
      setTimeout(() => setModal(false), 2000);
    } else {
      setText('FAILED!');
      setTimeout(() => setModal(false), 2000);
    }
  };

  return (
    <>
      <Image
        source={require('../asset/celebration.gif')}
        style={{height: 220, width: DIM.width}}
      />
      {modal && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => {
            setModal(false);
          }}>
          <View style={styles.modalStyle}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontFamily: 'BebasNeue-Regular',
              }}>
              Are you a member of {'\n'}Team ভালো থাকা ?
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 27,
                marginTop: 10,
                fontFamily: 'BebasNeue-Regular',
                color: COLORS.lightViolet,
              }}>
              {headerText}
            </Text>
            <View style={styles.textInput}>
              <TextInput
                placeholder="Put spaces between them"
                style={{fontSize: 18, fontStyle: 'italic'}}
                onChangeText={text => setVerifier(text)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={verify}>
              <Text
                style={{
                  fontSize: 27,
                  fontFamily: 'BebasNeue-Regular',
                  color: COLORS.lightViolet,
                }}>
                {text}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContainer}>
        <CustomTextInput
          text="First Name"
          onChangeText={text => setFirstName(text)}
        />
        <CustomTextInput
          text="Enter your email"
          iconName="mail"
          onChangeText={text => setEmail(text)}
        />
        <CustomTextInput
          text="New password"
          iconName="key"
          pass={1}
          color={COLORS.lightViolet}
          onChangeText={text => setPassword(text)}
        />
        <CustomTextInput
          text="Re-type new password"
          iconName="key"
          pass={1}
          onChangeText={text => setConfirmPassword(text)}
          color={COLORS.lightViolet}
        />
        <Buttons
          title="Confirm your identity"
          color="paint"
          onPress={() => setModal(true)}
        />
        <Buttons
          title="Sign up"
          color="paint"
          onPress={() => {
            if (password === confirmPassword && verified) {
              register(email, password, firstName);
            } else {
              Alert.alert(
                'Team ভালো থাকা',
                "Passwords don't match! or, verification failure!",
              );
            }
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 20,
    width: DIM.width,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 500,
  },
  modalStyle: {
    paddingTop: 15,
    height: DIM.height * 0.5,
    width: DIM.width * 0.8,
    backgroundColor: 'white',
    top: '25%',
    bottom: '25%',
    left: '10%',
    right: '10%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderRightColor: 'green',
    borderLeftColor: COLORS.lightViolet,
    borderTopColor: 'tomato',
    borderBottomColor: 'yellow',
    borderWidth: 10,
    opacity: 0.75,
    elevation: 4,
  },
  textInput: {
    backgroundColor: COLORS.boxColor,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: COLORS.lightViolet,
    borderWidth: 2,
  },
  button: {
    marginTop: 14,
    alignSelf: 'center',
    height: 50,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: COLORS.lightViolet,
    borderWidth: 3,
  },
});
