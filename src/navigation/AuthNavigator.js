import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import OnBoarding from '../screens/OnBoarding';

const Stack = createStackNavigator();

const AuthNavigator = memo(() => (
  <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      animationEnabled: true,
    }}
  >
    <Stack.Screen 
      name="OnBoarding" 
      component={OnBoarding}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
));

export default AuthNavigator;