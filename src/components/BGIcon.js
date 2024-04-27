import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon'

const BGIcon = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBG , {backgroundColor: BGColor }]}>
        <CustomIcon  name ={name} color={color} size={size} /> 

    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
