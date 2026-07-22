import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const PaymentMethodCard = ({
  method,
  isSelected,
  onSelect,
  onDelete,
  isDefault,
}) => {
  const getCardIcon = type => {
    switch (type.toLowerCase()) {
      case 'visa':
        return require('../assets/images/visa.png');
      case 'mastercard':
        return require('../assets/images/mastercard.png');
      default:
        return require('../assets/images/card.png');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onSelect}>
      <View style={styles.content}>
        <Image source={getCardIcon(method.type)} style={styles.cardIcon} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardNumber}>
            •••• {method.lastFourDigits}
          </Text>
          <Text style={styles.expiryDate}>
            Expires {method.expiryMonth}/{method.expiryYear}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
        {!isDefault && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <CustomIcon name="delete" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedContainer: {
    borderColor: COLORS.primaryDark,
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  cardInfo: {
    marginLeft: 12,
  },
  cardNumber: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  expiryDate: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  defaultBadge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.white,
  },
  deleteButton: {
    padding: 5,
  },
});

export default PaymentMethodCard;