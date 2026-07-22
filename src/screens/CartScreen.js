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
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import Item from '../components/Items';
import Payment from '../components/Payment';
import PizzaCard from '../components/PizzaCard';
import {FONTFAMILY} from '../theme/theme';
import {predictPrepTime, getSmartCartSuggestions} from '../utils/AIEngine';

const CartScreen = ({navigation}) => {
  const CartList = useStore(state => state.CartList);
  const CartPrice = useStore(state => state.CartPrice);
  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);
  const addToCart = useStore(state => state.addToCart);

  const prepTime = predictPrepTime(CartList);
  const crossSells = getSmartCartSuggestions(CartList, [...PizzaList, ...BurgerList]);
  const incrementCartItemQuantity = useStore(
    state => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    state => state.decrementCartItemQuantity,
  );

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  const calculateCartPrice = useStore(state => state.calculateCartPrice);
  const cartPrice = useStore(state => state.cartPrice);

  const addToCartHandler = (id, index, name, imagelink_square, type, price) => {
    if (price && price.size) {
      addToCart({
        id, index, name, imagelink_square, type,
        prices: [{...price, quantity: 1}],
      });
      calculateCartPrice();
    }
  };

  const incrementCartItemQuantityHandler = (id, size) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  const decrementCartItemQuantityHandler = (id, size) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'white'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
            {CartList.length == 0 ? (
              <Text style={styles.EmptyCartText}>Cart is EMPTY !!</Text>
            ) : (
              <View style={styles.ListItemContainer}>
                {/* AI Dynamic ETA */}
                <View style={styles.ETAContainer}>
                  <Text style={styles.ETAText}>⚡ AI Predicted Prep Time: {prepTime} mins</Text>
                </View>

                {CartList.map(data => (
                  <TouchableOpacity
                    onPress={() => { 
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <Item
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}

                {/* AI Frequently Bought Together */}
                {crossSells.length > 0 && (
                  <View style={{marginTop: 30}}>
                    <Text style={styles.CrossSellTitle}>💡 Frequently Bought Together</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 20, paddingHorizontal: 20, paddingBottom: 20}}>
                      {crossSells.map(item => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => { 
                            navigation.push('Details', { index: item.index, id: item.id, type: item.type });
                          }}>
                          <PizzaCard
                            id={item.id}
                            index={item.index}
                            name={item.name}
                            type={item.type}
                            imagelink_square={item.imagelink_square}
                            average_rating={item.average_rating}
                            price={item.prices[0]}
                            buttonPressHandler={addToCartHandler}
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
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
  ETAContainer: {
    backgroundColor: '#F7C762',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  ETAText: {
    fontFamily: FONTFAMILY.poppins_bold,
    color: 'black',
    fontSize: 14,
  },
  CrossSellTitle: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 18,
    color: 'black',
    marginLeft: 20,
    marginBottom: 10,
  }
});

export default CartScreen;
