import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from '../navigators/TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const MainNavigator = memo(() => (
  <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      animationEnabled: true,
    }}
  >
    <Stack.Screen 
      name="AuthFlow" 
      component={AuthNavigator}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
));

export default MainNavigator;