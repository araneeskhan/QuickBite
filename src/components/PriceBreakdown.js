import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';

const PriceBreakdown = ({
  subtotal,
  deliveryFee,
  tax,
  discount,
  total,
  currency = '$',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{currency}{subtotal.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>{currency}{deliveryFee.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tax</Text>
        <Text style={styles.value}>{currency}{tax.toFixed(2)}</Text>
      </View>

      {discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, styles.discountText]}>Discount</Text>
          <Text style={[styles.value, styles.discountText]}>
            -{currency}{discount.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <View>
          <Text style={styles.totalValue}>
            {currency}{total.toFixed(2)}
          </Text>
          <Text style={styles.taxNote}>Includes tax</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
  },
  value: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  discountText: {
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.light,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDark,
  },
  taxNote: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    textAlign: 'right',
    marginTop: 2,
  },
});

export default PriceBreakdown;