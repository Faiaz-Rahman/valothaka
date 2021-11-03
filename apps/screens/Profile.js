import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import {Buttons} from '../components';
import {COLORS, DIM} from '../constants';

const Profile = () => {
  const {logout, user} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [myData, setMyData] = useState({
    id: '',
    name: '',
    userImg: '',
    email: '',
    createdAt: '',
  });

  const fetchUser = async () => {
    try {
      await firestore()
        .collection('users')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setMyData({
              id: doc.id,
              name: doc.data().name,
              userImg: doc.data().userImg,
              email: doc.data().email,
              createdAt: doc.data().createdAt.toDate().toString(),
            });
          });
        })
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const chooseImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // console.log(image);
        const imageUri = image.path;
        setImage(imageUri);

        // submitPost(imageUri);
      })
      .catch(() => {
        console.log('Imagepicker closed!');
      });
  };

  useEffect(() => {
    fetchUser();
    // console.log(myData.id);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.lightViolet}
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 27,
          backgroundColor: COLORS.lightViolet,
        }}>
        <Text
          style={{
            fontSize: 27,
            fontFamily: 'Galada-Regular',
            paddingTop: 10,
            color: 'white',
          }}>
          ভালো থাকা
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 15,
          // justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {myData.userImg !== 'none' ? (
          <Image
            source={{uri: image}}
            style={{
              height: 160,
              width: 160,
              borderRadius: 90,
              borderColor: COLORS.lightViolet,
              borderWidth: 4,
            }}
          />
        ) : (
          <Image
            source={require('../asset/account.png')}
            style={{
              height: 160,
              width: 160,
              borderRadius: 90,
              borderColor: COLORS.lightViolet,
              borderWidth: 4,
            }}
          />
        )}
        <TouchableOpacity
          onPress={chooseImageFromLibrary}
          style={{
            backgroundColor: '#fff',
            height: 40,
            width: 40,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 130,
            borderColor: COLORS.lightViolet,
            borderWidth: 3,
            right: DIM.width * 0.33,
          }}>
          <Entypo name="camera" size={25} color={COLORS.lightViolet} />
        </TouchableOpacity>
        <View
          style={{
            marginTop: 15,
            // backgroundColor: '#f1f1f1',
            height: DIM.height * 0.09,
            width: DIM.width * 0.85,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomEndRadius: 15,
            borderTopLeftRadius: 15,
            flexDirection: 'row',
          }}>
          <AntDesign
            name="user"
            size={25}
            color={'slategrey'}
            style={{marginLeft: 25}}
          />
          <Text
            style={{
              fontFamily: 'RampartOne-Regular',
              fontSize: 30,
              flex: 1,
              marginLeft: 40,
            }}>
            {'AGENT ' + myData.name}
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: '#f1f1f1',
            height: DIM.height * 0.09,
            width: DIM.width * 0.85,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomEndRadius: 15,
            borderTopLeftRadius: 15,
          }}>
          <Ionicons
            name="mail"
            color={COLORS.lightViolet}
            size={35}
            style={{
              marginLeft: DIM.width * 0.05,
              marginRight: DIM.width * 0.05,
            }}
          />
          <Text
            style={{
              fontFamily: 'BebasNeue-Regular',
              fontSize: 22,
              flex: 1,
            }}>
            {myData.email}
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: '#f1f1f1',
            height: DIM.height * 0.09,
            width: DIM.width * 0.85,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomEndRadius: 15,
            borderTopLeftRadius: 15,
            flexDirection: 'row',
          }}>
          <Feather
            name="user-check"
            color={COLORS.lightViolet}
            size={35}
            style={{
              marginLeft: DIM.width * 0.05,
              marginRight: DIM.width * 0.05,
            }}
          />
          <Text
            style={{
              fontFamily: 'BebasNeue-Regular',
              fontSize: 22,
              flex: 1,
            }}>
            {'USER SINCE: ' + myData.createdAt.substring(0, 15)}
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: '#f1f1f1',
            height: DIM.height * 0.09,
            width: DIM.width * 0.85,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomEndRadius: 15,
            borderTopLeftRadius: 15,
            flexDirection: 'row',
          }}>
          <FontAwesome5
            name="radiation"
            size={25}
            color={COLORS.lightViolet}
            style={{
              marginLeft: DIM.width * 0.05,
              marginRight: DIM.width * 0.08,
            }}
          />
          <Text
            style={{
              fontFamily: 'BebasNeue-Regular',
              fontSize: 22,
              flex: 1,
            }}>
            {'See you not for mind!'}
          </Text>
        </View>
        <Buttons
          style={{marginTop: 15}}
          title="Log out"
          onPress={() => {
            logout();
          }}
          color={COLORS.lightViolet}
        />
      </View>
    </>
  );
};

export default Profile;
