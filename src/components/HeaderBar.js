import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { FONTFAMILY } from '../theme/theme'
import ProfilePic from './ProfilePic';
import CustomIcon from './CustomIcon';

const HeaderBar = ({title}) => {
  return (
      <View style={styles.headerContainer}>
          {/* Drawer will be here  */}
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

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
