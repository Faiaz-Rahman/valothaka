import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS, DIM} from '../constants';

export default function MessageItem({item, onPress}) {
  return (
    <TouchableOpacity
      style={{
        paddingLeft: 10,
        paddingTop: 5,
      }}
      onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            height: '100%',
            width: '22%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 65, width: 65, borderRadius: 35}}
            source={{
              uri: item.userImg,
            }}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '78%',
            //   backgroundColor: 'red',
            paddingLeft: 10,
            paddingTop: 14,
          }}>
          <Text
            style={{
              fontFamily: 'BebasNeue-Regular',
              fontSize: 21,
              color: COLORS.lightBlack,
            }}>
            {item.username}
          </Text>
          <Text style={{marginTop: 5, fontStyle: 'italic'}}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: DIM.width,
    backgroundColor: COLORS.lavender,
    flexDirection: 'row',
    borderRadius: 10,
  },
});
