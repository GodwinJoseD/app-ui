import React from "react";
import { Image } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreateNewPasswordScreen from "../screens/CreateNewPasswordScreen";
import { TouchableOpacity } from "react-native-gesture-handler";


const Stack = createStackNavigator();

const CustomBackButton = () => (
    <TouchableOpacity>
    <Image
      source={require('../assets/CustomBackButton.png')}
      style={{ width: 7.1, height: 15.84 }}
    />
    </TouchableOpacity>
  );

export default Navigation=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerTitle: '',headerBackImage:()=><CustomBackButton/> }}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: '',headerBackImage:()=><CustomBackButton/> }}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: '',headerBackImage:()=><CustomBackButton/> }}/>
                <Stack.Screen name="VerifyOtp" component={OtpVerificationScreen} options={{ headerTitle: '',headerBackImage:()=><CustomBackButton/> }}/>
                <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerTitle: '',headerBackImage:()=><CustomBackButton/> }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}