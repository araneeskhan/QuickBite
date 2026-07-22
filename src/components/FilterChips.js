import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';

const FilterChips = ({filters, activeFilter, onFilterPress}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.chip,
            activeFilter === filter.id && styles.activeChip,
          ]}
          onPress={() => onFilterPress(filter.id)}>
          <Text
            style={[
              styles.chipText,
              activeFilter === filter.id && styles.activeChipText,
            ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.light,
  },
  activeChip: {
    backgroundColor: COLORS.primaryDark,
  },
  chipText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  activeChipText: {
    color: COLORS.white,
  },
});

export default FilterChips;