import React, { useState } from "react";
import { Text, View,Image,TouchableOpacity, StyleSheet } from 'react-native';
import InputField from "../components/InputField";




export default LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image source={require('../assets/logo.png')} style={{alignSelf:'center'}}/>
            </View>
            <View style={styles.bottomView}>
                <InputField
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Mobile No or E-Mail" />
                <InputField
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password" />
                <Text style={styles.text}>Forgot password?</Text>
                <TouchableOpacity style={styles.loginbutton}>
                    <Text style={styles.logintext}>Login</Text>
                </TouchableOpacity>
                <Text style={{textAlign:'center',paddingVertical:30,color:'white',fontSize:20}}>---------Or-----------</Text>
                <Image source={require('../assets/SocialMedia.png')} style={{alignSelf:'center'}}/>
                <Text style={{color:'white',alignSelf:'center',paddingTop:40,fontSize:15}}>Don't have an account?<TouchableOpacity onPress={()=>navigation.navigate('SignUp')}><Text style={{color:'black'}}> SignUp</Text></TouchableOpacity></Text>
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
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        paddingTop:60,
    },
    text:{
        color:'white',
    },
    loginbutton:{
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white', // Button color
        borderRadius: 20,
    },
    logintext:{
        color:'black',
        fontSize:20,
        textAlign:'center'
    }
})
