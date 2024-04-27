import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useStore} from '../store/Store';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {FONTFAMILY} from '../theme/theme';
import Payment from '../components/Payment';


const DetailsScreen = ({navigation, route}) => {
  const ItemofIndex = useStore(state =>
    route.params.type === 'Pizza' ? state.PizzaList : state.BurgerList,
  )[route.params.index];

  const addToFavoriteList = useStore(state => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    state => state.deleteFromFavoriteList,
  );

  const addToCart = useStore((state) => state.addToCart);
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);

  const [price, setPrice] = useState(
    ItemofIndex.prices && ItemofIndex.prices.length > 0
      ? ItemofIndex.prices[0]
      : null,
  );

  const ToggleFavorite = (favorite, type, id) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const Backhandler = () => {
    navigation.pop();
  };

const addToCartHandler = ({id, index, name, imagelink_square, type, price}) => {
  console.log(
    'addToCartHandler - Before addToCart:',
    id,
    index,
    name,
    imagelink_square,
    type,
    price,
  );

  if (price && price.size) {
    addToCart({
      id,
      index,
      name,
      imagelink_square,
      type,
      prices: [{...price, quantity: 1}],
    });

    console.log('addToCartHandler - After addToCart');
    calculateCartPrice();
    navigation.navigate('Cart');
  } else {
    console.error(
      'addToCartHandler - "price" is null or does not have a valid "size" property',
    );
  }
};


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'#FFFFFF'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_potrait={ItemofIndex.imagelink_potrait}
          id={ItemofIndex.id}
          type={ItemofIndex.type}
          name={ItemofIndex.name}
          favorite={ItemofIndex.favorite}
          description={ItemofIndex.description}
          averag_rating={ItemofIndex.average_rating}
          BackHandler={Backhandler}
          ToggleFavorite={ToggleFavorite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemofIndex.prices &&
              ItemofIndex.prices.map(data => (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => {
                    setPrice(data);
                  }}
                  style={[
                    styles.SizeBox,
                    {
                      borderColor: data.size == price.size ? 'orange' : 'gray',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize: ItemofIndex.type == 'burger' ? 14 : 16,
                        color: data.size == price.size ? 'orange' : 'gray',
                      },
                    ]}>
                    {data.size}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <Payment
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            if (price) {
              addToCartHandler({
                id: ItemofIndex.id,
                index: ItemofIndex.index,
                name: ItemofIndex.name,
                imagelink_square: ItemofIndex.imagelink_square,
                type: ItemofIndex.type,
                price: price,
              });
            } else {
              console.error('Price is null');
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#F7C762',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  FooterInfoArea: {
    padding: 20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    color: 'black',
    marginBottom: 30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: '#141921',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24 * 2,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 120,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default DetailsScreen;
