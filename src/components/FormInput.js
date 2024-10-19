import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  icon,
  keyboardType = 'default',
  autoCapitalize = 'none',
  required,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <CustomIcon name={icon} size={20} color={COLORS.grey} style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={COLORS.grey}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <CustomIcon
              name={isSecure ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.grey}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.dark,
  },
  errorText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default FormInput;