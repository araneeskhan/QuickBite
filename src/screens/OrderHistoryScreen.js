import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../store/Store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {FONTFAMILY} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({navigation}) => {
  const OrderHistoryList = useStore(state => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  console.log("Order History  = ", OrderHistoryList.length);

  const navigationHandler = ({index, id, type}) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    // navigation.navigate("Home");
  };

  return (
    <View style={styles.ScreenContainer}>
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.length == 0 ? (
              <Text style={styles.EmptyOrderHistory}>NO ORDERS YET !!</Text>
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data, index) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
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
  LottieAnimation: {
    height: 250,
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
  ListItemContainer: {
    paddingHorizontal: 20,
    gap: 30,
  },
  DownloadButton: {
    margin: 20,
    backgroundColor: '#FDBD00',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36 * 2,
    borderRadius: 20,
  },
  EmptyOrderHistory: {
    fontFamily: FONTFAMILY.poppins_bold,
    textAlign: 'center',
    marginTop: 250,
    fontSize: 22,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: 'black',
  },
});

export default OrderHistoryScreen;
