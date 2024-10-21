import React from 'react';
import {Image} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const CustomBackButton = () => (
  <TouchableOpacity>
    <Image
      source={require('../assets/CustomBackButton.png')}
      style={{width: 11.5, height: 19.5,margin:13}}
    />
  </TouchableOpacity>
);

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{headerTitle: ''}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: '',
            headerBackImage: () => <CustomBackButton />,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerTitle: '',
            headerBackImage: () => <CustomBackButton />,
          }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={OtpVerificationScreen}
          options={{
            headerTitle: '',
            headerBackImage: () => <CustomBackButton style={{width: 15.5, height: 39.5}}/>,
          }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPasswordScreen}
          options={{
            headerTitle: '',
            headerBackImage: () => <CustomBackButton />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={ProfileScreen}
          options={{
            headerTitle: ' Fill Your Profile',
            headerStyle: {backgroundColor: '#20D4D4',height: 75},
            headerTitleStyle:{color:'#f8f8ff',position:'absolute',top:22,left:70},
            headerBackImage: () => <CustomBackButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};