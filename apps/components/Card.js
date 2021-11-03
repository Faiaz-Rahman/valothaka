import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS, DIM} from '../constants';
import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';

export default function Card({item}) {
  // const ttime = item.postTime;
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const {user} = useContext(AuthContext);

  // let year = ttime.substring(0, 15);

  const [myData, setMyData] = useState({
    name: '',
    userImg: '',
    email: '',
    createdAt: '',
  });

  const handleLike = likes => {
    const ref = item.id;
    firestore()
      .collection('posts')
      .doc(ref)
      .update({
        likes: likes + 1,
      })
      .then(() => console.log('updated'))
      .catch(e => console.log(e));
  };

  const handleUnlike = likes => {
    const ref = item.id;
    firestore()
      .collection('posts')
      .doc(ref)
      .update({
        likes: likes - 1,
      })
      .then(() => console.log('removed'))
      .catch(e => console.log(e));
  };

  const handleComment = comments => {
    const ref = item.id;
    firestore()
      .collection('posts')
      .doc(ref)
      .update({
        comments: comments + 1,
      })
      .then(() => console.log('updated'))
      .catch(e => console.log(e));
  };

  const handleDeleteComment = comments => {
    const ref = item.id;
    firestore()
      .collection('posts')
      .doc(ref)
      .update({
        comments: comments - 1,
      })
      .then(() => console.log('removed'))
      .catch(e => console.log(e));
  };

  const fetchUser = async () => {
    try {
      await firestore()
        .collection('users')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setMyData({
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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View
      style={{
        height: DIM.height * 0.75,
        width: DIM.width,
        // backgroundColor: '#f6f6f6',
        backgroundColor: '#f1f1f1',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
        marginBottom: 15,
      }}>
      <View
        style={{
          height: DIM.height * 0.12,
          width: DIM.width,
          //   backgroundColor: 'red',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {myData.userImg == 'none' ? (
          <Image
            resizeMode="cover"
            style={{height: 60, width: 60, borderRadius: 30}}
            source={require('../asset/account.png')}
          />
        ) : (
          <Image
            resizeMode="cover"
            style={{height: 60, width: 60, borderRadius: 30}}
            source={{
              uri: item.userImg,
            }}
          />
        )}
        <View
          style={{
            height: '100%',
            width: '60%',
            // backgroundColor: 'white',
            paddingTop: 24,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontFamily: 'BebasNeue-Regular',
              fontSize: 23,
              color: '#696969',
            }}>
            {item.username}
          </Text>
          <Text style={{fontSize: 15, color: '#939393', fontStyle: 'italic'}}>
            {moment(item.postTime).fromNow()}
            {/* {moment(year).fromNow()} */}
          </Text>
        </View>
      </View>
      <View style={{paddingLeft: 4}}>
        <Text style={{fontFamily: 'RampartOne-Regular', fontSize: 19}}>
          {item.post}
        </Text>
      </View>
      <View
        style={{flex: 1, overflow: 'hidden', borderRadius: 15, marginTop: 10}}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{
            uri: item.postImg,
          }}
        />
      </View>
      <View
        style={{
          height: 50,
          width: '100%',
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (liked === false) {
              handleLike(item.likes);
            } else {
              handleUnlike(item.likes);
            }
            setLiked(!liked);
          }}
          style={{
            width: '45%',
            backgroundColor: liked ? COLORS.lightViolet : 'white',
            height: '100%',
            borderRadius: 30,
            flexDirection: 'row',
            justifyContent: 'center' && 'space-evenly',
            alignItems: 'center',
            elevation: 10,
          }}>
          <FontAwesome5
            name="hand-middle-finger"
            size={25}
            color={liked ? 'white' : COLORS.lightViolet}
          />
          <Text
            style={{
              fontSize: 17,
              color: liked ? 'white' : 'black',
            }}>
            {item.likes != 0 ? item.likes + 'টা 00' : 'শূন্যটা  00'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (commented === false) {
              handleComment(item.comments);
            } else {
              handleDeleteComment(item.comments);
            }
            setCommented(!commented);
          }}
          style={{
            width: '45%',
            backgroundColor: commented ? COLORS.lightViolet : 'white',
            height: '100%',
            borderRadius: 30,
            justifyContent: 'center' && 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            elevation: 10,
          }}>
          <MaterialCommunityIcons
            name="hand-okay"
            size={35}
            color={commented ? 'white' : COLORS.lightViolet}
          />
          <Text
            style={{
              fontSize: 17,
              color: commented ? 'white' : 'black',
            }}>
            {item.comments != 0 ? item.comments + 'টা 007' : 'শূন্যটা  007'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
