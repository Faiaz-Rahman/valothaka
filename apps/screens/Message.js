import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';

import {COLORS, DIM} from '../constants';

import {MessageItem} from '../components';

const messages = [
  {
    id: '1',
    username: 'Frank Martin',
    userImg:
      'https://www.looper.com/img/gallery/the-untold-truth-of-jason-statham/intro-1614198941.jpg',
    message: 'Hi! I am Jason.',
  },
  {
    id: '2',
    username: 'Jason Statham',
    userImg:
      'https://www.looper.com/img/gallery/the-untold-truth-of-jason-statham/intro-1614198941.jpg',
    message: 'Hello, there!',
  },
  {
    id: '3',
    username: 'Luke Wright',
    userImg:
      'https://www.looper.com/img/gallery/the-untold-truth-of-jason-statham/intro-1614198941.jpg',
    message: 'This is Capt. Soap MacTavish, 22nd SAS',
  },
];

export default function Message({navigation}) {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.lightViolet}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>ভালো থাকা</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {messages.map((item, index) => {
          return (
            <MessageItem
              key={index}
              item={item}
              onPress={() => {
                navigation.navigate('MessagesDetails', {item: item});
              }}
            />
          );
        })}
        <Text style={{textAlign: 'center', marginTop: 30}}>
          Under Construction
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: 'white',
    paddingLeft: 27,
    backgroundColor: COLORS.lightViolet,
    elevation: 0,
  },
  headerText: {
    fontSize: 27,
    fontFamily: 'Galada-Regular',
    paddingTop: 10,
    color: 'white',
  },
  scrollView: {
    backgroundColor: '#F4F9F9',
    paddingBottom: DIM.height * 0.2,
  },
});
