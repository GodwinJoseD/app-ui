import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import InputField from "../components/InputField";
import CountryPicker from 'react-native-country-picker-modal';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [callingCode, setCallingCode] = useState('+1');
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleLogoClick = () => {
        Alert.alert("Google Logo Got Clicked", "You clicked on the Google logo!");
    };

    const handleMacLogoClick = () => {
        Alert.alert("Mac Logo Got Clicked", "You clicked on the Mac logo!");
    };

    const handleTweetLogoClick = () => {
        Alert.alert("Twitter Logo Got Clicked", "You clicked on the Twitter logo!");
    };

    const handleSignUp = async () => {
        const fullPhoneNumber = `${callingCode}${phoneNumber}`;
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password, phoneNumber: fullPhoneNumber })
            });
            console.log('Sign-up request sent:', response);
            console.log(JSON.stringify({ name, password, phoneNumber: fullPhoneNumber }));
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign-up failed');
            }

            const data = await response.json();
            console.log('Sign-up successful:', data);

            // Call the OTP API
            const otpResponse = await fetch('http://localhost:5000/api/otp/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: fullPhoneNumber })
            });
            console.log(JSON.stringify({ phoneNumber: fullPhoneNumber }))

            if (!otpResponse.ok) {
                throw new Error('Failed to send OTP');
            }

            const otpData = await otpResponse.json();
            console.log('OTP sent successfully:', otpData);

            // Navigate to OTP verification page
            navigation.navigate('VerifyOtp', { phoneNumber: fullPhoneNumber });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image source={require('../assets/logo.png')} style={{ alignSelf: 'center' }} />
            </View>
            <View style={styles.bottomView}>
                <InputField
                    value={name}
                    onChangeText={setName}
                    placeholder="Name" />
                <CountryPicker
                    countryCode={countryCode}
                    withCallingCode
                    withFilter
                    withFlag
                    withCountryNameButton
                    onSelect={(country) => {
                        setCountryCode(country.cca2);
                        setCallingCode(`+${country.callingCode[0]}`);
                    }}
                />
                <InputField
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Phone Number" />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    style={styles.input}
                />
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
                <TouchableOpacity style={styles.loginbutton} onPress={handleSignUp}>
                    <Text style={styles.logintext}>Sign Up</Text>
                </TouchableOpacity>
                  
                <Text style={{ textAlign: 'center', paddingVertical: 30, color: 'white', fontSize: 20 }}>---------Or-----------</Text>
                
                {/* Social Media Icons */}
                <View style={styles.socialIconsContainer}>
                    {/* Google Logo */}
                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity onPress={handleGoogleLogoClick}>
                            <Image source={require('../assets/google.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Mac Logo */}
                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity onPress={handleMacLogoClick}>
                            <Image source={require('../assets/mac.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Twitter Logo */}
                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity onPress={handleTweetLogoClick}>
                            <Image source={require('../assets/twitter.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ color: 'white', alignSelf: 'center', paddingTop: 40, fontSize: 15 }}>
                    Already have an account? 
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={{ color: 'black' }}> Sign In</Text>
                    </TouchableOpacity>
                
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    topView: {
        backgroundColor: 'white',
        height: '30%',
    },
    bottomView: {
        backgroundColor: '#20D4D4',
        height: '70%',
        paddingHorizontal: 20,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        paddingTop: 60,
    },
    text: {
        color: 'white',
        marginTop: 10,
        marginBottom: 20,
    },
    loginbutton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
    },
    logintext: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        marginTop: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 2, // Increased border width
        borderColor: '#FFFFFF', // Brighter white color
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxContainer: {
        backgroundColor: '#20D4D4',
        borderWidth: 0,
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    socialIconContainer: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        marginHorizontal: 10,
    },
    socialIcon: {
        width: 25,
        height: 25,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default SignUpScreen;