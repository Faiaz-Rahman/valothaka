import React, {createContext, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [animShow, setAnimShow] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        animShow,
        setAnimShow,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            Alert.alert(
              'Team ভালো থাকা',
              "You don't have an account ! Create one now ! or, maybe your email or password is incorrect !",
            );
            setAnimShow(false);
          }
        },
        register: async (email, password, firstName) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);

            await firestore()
              .collection('users')
              .add({
                userId: auth().currentUser.uid,
                name: firstName,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: 'none',
                email: auth().currentUser.email,
              })
              .then(() => console.log('User added !'))
              .catch(error => console.log(error));

            await auth().signOut();

            Alert.alert(
              'Team ভালো থাকা',
              'Successfully created your account ! Sign in to continue !',
            );
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
