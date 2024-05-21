import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';

const ProfileScreen = ({navigation}) => {
  const userInfo = useStore(state => state.userInfo);

  const menuItems = [
    {
      icon: 'history',
      title: 'Order History',
      screen: 'OrderHistory',
    },
    {
      icon: 'location',
      title: 'Delivery Addresses',
      screen: 'Addresses',
    },
    {
      icon: 'payment',
      title: 'Payment Methods',
      screen: 'PaymentMethods',
    },
    {
      icon: 'settings',
      title: 'Settings',
      screen: 'Settings',
    },
    {
      icon: 'help',
      title: 'Help & Support',
      screen: 'Support',
    },
  ];

  const renderMenuItem = ({icon, title, screen}) => (
    <TouchableOpacity
      key={title}
      style={styles.menuItem}
      onPress={() => navigation.navigate(screen)}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <CustomIcon name={icon} size={24} color={COLORS.primaryDark} />
        </View>
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <CustomIcon name="chevron-right" size={24} color={COLORS.grey} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={userInfo.avatar || require('../assets/images/default-avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name || 'Guest User'}</Text>
            <Text style={styles.userEmail}>{userInfo.email || 'Not signed in'}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton}>
        <CustomIcon name="logout" size={24} color={COLORS.primaryDark} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.light,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  editButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.light,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryDark,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: COLORS.white,
    marginVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDark,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.light,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: COLORS.light,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryDark,
  },
});

export default ProfileScreen;