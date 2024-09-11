import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

export default LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleGoogleLogoClick = () => {
        Alert.alert("Google Logo Got Clicked", "You clicked on the Google logo!");
    };

    const handleMacLogoClick = () => {
        Alert.alert("Mac Logo Got Clicked", "You clicked on the Mac logo!");
    };

    const handletweetLogoClick = () => {
        Alert.alert("Twitter Logo Got Clicked", "You clicked on the Twitter logo!");
    };

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image source={require('../assets/logo.png')} style={{ alignSelf: 'center' }} />
            </View>
            <View style={styles.bottomView}>
                {/* Email Field */}
                <View style={styles.inputField}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Mobile Number or E-Mail"
                        placeholderTextColor="white"
                        style={styles.input}
                    />
                </View>

                {/* Password Field */}
                <View style={styles.inputField}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="white"
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Image
                            source={
                                isPasswordVisible
                                    ? require('../assets/visible.png')
                                    : require('../assets/eye.png')
                            }
                            style={styles.eyeIcon} // Ensure the eye icon is fully visible
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.text} onPress={() => navigation.navigate('ForgotPassword')}>Forgot password?</Text>

                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('ProfilePage')}>
                    <Text style={styles.loginText}>Login</Text>
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
                        <TouchableOpacity onPress={handletweetLogoClick}>
                            <Image source={require('../assets/twitter.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ color: 'white', alignSelf: 'center', paddingTop: 40, fontSize: 15 }}>
                    Don't have an account?
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{ color: 'black' }}> SignUp</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
};

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
    inputField: {
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
    input: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        paddingVertical: 4,
        opacity: 1,
    },
    eyeIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        opacity: 1,
    },
    loginButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
    },
    loginText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
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