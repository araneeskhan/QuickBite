import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'; 
import {FONTFAMILY} from '../theme/theme';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const getErrors = (fullName, email, password) => {
    const errors = {};

    if (!fullName) {
      errors.fullName = 'Enter Full name';
    }
    if (!email) {
      errors.email = 'Please enter email';
    } else if (!email.includes('@') || !email.includes('.com')) {
      errors.email = 'Please enter Valid email';
    }

    if (!password) {
      errors.password = 'Enter Password';
    } else if (password.length < 8) {
      errors.password = 'Password length should be 8 ';
    }

    return errors;
  };

  const handleSignup = async () => {
    const errors = getErrors(fullName, email, password);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(errors);
    } else {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        console.log('Registered');
        navigation.navigate('SignIn');
      } catch (error) {
        console.error('Registration failed:', error.message);
        setShowErrors(true);
        setErrors({general: 'Registration failed. Please try again.'});
      }
    }
  };

  return (
    <ScrollView style={styles.MainView}>
      <Text style={styles.Header}>Register Now</Text>

      <Text style={styles.Text}>Full Name</Text>
      <View>
        <TextInput
          style={styles.Input}
          value={fullName}
          onChangeText={value => setFullName(value)}
        />
        {errors.fullName && (
          <Text style={styles.warnings}>{errors.fullName}</Text>
        )}
      </View>

      <View>
        <Text style={styles.Text}>Email Address</Text>
        <TextInput
          style={styles.Input}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        {errors.email && <Text style={styles.warnings}>{errors.email}</Text>}
      </View>

      <Text style={styles.Text}>Password</Text>
      <View>
        <TextInput
          style={styles.Input}
          value={password}
          onChangeText={value => setPassword(value)}
        />
        {errors.password && (
          <Text style={styles.warnings}>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.RegisterButtonView}
        onPress={handleSignup}>
        <Text style={styles.RegisterButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.BottomText}>Already have an account?</Text>

      <TouchableOpacity
        style={styles.LoginButtonView}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text style={styles.LoginButtonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
  },
  Header: {
    color: 'black',
    marginVertical: 50,
    fontSize: 30,
    fontFamily: FONTFAMILY.poppins_bold,
    textAlign: 'center',
  },
  Text: {
    color: 'black',
    fontFamily: FONTFAMILY.poppins_semibold,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    marginHorizontal: 30,
  },
  Input: {
    color: 'black',
    height: 60,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
  },

  RegisterButtonView: {
    marginTop: 50,
    borderRadius: 25,
    height: 60,
    marginHorizontal: 40,
    backgroundColor: '#FFBB2B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RegisterButtonText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
  },
  BottomText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_medium,
    marginTop: 70,
    marginBottom: 10,
  },
  LoginButtonView: {
    borderRadius: 25,
    height: 60,
    marginHorizontal: 40,
    backgroundColor: '#FFBB2B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
  },
  warnings: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    paddingHorizontal: 30,
    marginHorizontal: 30,
  },
});
