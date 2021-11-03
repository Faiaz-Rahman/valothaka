import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, DIM} from '../constants';

export default function Buttons({title, onPress, color = null, style}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {backgroundColor: color === null ? 'turquoise' : COLORS.lightViolet},
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DIM.height * 0.08,
    width: DIM.width * 0.8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
