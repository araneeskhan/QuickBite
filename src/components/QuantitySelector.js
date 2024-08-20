import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 1,
  maxQuantity = 99,
  size = 'medium',
}) => {
  const isMinimum = quantity <= minQuantity;
  const isMaximum = quantity >= maxQuantity;

  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          container: 32,
          button: 24,
          icon: 16,
          text: 14,
        };
      case 'large':
        return {
          container: 48,
          button: 36,
          icon: 24,
          text: 18,
        };
      default:
        return {
          container: 40,
          button: 32,
          icon: 20,
          text: 16,
        };
    }
  };

  const sizeConfig = getSize();

  return (
    <View style={[styles.container, {height: sizeConfig.container}]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: sizeConfig.button,
            height: sizeConfig.button,
          },
          isMinimum && styles.disabledButton,
        ]}
        onPress={onDecrement}
        disabled={isMinimum}>
        <CustomIcon
          name="minus"
          size={sizeConfig.icon}
          color={isMinimum ? COLORS.grey : COLORS.dark}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.quantity,
          {
            fontSize: sizeConfig.text,
            minWidth: sizeConfig.container,
          },
        ]}>
        {quantity}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            width: sizeConfig.button,
            height: sizeConfig.button,
          },
          isMaximum && styles.disabledButton,
        ]}
        onPress={onIncrement}
        disabled={isMaximum}>
        <CustomIcon
          name="plus"
          size={sizeConfig.icon}
          color={isMaximum ? COLORS.grey : COLORS.dark}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.light,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
});

export default QuantitySelector;