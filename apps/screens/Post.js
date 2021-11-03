import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {COLORS, DIM} from '../constants';

import {AuthContext} from '../navigation/AuthProvider';

export default function Post() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const {user} = useContext(AuthContext);

  const [myData, setMyData] = useState({
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
      })
      .catch(() => {
        console.log('Imagepicker closed!');
      });
  };

  const uploadImage = async () => {
    if (image) {
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      setUploading(true);
      setTransferred(0);

      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);

      task.on('state_changed', taskSnapshot => {
        // console.log(
        //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        // );
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL();

        setUploading(false);
        setImage(null);

        Alert.alert('Team ভালো থাকা', 'Uploaded successfully!');
        return url;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else return '';
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();

    await firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        name: myData.name,
        userImg: myData.userImg,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: 0,
        comments: 0,
      })
      .then(() => {
        console.log('Post Added!');
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f3f3f3',
          marginBottom: DIM.height * 0.11,
        }}>
        <View
          style={{
            // backgroundColor: 'white',
            paddingLeft: 27,
            backgroundColor: COLORS.lightViolet,
            elevation: 0,
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
        {image && (
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              paddingTop: 10,
              backgroundColor: 'white',
              width: DIM.width,
              alignItems: 'center',
              borderRadius: 20,
              overflow: 'hidden',
              elevation: 0,
            }}>
            <Image
              source={{uri: image}}
              style={{
                height: DIM.height * 0.33,
                width: DIM.width * 0.85,
                borderRadius: 10,
              }}
            />
            {uploading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{transferred}%</Text>
                <ActivityIndicator size="large" />
              </View>
            ) : null}
          </KeyboardAvoidingView>
        )}
        <View style={styles.container}>
          <TextInput
            placeholder="What's on your mind?"
            style={styles.textInput}
            multiline
            numberOfLines={4}
            onChangeText={text => setPost(text)}
          />
        </View>

        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Post it!"
            onPress={submitPost}>
            <AntDesign name="checkcircle" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Select image from gallery"
            onPress={chooseImageFromLibrary}>
            <FontAwesome name="image" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 21,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
