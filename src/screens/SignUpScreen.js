import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';
import InputField from "../components/InputField";

export default SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSelected, setSelection] = useState(false);
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
                    placeholder="Mobile No or E-mail" />
                <TouchableOpacity style={styles.loginbutton}>
                    <Text style={styles.logintext}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', paddingVertical: 30, color: 'white', fontSize: 20 }}>---------Or-----------</Text>
                <Image source={require('../assets/SocialMedia.png')} style={{ alignSelf: 'center' }} />
                <Text style={{ color: 'white', alignSelf: 'center', paddingTop: 40, fontSize: 15 }}>Already have an account?<TouchableOpacity onPress={()=>navigation.navigate('LogIn')}><Text style={{ color: 'black' }}> Sign In</Text></TouchableOpacity></Text>
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
    },
    loginbutton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white', // Button color
        borderRadius: 20,
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
        backgroundColor: '#20D4D4', // Set the same background color as the container
        borderWidth: 0, // Remove border if necessary
    },
})
