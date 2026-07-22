import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const OrderCard = ({order, onPress}) => {
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#4CAF50';
      case 'processing':
        return '#FFC107';
      case 'cancelled':
        return '#F44336';
      default:
        return COLORS.grey;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <View style={[styles.status, {backgroundColor: getStatusColor(order.status)}]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <CustomIcon name="calendar" size={20} color={COLORS.grey} />
          <Text style={styles.infoText}>{order.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <CustomIcon name="location" size={20} color={COLORS.grey} />
          <Text style={styles.infoText} numberOfLines={1}>{order.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <CustomIcon name="wallet" size={20} color={COLORS.grey} />
          <Text style={styles.infoText}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.itemCount}>
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </Text>
        <CustomIcon name="chevron-right" size={24} color={COLORS.grey} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.white,
  },
  content: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.light,
    paddingVertical: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.dark,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  itemCount: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.grey,
  },
});

export default OrderCard;