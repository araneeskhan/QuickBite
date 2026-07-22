import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import ImageGallery from '../components/ImageGallery';
import Badge from '../components/Badge';
import ReviewCard from '../components/ReviewCard';
import Collapsible from '../components/Collapsible';
import FilterChips from '../components/FilterChips';
import SkeletonLoader from '../components/SkeletonLoader';

const RestaurantDetailsScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SkeletonLoader width="100%" height={300} />
        <View style={styles.content}>
          <SkeletonLoader width={200} height={24} style={styles.skeleton} />
          <SkeletonLoader width={150} height={20} style={styles.skeleton} />
          <SkeletonLoader width="100%" height={100} style={styles.skeleton} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageGallery
        images={[
          require('../assets/images/restaurant1.jpg'),
          require('../assets/images/restaurant2.jpg'),
        ]}
        imageHeight={300}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Restaurant Name</Text>
          <Badge count={4.5} size="large" color={COLORS.primaryDark} />
        </View>

        <FilterChips
          filters={[
            {id: 'all', label: 'All'},
            {id: 'starters', label: 'Starters'},
            {id: 'mains', label: 'Main Course'},
            {id: 'desserts', label: 'Desserts'},
          ]}
          activeFilter={activeFilter}
          onFilterPress={setActiveFilter}
        />

        <Collapsible
          header={
            <Text style={styles.sectionTitle}>Menu Description</Text>
          }
          initiallyExpanded={true}>
          <Text style={styles.description}>
            Discover our carefully curated menu featuring both traditional and modern dishes...
          </Text>
        </Collapsible>

        <Text style={styles.sectionTitle}>Reviews</Text>
        <ReviewCard
          review={{
            userName: 'John Doe',
            rating: 4,
            date: '2 days ago',
            comment: 'Great food and excellent service!',
            userAvatar: require('../assets/images/avatar.jpg'),
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    lineHeight: 20,
    padding: 16,
  },
  skeleton: {
    marginVertical: 8,
  },
});

export default RestaurantDetailsScreen;