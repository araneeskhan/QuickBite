import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image source={require('../assets/images/profilepic.png')} style={styles.Image} />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  ImageContainer: {
    height: 46,
    width: 46,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#F7C762',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: 46,
    width: 46,
  },
});
