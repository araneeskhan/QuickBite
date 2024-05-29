import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from './CustomInput';
import {COLORS} from '../theme/theme';

const SearchBar = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <CustomInput
        placeholder={placeholder || "Search..."}
        value={value}
        onChangeText={onChangeText}
        icon="search"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    marginBottom: 0,
  },
});

export default SearchBar;