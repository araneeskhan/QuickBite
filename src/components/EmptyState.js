import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import LottieView from 'lottie-react-native';

const EmptyState = ({message, animation}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  message: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EmptyState;