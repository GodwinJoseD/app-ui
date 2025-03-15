import React, { useState, useEffect, useRef } from 'react';
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

const OtpVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']); // Array to hold each digit
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

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

  const verifyOtp = async () => {
    const otpCode = otp.join(''); // Join the digits to form the OTP code
    if (otpCode.length === 4) {
      try {
        const response = await fetch('http://localhost:5000/api/otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber, otp: otpCode }),
        });
        console.log('OTP verification request sent:', response);
        console.log(JSON.stringify({ phoneNumber, otp: otpCode }));
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'OTP verification failed');
        }

        const data = await response.json();
        console.log('OTP verification successful:', data);
        // Handle successful OTP verification (e.g., save token, redirect, etc.)
        navigation.navigate('LoginScreen');
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage(error.message);
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit OTP');
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/otp/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      console.log('OTP resend request sent:', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      const data = await response.json();
      console.log('OTP resent successfully:', data);
      setIsResendDisabled(true);
      setTimer(30);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

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
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
        <Text style={styles.resendText}>
          Don't get a code?{' '}
          <TouchableOpacity
            onPress={resendOtp}
            disabled={isResendDisabled}
          >
            <Text style={styles.resendLink}>
              Resend {isResendDisabled ? `(${timer}s)` : ''}
            </Text>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OtpVerificationScreen;