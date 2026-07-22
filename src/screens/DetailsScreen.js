import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useStore} from '../store/Store';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {COLORS, FONTFAMILY} from '../theme/theme';
import Payment from '../components/Payment';
import CustomIcon from '../components/CustomIcon';

const DetailsScreen = ({navigation, route}) => {
  const [scrollY] = useState(new Animated.Value(0));
  const ItemofIndex = useStore(state =>
    route.params.type === 'Pizza' ? state.PizzaList : state.BurgerList,
  )[route.params.index];

  const addToFavoriteList = useStore(state => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(state => state.deleteFromFavoriteList);
  const addToCart = useStore(state => state.addToCart);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);

  const [selectedSize, setSelectedSize] = useState(
    ItemofIndex.prices[0]?.size || '',
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      
      <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <CustomIcon name="arrow-left" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{ItemofIndex.name}</Text>
      </Animated.View>

      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        
        <ImageBackgroundInfo
          imagelink_potrait={ItemofIndex.imagelink_potrait}
          id={ItemofIndex.id}
          type={ItemofIndex.type}
          favorite={ItemofIndex.favorite}
          name={ItemofIndex.name}
          rating={ItemofIndex.average_rating}
          onFavoritePress={() => 
            ItemofIndex.favorite 
              ? deleteFromFavoriteList(ItemofIndex.type, ItemofIndex.id)
              : addToFavoriteList(ItemofIndex.type, ItemofIndex.id)
          }
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{ItemofIndex.description}</Text>
          
          <Text style={styles.sectionTitle}>Size Options</Text>
          <View style={styles.sizeContainer}>
            {ItemofIndex.prices.map(item => (
              <TouchableOpacity
                key={item.size}
                style={[
                  styles.sizeButton,
                  selectedSize === item.size && styles.selectedSize,
                ]}
                onPress={() => setSelectedSize(item.size)}>
                <Text style={[
                  styles.sizeText,
                  selectedSize === item.size && styles.selectedSizeText,
                ]}>
                  {item.size}
                </Text>
                <Text style={[
                  styles.priceText,
                  selectedSize === item.size && styles.selectedSizeText,
                ]}>
                  ${item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            const selectedPrice = ItemofIndex.prices.find(p => p.size === selectedSize);
            addToCart({
              id: ItemofIndex.id,
              name: ItemofIndex.name,
              imagelink_square: ItemofIndex.imagelink_square,
              type: ItemofIndex.type,
              prices: [{...selectedPrice, quantity: 1}],
            });
            calculateCartPrice();
            navigation.navigate('Cart');
          }}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  detailsContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.dark,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
    marginBottom: 15,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.light,
    alignItems: 'center',
    minWidth: 100,
  },
  selectedSize: {
    backgroundColor: COLORS.primaryDark,
  },
  sizeText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  selectedSizeText: {
    color: COLORS.white,
  },
  priceText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.dark,
    marginTop: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
  },
  addToCartButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.white,
  },
});

export default DetailsScreen;
