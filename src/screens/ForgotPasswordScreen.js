import React,{useState} from "react";
import { Text, View,Image,TouchableOpacity, StyleSheet } from 'react-native';
import InputField from "../components/InputField";

export default ForgotPasswordScreen=({navigation})=>{
    const [email,setEmail] = useState('');
    return(
        <View style={styles.container}> 
            <View style={styles.topView}>
                <Image source={require('../assets/Forgot_Password.png')} style={{ alignSelf: 'center',marginTop:30 }}/>
            </View>
            <View style={styles.bottomView}>
                <Text style={{color:'white',textAlign:'center',fontSize:30,paddingBottom:30}}>Forgot Password</Text>
                <Text style={{color:'white',textAlign:'center',fontSize:15,paddingBottom:30}}>You will receive a otp for your registered Mobile No or E-Mail</Text>
                <InputField
                style={{paddingVertical:50}}
                value={email}
                onChangeText={setEmail}
                placeholder="Mobile No or E-Mail"/>
                <TouchableOpacity style={styles.forgotpassword} onPress={()=>navigation.navigate('VerifyOtp')}>
                    <Text style={styles.sendotptext}>Send OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
        },
        topView: {
            backgroundColor: 'white',
            height: '35%',
        },
        bottomView: {
            backgroundColor: '#20D4D4',
            height: '65%',
            paddingHorizontal: 20,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            paddingTop: 60,
          },
          forgotpassword:{
            marginTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'white', // Button color
            borderRadius: 20,
        },
        sendotptext:{
            color:'black',
            fontSize:20,
            textAlign:'center'
        }
})