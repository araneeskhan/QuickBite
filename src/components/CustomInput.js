import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomIcon from './CustomIcon';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <CustomIcon
          name={icon}
          size={20}
          color={theme.colors.primary}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});

export default CustomInput;