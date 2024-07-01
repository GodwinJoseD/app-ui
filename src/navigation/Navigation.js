import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";


const Stack = createStackNavigator();

export default Navigation=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LogIn" component={LoginScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="VerifyOtp" component={OtpVerificationScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}