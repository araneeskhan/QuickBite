import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const Item = ({
  id,
  name,
  imagelink_square,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['orange', 'white']}
          style={styles.CartItemLinearGradient}>
          <View style={styles.CartItemRow}>
            <Image source={imagelink_square} style={styles.CartItemImage} />
            <View style={styles.CartItemInfo}>
              <View>
                <Text style={styles.CartItemTitle}>{name}</Text>
              </View>
            </View>
          </View>

          {prices.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text style={styles.SizeText}>{data.size}</Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}
                  <Text style={styles.SizePrice}>{data.price}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon name="minus" color={'black'} size={12} />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon name="add" color={'black'} size={12} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['orange', 'white']}
          style={styles.SingleCartItemLinearGradient}>
          <View>
            <Image
              source={imagelink_square}
              style={styles.SingleCartItemImage}
            />
          </View>
          <View style={styles.SingleCartItemInfoContainer}>
            <View>
              <Text style={styles.CartItemTitle}>{name}</Text>
            </View>
            <View style={styles.SingleCartItemSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text style={styles.SizeText}>{prices[0].size}</Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {prices[0].currency}
                <Text style={styles.SizePrice}>{prices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.SingleCartItemSizeValueContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon name="minus" color={'black'} size={12} />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon name="add" color={'black'} size={12} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 12,
    padding: 12,
    borderRadius: 25,
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  CartItemTitle: {
    margin: 20,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
    color: 'black',
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    color: 'white',
    height: 40,
    width: 100,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: 'black',
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 18,
    color: 'black',
  },
  SizePrice: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 18,
    color: 'black',
  },
  CartItemIcon: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 7,
  },
  CartItemQuantityContainer: {
    backgroundColor: 'black',
    width: 60,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 16,
    color: 'white',
  },
  SingleCartItemLinearGradient: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 20,
  },
  SingleCartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  SingleCartItemInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  SingleCartItemSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  SingleCartItemSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Item;
