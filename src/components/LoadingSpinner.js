import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';

const LoadingSpinner = ({
  size = 'large',
  color = COLORS.primaryDark,
  text,
  fullScreen = false,
  overlay = false,
}) => {
  const Container = fullScreen ? View : React.Fragment;
  const containerProps = fullScreen ? {style: styles.fullScreen} : {};

  return (
    <Container {...containerProps}>
      <View
        style={[
          styles.container,
          overlay && styles.overlay,
          !fullScreen && styles.embedded,
        ]}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 999,
  },
  embedded: {
    padding: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.grey,
    textAlign: 'center',
  },
});

export default LoadingSpinner;