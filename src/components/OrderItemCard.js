import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  FONTFAMILY,
} from '../theme/theme';

const OrderItemCard = ({
  type,
  name,
  imagelink_square,
  prices,
  ItemPrice,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#FFB823', 'white']}
      style={styles.CardLinearGradient}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image source={imagelink_square} style={styles.Image} />
          <View>
            <Text style={styles.CardTitle}>{name}</Text>
          </View>
        </View>
        
      </View>
      {prices.map((data, index) => (
        <View key={index.toString()} style={styles.CardTableRow}>
          <View style={styles.CardTableRow}>
            <View style={styles.SizeBoxLeft}>
              <Text
                style={
                  styles.SizeText
                }>
                {data.size}
              </Text>
            </View>
            <View style={styles.PriceBoxRight}>
              <Text style={styles.PriceCurrency}>
                {data.currency}
                <Text style={styles.Price}> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              X <Text style={styles.PriceQuantity}>{data.quantity}</Text>
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              Rs.  {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: 20,
    padding: 20,
    borderRadius: 25,
  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardImageInfoContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: "black",
  },

  CardPrice: {
    color: 'black',
  },
  CardTableRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBoxLeft: {
    backgroundColor: 'black',
    height: 45,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
      color: 'white',
    fontSize:16,
  },
  PriceBoxRight: {
    backgroundColor: 'black',
    height: 45,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  PriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: 'white',
  },
  Price: {
    color: 'white',
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: 'black',
  },
});

export default OrderItemCard;
