import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from './CustomIcon';
import {FONTFAMILY} from '../theme/theme';
import ProfilePic from './ProfilePic';

const HeaderBar = ({title, showBack = true, rightIcon, onRightPress}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <CustomIcon name="left" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
          <CustomIcon name={rightIcon} size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: '#000',
    marginLeft: 16,
  },
  rightButton: {
    padding: 8,
  },
});

export default HeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: 'black',
  },
});
