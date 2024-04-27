import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const PaymentMethod = ({paymentMode, name, icon, isIcon}) => {
  return (
    <View style={styles.PaymentCardContainer}>
      {isIcon ? (
        <View
          
          style={styles.LinearGradientWallet}>
          <View style={styles.WalletRow}>
            <CustomIcon
              name={'wallet'}
              color={'orange'}
              size={30}
            />
            <Text style={styles.PaymentTitle}>{name}</Text>
          </View>
        </View>
      ) : (
        <View
         style={styles.LinearGradientRegular}
        >
          <Image source={icon} style={styles.PaymentImage} />
          <Text style={styles.PaymentTitle}>{name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  PaymentCardContainer: {
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#F7C762',
  },
  LinearGradientWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 15,
  },
  WalletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  LinearGradientRegular: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 15,
  },
  PaymentTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: 'black',
  },
  PaymentPrice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 16,
    color: 'black',
  },
    PaymentImage: {
      borderRadius:5,
    height: 30,
    width: 30,
  },
});

export default PaymentMethod;
