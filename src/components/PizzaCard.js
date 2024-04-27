import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';
import {FONTFAMILY} from '../theme/theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.3;
const PizzaCard = ({
  id,
  index,
  name,
  imagelink_square,
  type,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  const handleAddToCart = () => {
    if (typeof buttonPressHandler === 'function') {
      console.log('PizzaCard - Before buttonPressHandler:', {
        id,
        index,
        name,
        imagelink_square,
        type,
        price,
      });
      buttonPressHandler({ id, index, name, imagelink_square, type, price });
    } else {
      console.error('PizzaCard - buttonPressHandler is not a function');
    }
  };


  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={['#FFBB2B', 'white']}>
      <ImageBackground
        source={
          imagelink_square || require('../assets/images/pizza-image01.png')
        }
        style={styles.CardImageBackground}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcon name={'star'} color={'orange'} size={14} />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <View style={styles.CardFooter}>
        <Text style={styles.CardPrice}>
          Rs. <Text>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
  buttonPressHandler(id, index, name, imagelink_square, type, price);
}}
        >
          <BGIcon color="white" name={'add'} BGColor={'orange'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default PizzaCard;

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    borderRadius: 25,
  },

  CardImageBackground: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 15,
    margin: 10,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 2,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    top: 0,
    right: 0,
  },

  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 16,
    lineHeight: 22,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 16,
    paddingLeft: 15,
    color: '#AC821F',
  },
  CardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },

  CardPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: '#3A3426',
  },
});
