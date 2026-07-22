import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const CustomButton = ({onPress, title, style, textStyle, disabled}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        {backgroundColor: disabled ? '#ccc' : theme.colors.primary},
        style
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default CustomButton;