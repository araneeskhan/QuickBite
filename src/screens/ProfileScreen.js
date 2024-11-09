import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import FormInput from '../components/FormInput';
import Collapsible from '../components/Collapsible';
import ActionSheet from '../components/ActionSheet';
import Toast from '../components/Toast';
import HeaderBar from '../components/HeaderBar';

const ProfileScreen = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
  });

  const handleSave = () => {
    setShowToast(true);
    // Add your save logic here
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Profile"
        rightIcon="save"
        onRightPress={handleSave}
      />
      
      <ScrollView style={styles.content}>
        <FormInput
          label="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
          icon="user"
        />

        <FormInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          icon="mail"
          keyboardType="email-address"
        />

        <FormInput
          label="Phone"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
          icon="phone"
          keyboardType="phone-pad"
        />

        <Collapsible
          header={<Text style={styles.sectionTitle}>Preferences</Text>}
          initiallyExpanded={true}>
          <View style={styles.preferences}>
            <Text style={styles.preferenceText}>
              Customize your app experience and notification settings
            </Text>
          </View>
        </Collapsible>
      </ScrollView>

      <ActionSheet
        visible={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        title="Profile Options"
        options={[
          {
            label: 'Change Profile Picture',
            icon: 'camera',
            onPress: () => console.log('Change picture'),
          },
          {
            label: 'Delete Account',
            icon: 'trash',
            destructive: true,
            onPress: () => console.log('Delete account'),
          },
        ]}
      />

      {showToast && (
        <Toast
          message="Profile updated successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  preferences: {
    padding: 16,
  },
  preferenceText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
  },
});

export default ProfileScreen;