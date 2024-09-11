import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
} from 'react-native';

const OtpVerificationScreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']); // Array to hold each digit

  // Handler for input change
  const handleChange = (value, index) => {
    let newOtp = [...otp];

    // Handle deletion
    if (value === '' && index > 0) {
      newOtp[index] = ''; // Clear current input
      setOtp(newOtp);
      refs[index - 1].focus(); // Move to previous input field
    } else {
      newOtp[index] = value; // Set the current value
      setOtp(newOtp);

      // Move to the next input field
      if (value && index < 3) {
        refs[index + 1].focus();
      }
    }
  };

  const verifyOtp = () => {
    const otpCode = otp.join(''); // Join the digits to form the OTP code
    if (otpCode.length === 4) {
      // Example verification logic
      Alert.alert('OTP Verified', 'Your OTP code is ${otpCode}');
      navigation.navigate('CreateNewPassword'); // Navigate to another screen
    } else {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit OTP');
    }
  };

  // Array to hold references to the input fields
  const refs = [];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        fontWeight="bold"
      />
      <View style={styles.topView}>
        <Image
          source={require('../assets/EnterOTP.png')}
          style={{
            alignSelf: 'center',
            height: '100%',
            width: '59%',
            marginTop: 13,
          }}
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.titleText}>OTP Verification</Text>
        <Text style={styles.instructionText}>
          A 4 Digit Code has been Set to register Mobile No or E-Mail
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={input => (refs[index] = input)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={value => handleChange(value, index)}
              value={digit}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
        <Text style={styles.resendText}>
          Don't get a code? <Text style={styles.resendLink}>Resend</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45,
  },
  bottomView: {
    backgroundColor: '#20D4D4',
    height: '70%',
    paddingHorizontal: 20,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 55,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: -10,
  },
  instructionText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 17.5,
    fontWeight: '500',
    paddingBottom: 35,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  otpInput: {
    width: 68,
    height: 75,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'white',
    textAlign: 'center',
    color: 'white',
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#20D4D4',
    marginHorizontal: 12,
  },
  verifyButton: {
    width: '95%',
    marginTop: 25,
    padding: 13,
    backgroundColor: 'white', // Button color
    borderRadius: 20,
  },
  verifyButtonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  resendText: {
    color: 'white',
    alignSelf: 'center',
    paddingTop: 40,
    fontSize: 17,
  },
  resendLink: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18.5,
  },
});

export default OtpVerificationScreen;