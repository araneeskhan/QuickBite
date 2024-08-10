import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const CategoryCard = ({category, onPress, isSelected}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}>
      <Image source={category.image} style={styles.backgroundImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.itemCount}>
            {category.itemCount} {category.itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 180,
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.white,
  },
  itemCount: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 4,
  },
});

export default CategoryCard;