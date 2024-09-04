import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PriceBreakdown from '../components/PriceBreakdown';
import FormInput from '../components/FormInput';
import CustomModal from '../components/CustomModal';
import LoadingSpinner from '../components/LoadingSpinner';

const CheckoutScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <LoadingSpinner
          text="Processing your order..."
          fullScreen
          overlay
        />
      )}

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <FormInput
            placeholder="Enter your delivery address"
            icon="location"
            value="123 Main Street, City"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <PaymentMethodCard
            method={{
              type: 'visa',
              lastFourDigits: '4242',
              expiryMonth: '12',
              expiryYear: '24',
            }}
            isSelected={selectedPayment === 'visa'}
            onSelect={() => setSelectedPayment('visa')}
          />
        </View>

        <View style={styles.section}>
          <PriceBreakdown
            subtotal={45.99}
            deliveryFee={4.99}
            tax={3.50}
            total={54.48}
          />
        </View>
      </ScrollView>

      <CustomModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          navigation.navigate('OrderTracking');
        }}
        title="Order Confirmed!">
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Your order has been placed successfully. You can track your order in
            real-time.
          </Text>
        </View>
      </CustomModal>
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
  title: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
    marginBottom: 16,
  },
  modalContent: {
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CheckoutScreen;