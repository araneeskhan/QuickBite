import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const FoodCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={item.imagelink_square} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.price}>
          From ${Math.min(...item.prices.map(p => p.price))}
        </Text>
      </View>
      <CustomIcon name="chevron-right" size={24} color={COLORS.grey} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  type: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDark,
    marginTop: 4,
  },
});

export default FoodCard;