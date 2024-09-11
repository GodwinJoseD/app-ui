import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';
import InputField from "../components/InputField";

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSelected, setSelection] = useState(false);

    const handleGoogleLogoClick = () => {
        Alert.alert("Google Logo Got Clicked", "You clicked on the Google logo!");
    };

    const handleMacLogoClick = () => {
        Alert.alert("Mac Logo Got Clicked", "You clicked on the Mac logo!");
    };

    const handleTweetLogoClick = () => {
        Alert.alert("Twitter Logo Got Clicked", "You clicked on the Twitter logo!");
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
                <InputField
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Mobile Number or E-mail" />
                <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('VerifyOtp')}>
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
});

export default SignUpScreen;