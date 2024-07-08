import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default OtpVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    //alert(`OTP entered: ${otp.join('')}`);
    navigation.navigate('CreateNewPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Image source={require('../assets/EnterOTP.png')} style={{ alignSelf: 'center' }} />
      </View>
      <View style={styles.bottomView}><Text style={{ color: 'white', textAlign: 'center', fontSize: 30, paddingBottom: 20 }}>OTP Verification</Text>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, paddingBottom: 20 }}>A 4 Digit Code has been sent to your registered Mobile No or E-Mail</Text>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={value}
              onChangeText={(text) => handleChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', alignSelf: 'center', paddingTop: 40, fontSize: 15 }}>Don't Get a Code? <Text style={{ color: 'black' }}>Resend</Text></Text></View>
    </View >


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
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    backgroundColor: '#20D4D4',
    marginHorizontal: 5
  },
  verifyButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white', // Button color
    borderRadius: 20,
  },
  verifyButtonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  resendLink: {
    color: '#00796b',
    fontWeight: 'bold',
  },
});