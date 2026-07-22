import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY} from '../theme/theme';
import {commonStyles} from '../theme/commonStyles';
import CustomInput from '../components/CustomInput';
import CustomIcon from '../components/CustomIcon';
import PizzaCard from '../components/PizzaCard';
import {BurgerData} from '../data/BurgerData';
import { semanticSearch, getRecommendations } from '../utils/AIEngine';

const getCategoriesFromData = (pizzaData, burgerData) => {
  let temp = {};
  const combinedData = [...pizzaData, ...burgerData];

  for (let i = 0; i < combinedData.length; i++) {
    if (temp[combinedData[i].type] === undefined) {
      temp[combinedData[i].type] = 1;
    } else {
      temp[combinedData[i].type]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getPizzaList = (category, pizzaList, burgerList) => {
  if (category === 'All') {
    return [...pizzaList, ...burgerList];
  } else {
    return [...pizzaList, ...burgerList].filter(item => item.type === category);
  }
};

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderFoodCard = ({item, type}) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => navigation.navigate('Details', {type, index: item.index})}>
      <View style={styles.imageContainer}>
        <Image source={item.imagelink_square} style={styles.foodImage} />
        {item.favorite && (
          <View style={styles.favoriteTag}>
            <CustomIcon name="heart" size={15} color={COLORS.white} />
          </View>
        )}
      </View>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodPrice}>
          Starting from ${Math.min(...item.prices.map(p => p.price))}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const FavoritesList = useStore(state => state.FavoritesList);
  const recommendations = getRecommendations([...PizzaList, ...BurgerList], FavoritesList);

  const addToCart = useStore(state => state.addToCart);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);

  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedPizza, setSortedPizza] = useState(
    getPizzaList(categoryIndex.category, PizzaList, BurgerList),
  );

  const searchPizza = searchString => {
    setSearchText(searchString);

    if (searchString !== '') {
      setCategoryIndex({index: 0, category: 'All'});

      const filteredItems = semanticSearch(searchString, getPizzaList('All', PizzaList, BurgerList));

      setSortedPizza(filteredItems);
    } else {
      setSortedPizza(
        getPizzaList(categoryIndex.category, PizzaList, BurgerList),
      );
    }
  };
  const handleCategorySelect = selectedCategory => {
    ListRef?.current?.scrollToOffset({animated: true, offset: 0});
    setSearchText('');

    setCategoryIndex(prevState => ({
      index: categories.indexOf(selectedCategory),
      category: selectedCategory,
    }));

    if (selectedCategory === 'All') {
      setSortedPizza([...PizzaList, ...BurgerList]);
    } else {
      setSortedPizza(getPizzaList(selectedCategory, PizzaList, BurgerList));
    }
  };

  const ListRef = useRef();
  const PizzaListRef = useRef();
  const BurgerListRef = useRef();

  //   console.log('BurgerList:', BurgerList);

  const addToCartHandler = (id, index, name, imagelink_square, type, price) => {
    console.log(
      'PizzaCardAddToCart - Before addToCart:',
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

      console.log('PizzaCardAddToCart - After addToCart');
      calculateCartPrice();

      if (name) {
        ToastAndroid.showWithGravity(
          `${name} added to Cart`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        console.error('addToCartHandler - "name" is undefined');
      }
    } else {
      console.error(
        'addToCartHandler - "price" is null or does not have a valid "size" property',
      );
    }
  };

  return (
    <View style={commonStyles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Foodie! 👋</Text>
        <Text style={styles.subtitle}>What would you like to eat today?</Text>
      </View>

      <CustomInput
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        icon="search"
        style={styles.searchInput}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.section}>
          <Text style={commonStyles.sectionTitle}>Popular Pizzas</Text>
          <FlatList
            data={PizzaList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => renderFoodCard({...item, type: 'Pizza'})}
            keyExtractor={item => `pizza-${item.id}`}
          />
          <TouchableOpacity onPress={() => searchPizza(searchText)}>
            <CustomIcon name="search" size={22} color="gray" />
          </TouchableOpacity>
        </View>

        {/* AI Recommendations Section */}
        {searchText === '' && categoryIndex.category === 'All' && recommendations.length > 0 && (
          <View>
            <Text style={[styles.CategoriesTitle, {marginTop: 0, marginBottom: 15, color: '#F7C762'}]}>
              ✨ Recommended For You
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={recommendations}
              contentContainerStyle={styles.FlatListContainer}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
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
              )}
            />
          </View>
        )}

        {/* Categories Text  */}
        <View>
          <Text style={styles.CategoriesTitle}>Category</Text>
        </View>

        <View style={styles.section}>
          <Text style={commonStyles.sectionTitle}>Trending Burgers</Text>
          <FlatList
            data={BurgerList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => renderFoodCard({...item, type: 'Burger'})}
            keyExtractor={item => `burger-${item.id}`}
          />
        </View>
      </ScrollView>

      {/* AI Vision Scanner FAB */}
      <TouchableOpacity 
        style={styles.ScannerFAB}
        onPress={() => navigation.navigate('ScanScreen')}
      >
        <Text style={styles.ScannerText}>📷</Text>
      </TouchableOpacity>
    </View>
  );
};

// Update styles
const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: COLORS.primaryDark,
  },
  greeting: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 24,
    color: COLORS.white,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
  },
  searchInput: {
    margin: 20,
  },
  section: {
    marginBottom: 20,
  },
  foodCard: {
    width: 160,
    marginHorizontal: 10,
    marginVertical: 5,  // Added vertical margin
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    backgroundColor: COLORS.light, // Added background color
  },
  foodImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  favoriteTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.primaryDark,
    padding: 8,
    borderRadius: 20,
  },
  foodInfo: {
    padding: 10,
  },
  foodName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 14,
    color: COLORS.dark,
  },
  foodPrice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  ScannerFAB: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#F7C762',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ScannerText: {
    fontSize: 28,
  }
});

export default HomeScreen;
