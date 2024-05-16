import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomInput from '../components/CustomInput';
import CustomIcon from '../components/CustomIcon';
import {debounce} from 'lodash';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);

  const filters = [
    {id: 'all', label: 'All'},
    {id: 'Pizza', label: 'Pizzas'},
    {id: 'Burger', label: 'Burgers'},
    {id: 'popular', label: 'Popular'},
    {id: 'new', label: 'New'},
  ];

  const searchItems = useCallback(
    debounce((query) => {
      const allItems = [...PizzaList, ...BurgerList];
      return allItems.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
        const price = Math.min(...item.prices.map(p => p.price));
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        return matchesQuery && matchesFilter && matchesPrice;
      });
    }, 300),
    [activeFilter, priceRange, PizzaList, BurgerList]
  );

  const renderSearchItem = ({item}) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => 
        navigation.navigate('Details', {
          type: item.type,
          index: item.index,
        })
      }>
      <Image source={item.imagelink_square} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type}</Text>
        <Text style={styles.itemPrice}>
          From ${Math.min(...item.prices.map(p => p.price))}
        </Text>
      </View>
      <CustomIcon name="chevron-right" size={24} color={COLORS.grey} />
    </TouchableOpacity>
  );

  const searchResults = searchItems(searchQuery);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomInput
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon="search"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === item.id && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(item.id)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item.id && styles.activeFilterText,
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.filterList}
        />
      </View>

      <FlatList
        data={searchResults}
        renderItem={renderSearchItem}
        keyExtractor={item => `${item.type}-${item.id}`}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  searchInput: {
    marginBottom: 0,
  },
  filterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  filterList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.light,
  },
  activeFilter: {
    backgroundColor: COLORS.primaryDark,
  },
  filterText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  resultsList: {
    padding: 20,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  itemType: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.grey,
  },
});

export default SearchScreen;