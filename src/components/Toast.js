import React from 'react';
import {StyleSheet, Animated, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const Toast = ({message, type = 'info', onClose}) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      hide();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#4CAF50',
          icon: 'check-circle',
        };
      case 'error':
        return {
          backgroundColor: '#F44336',
          icon: 'error',
        };
      case 'warning':
        return {
          backgroundColor: '#FFC107',
          icon: 'warning',
        };
      default:
        return {
          backgroundColor: '#2196F3',
          icon: 'info',
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: typeStyles.backgroundColor,
          transform: [{translateY}],
          opacity,
        },
      ]}>
      <CustomIcon name={typeStyles.icon} size={24} color={COLORS.white} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={hide}>
        <CustomIcon name="close" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.white,
  },
});

export default Toast;