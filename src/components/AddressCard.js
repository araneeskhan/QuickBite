import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const AddressCard = ({address, isDefault, onEdit, onDelete, onSetDefault}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{address.label}</Text>
          {isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit}>
            <CustomIcon name="edit" size={20} color={COLORS.primaryDark} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <CustomIcon name="delete" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.addressText}>{address.fullAddress}</Text>
      
      {!isDefault && (
        <TouchableOpacity style={styles.setDefaultButton} onPress={onSetDefault}>
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  defaultBadge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.white,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  addressText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    lineHeight: 20,
  },
  setDefaultButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  setDefaultText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryDark,
  },
});

export default AddressCard;