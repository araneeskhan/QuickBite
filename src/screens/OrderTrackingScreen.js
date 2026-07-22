import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import OrderTimeline from '../components/OrderTimeline';
import ProgressBar from '../components/ProgressBar';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PriceBreakdown from '../components/PriceBreakdown';
import Toast from '../components/Toast';

const OrderTrackingScreen = ({route}) => {
  const [showToast, setShowToast] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Order #123456</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Progress</Text>
          <ProgressBar progress={75} showPercentage />
        </View>

        <View style={styles.section}>
          <OrderTimeline
            steps={[
              {
                id: 1,
                title: 'Order Confirmed',
                time: '10:30 AM',
                completed: true,
              },
              {
                id: 2,
                title: 'Preparing',
                time: '10:45 AM',
                completed: true,
              },
              {
                id: 3,
                title: 'On the Way',
                time: '11:00 AM',
                current: true,
              },
              {
                id: 4,
                title: 'Delivered',
                time: 'Expected 11:30 AM',
              },
            ]}
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
            isSelected={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <PriceBreakdown
            subtotal={29.99}
            deliveryFee={2.99}
            tax={2.50}
            discount={5}
            total={30.48}
          />
        </View>
      </View>

      {showToast && (
        <Toast
          message="Order status updated!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </ScrollView>
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
});

export default OrderTrackingScreen;