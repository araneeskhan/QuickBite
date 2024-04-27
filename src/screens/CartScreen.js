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
import {FONTFAMILY} from '../theme/theme';

const CartScreen = ({navigation, route}) => {
  const CartList = useStore(state => state.CartList);
  const CartPrice = useStore(state => state.CartPrice);
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
  //   ListItemContainer: {
  //     paddingHorizontal: 20,
  //     gap: 20,
  //   },
});

export default CartScreen;
