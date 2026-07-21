import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/Store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import Item from '../components/Items';
import Payment from '../components/Payment';
import PizzaCard from '../components/PizzaCard';
import {FONTFAMILY} from '../theme/theme';
import {predictPrepTime, getSmartCartSuggestions} from '../utils/AIEngine';

const CartScreen = ({navigation, route}) => {
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
  const tabBarHeight = useBottomTabBarHeight();

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

  console.log('Cart List =', CartList.length);
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

          {CartList.length != 0 ? (
            <Payment
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={{price: CartPrice, currency: 'Rs. '}}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  EmptyCartText: {
    marginVertical: 350,
    color: 'black',
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 28,
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
