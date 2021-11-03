import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StatusBar, ScrollView, RefreshControl} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {Card, PostText} from '../components';

import {DIM, COLORS} from '../constants';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const fetchPosts = async () => {
    const list = [];
    try {
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total post', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {
              userId,
              name,
              userImg,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              username: 'Agent ' + name,
              userImg: userImg,
              postTime: postTime.toDate().toString(),
              post: post,
              postImg: postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });
      setPosts(list);

      if (loading) setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    wait(3500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.lightViolet}
        barStyle="light-content"
      />
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.lightViolet, 'yellow', 'red', 'green']}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: DIM.height * 0.2,
          backgroundColor: '#f3f3f3',
        }}>
        {posts.map((item, index) => {
          if (item.postImg === '') {
            return <PostText key={index} item={item} />;
          } else {
            return <Card key={index} item={item} />;
          }
        })}
      </ScrollView>
    </>
  );
};

export default Home;
