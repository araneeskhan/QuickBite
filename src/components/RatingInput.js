import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const RatingInput = ({rating, setRating, size = 24, showLabel = true}) => {
  const handlePress = value => {
    setRating(value);
  };

  const getRatingLabel = value => {
    switch (value) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return 'Rate your experience';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(value => (
          <TouchableOpacity
            key={value}
            onPress={() => handlePress(value)}
            style={styles.starButton}>
            <CustomIcon
              name={value <= rating ? 'star-filled' : 'star'}
              size={size}
              color={value <= rating ? '#FFD700' : COLORS.light}
            />
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && (
        <Text style={styles.ratingLabel}>{getRatingLabel(rating)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingLabel: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
});

export default RatingInput;