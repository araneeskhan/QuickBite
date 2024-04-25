import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import EmptyState from '../components/EmptyState';

const CartScreen = ({navigation}) => {
  const CartList = useStore(state => state.CartList);
  const incrementCartItemQuantity = useStore(state => state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore(state => state.decrementCartItemQuantity);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);
  const cartPrice = useStore(state => state.cartPrice);

  const renderCartItem = (item) => (
    <View key={`${item.id}-${item.prices[0].size}`} style={styles.cartItem}>
      <Image source={item.imagelink_square} style={styles.itemImage} />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>{item.prices[0].size}</Text>
        <Text style={styles.itemPrice}>${item.prices[0].price}</Text>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => {
            decrementCartItemQuantity(item.id, item.prices[0].size);
            calculateCartPrice();
          }}>
          <CustomIcon name="minus" size={20} color={COLORS.dark} />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.prices[0].quantity}</Text>

        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => {
            incrementCartItemQuantity(item.id, item.prices[0].size);
            calculateCartPrice();
          }}>
          <CustomIcon name="plus" size={20} color={COLORS.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (CartList.length === 0) {
    return (
      <EmptyState 
        message="Your cart is empty"
        animation={require('../assets/animations/empty-cart.json')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView style={styles.cartList}>
        {CartList.map(renderCartItem)}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>${cartPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  itemSize: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: COLORS.light,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
  },
  priceValue: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  checkoutButton: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.white,
  },
});

export default CartScreen;
