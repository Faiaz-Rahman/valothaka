import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {COLORS, DIM} from '../constants';

export default function MessagesDetails({route, navigation}) {
  const userImg = route.params.item.userImg;
  const username = route.params.item.username;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.lightViolet,
          },
          left: {
            backgroundColor: COLORS.lavender,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome
        name="angle-double-down"
        size={25}
        color={COLORS.lightViolet}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View
          style={{
            justifyContent: 'center',
            paddingRight: 10,
            height: '100%',
            width: 40,
          }}>
          <FontAwesome
            name="paper-plane"
            size={25}
            color={COLORS.lightViolet}
          />
        </View>
      </Send>
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.lightViolet}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={30}
            color={'white'}
            style={{
              marginRight: 7,
            }}
          />
        </TouchableOpacity>
        <Image
          source={{uri: userImg}}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: 'BebasNeue-Regular',
            fontSize: 25,
            color: 'white',
          }}>
          {username}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingBottom: DIM.height * 0.15,
        }}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: 'white',
    paddingLeft: 10,
    backgroundColor: COLORS.lightViolet,
    elevation: 0,
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 27,
    fontFamily: 'Galada-Regular',
    paddingTop: 10,
    color: 'white',
  },
});
