import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { FONTFAMILY } from '../theme/theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const [hidePassword, setHidePassword] = useState(true);

  const navigation = useNavigation();

  const getErrors = (email, password) => {
    const errors = {};

    if (!email) {
      errors.email = 'Please enter email';
    } else if (!email.includes('@') || !email.includes('.com')) {
      errors.email = 'Please enter a valid email';
    }

    if (!password) {
      errors.password = 'Enter Password';
    } else if (password.length < 8) {
      errors.password = 'Password length should be 8';
    }

    return errors;
  };

  const handleLogin = async () => {
    const errors = getErrors(email, password);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(errors);
    } else {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        if (userCredential.user) {
          console.log('Logged in', userCredential.user);
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Authentication failed:', error.message);
        setShowErrors(true);
        setErrors({general: 'Invalid email or password'});
      }
    }
  };

  return (
    <View style={styles.MainView}>
      <Text style={styles.Header}>Login</Text>
      <Text style={styles.Text}>Email</Text>
      <View>
        <TextInput
          style={styles.InputEmail}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        {errors.email && <Text style={styles.warnings}>{errors.email}</Text>}
      </View>

      <Text style={styles.Text}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.Input, {flex: 1}]}
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={value => setPassword(value)}
        />
        {password !== '' && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}>
            <FontAwesomeIcon
              icon={hidePassword ? faEyeSlash : faEye}
              size={20}
              style={{color: 'black'}}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.BottomText}>Forgot Password ?</Text>

      <TouchableOpacity style={styles.LoginButtonView} onPress={handleLogin}>
        <Text style={styles.LoginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.NoAccountText}>Don't have an Account ?</Text>

      <TouchableOpacity
        style={styles.RegisterButtonView}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.RegisterButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
  },
  Header: {
    color: 'black',
    marginTop: 100,
    marginBottom: 80,

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
  InputEmail: {
    color: 'black',
    paddingHorizontal: 30,
    fontSize: 18,
    height: 60,
    marginHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#F1F1F1',
  },
  Input: {
    color: 'black',
    // paddingHorizontal: 30,
    height: 60,
    fontSize: 18,
    marginHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#F1F1F1',
    //   marginBottom: 10,
  },
  RegisterButtonView: {
    marginTop: 10,
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
    marginTop: 130,
    marginBottom: 20,
  },
  NoAccountText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_medium,
    marginTop: 90,
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
  // passwordContainer: {
  //     flex: 1,  // Use flex: 1 to take up the available width
  //     borderRadius: 10,
  //     backgroundColor: 'white',
  //     flexDirection: "row",
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //   },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    // paddingVertical: 2,
  },

  eyeIcon: {
    paddingHorizontal: 30,
    color: 'black',
    // marginLeft:-10,
  },
});
