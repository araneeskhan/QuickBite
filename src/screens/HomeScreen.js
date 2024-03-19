import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY} from '../theme/theme';
import {commonStyles} from '../theme/commonStyles';
import CustomInput from '../components/CustomInput';
import CustomIcon from '../components/CustomIcon';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={commonStyles.sectionTitle}>Popular Pizzas</Text>
          <FlatList
            data={PizzaList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => renderFoodCard({...item, type: 'Pizza'})}
            keyExtractor={item => `pizza-${item.id}`}
          />
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
    </View>
  );
};

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
});

export default HomeScreen;
