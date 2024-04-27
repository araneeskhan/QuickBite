import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  FONTFAMILY,
} from '../theme/theme';
import BGIcon from '../components/BGIcon';
import Payment from '../components/Payment';
import PaymentMethod from '../components/PaymentMethod';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import {useStore} from '../store/Store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Master Card',
    icon: require('../assets/images/mastercard.png'),
    isIcon: false,
  },
  {
    name: 'Easy Paisa',
    icon: require('../assets/images/easypaisa.png'),
    isIcon: false,
  },
 
];

const PaymentScreen = ({navigation, route}) => {
  const calculateCartPrice = useStore(state => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    state => state.addToOrderHistoryListFromCart,
  );

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'white'} />

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
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <BGIcon
              name="left"
              color={'black'}
              size={16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={
                styles.CreditCardContainer
              }
              >
              <Text style={styles.CreditCardTitle}>Visa Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.LinearGradientStyle}
                  colors={['#FFBB2B', '#756E2F']}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon name="chip" size={40} color={'black'} />

                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>8923</Text>
                    <Text style={styles.CreditCardNumber}>6745</Text>
                    <Text style={styles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <View style={styles.NameIcon}>
                        <Text style={styles.CreditCardNameTitle}>
                          Anees ur Rehman
                        </Text>
                        <CustomIcon name="visa" size={60} color={'black'} style={styles.VisaIcon} />
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map(data => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Payment
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: route.params.amount, currency: 'Rs. '}}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: 'black',
  },
  EmptyView: {
    height: 36,
    width: 36,
  },
  PaymentOptionsContainer: {
    padding: 15,
    gap: 15,
  },
  CreditCardContainer: {
    padding: 10,
    gap: 10,
    borderRadius: 15 * 2,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  CreditCardBG: {
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
  LinearGradientStyle: {
    borderRadius: 25,
    gap: 36,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent:'center',
    alignItems:'center',
    
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: 'white',
    letterSpacing: 4 + 2,
  },

  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: 'white',
  },
  NameIcon: {
    flexDirection: 'row',
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: 'white',
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
  VisaIcon: {
    marginLeft: 160,

  },
});

export default PaymentScreen;
