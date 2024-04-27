import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  FONTFAMILY,
} from '../theme/theme';

const Payment = ({price, buttonPressHandler, buttonTitle}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <View style={styles.CurrencyPriceContainer}>
          <Text style={styles.PriceText}>{price.currency}</Text>
          <Text style={styles.PriceText}>{price.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.PayButton}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  CurrencyPriceContainer: {
    flexDirection: 'row',
    marginHorizontal:20,
  },
  PriceContainer: {
    alignItems: 'center',
    width: 160,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 14,
    color: 'black',
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 24,
    color: 'black',
  },
  Price: {
    color: 'black',
  },
  PayButton: {
    backgroundColor: '#FDBD00',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36 * 2,
    borderRadius: 20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 18,
    color: 'white',
  },
});

export default Payment;
