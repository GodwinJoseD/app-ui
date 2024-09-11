import React, {useState, useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,StyleSheet,Alert,SafeAreaView,
  StatusBar,PermissionsAndroid} from 'react-native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    requestStoragePermission();
  }, []);



  // image upload+ add image  concept

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to upload photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePress = () => {
    Alert.alert(
      'Choose Image',
      'Choose from Library or Take Photo',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Choose from Library', onPress: handleImageLaunch},
        {text: 'Take Photo', onPress: handleCameraLaunch},
      ],
      {cancelable: false},
    );
  };

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
  };

  const handleCameraLaunch = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const handleImageLaunch = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  //image uploadImage concept

  const uploadImage = async uri => {
    const adjustedUri = uri.replace('file://', '');
    const formData = new FormData();
    formData.append('photo', {
      uri: adjustedUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch('YOUR_SERVER_URL', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //  Email Validation start

  const handleCheckEmail = text => {
    const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(text);

    if (emailPattern.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleSubmit = () => {
    if (checkValidEmail) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    Alert.alert('Success', 'Profile updated successfully!');
  };

  //  Email validation End//

  // Date Picker start

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    const formattedDate = selectedDate.toLocaleDateString();
    setDate(formattedDate);
    hideDatePicker();
  };

  // Date picker  End

//==============================================//



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#20D4D4"
        fontWeight="bold"
      />

      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={{
              uri:
                imageUri ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLeqsLPT1tjn6erq7O2nrbG0uby/w8bb3t/e4eK5vsHFycvIzM68wcPP09T2uOTLAAADbklEQVR4nO2b23KEIAxAuQQQRf3/vy3spXU7u0qiCZ0p563TlzMhRAhZpTqdTqfT6XQ6nU6n0+l0OqcA58ZYUM5Ba5k7oOI6aO9Nxnsfkh1VczWAddLG6B/yH4NtGzOIyW+VvtX03DBiMOt3UjexYF0jqWg+Sd3EptgiYC7tON2xDbyWvVDd8UnaC8KhVFnIWdZrrLLKXoOkl6u0ko0XLLVWkl6wHmf7xmuU8YLRI6y0DqOIlppQVtqIlAmYMUtY8BLlHrBWWgtUifx5RmMsu1ZtIX1hYj9NoIrDE8+9Gevr+xb2zYisWU+Yaxe+OjyIrFrYUvqE+ctI2oeFwLoXI9FKe1YtS0wt3hIBA1XLcF43HDHjM5w578hWmrOgntDiPEU4amppvfxDLbIV7yL+US3qt4d5JyLurb/grFvkc402rLcf+jeRUerECcKwniDI5y3euw8MxGDx3hRxzZoNzGd5oN18Jl4r4omLv/cWKato+HsjhL0o0NgFSkUV6AcSThEiXXB8pRfp6WJLqlmFWs04K6mHDGTWy0hhvZg/Oy9eqdZLpPn941V7TBV+6XRVTRIv/v5alV8NXqvBHjgZqTeoX15uv64KVdE3YjF8OhX6ocm4wQMXpzcTGkansdFwxgNQcQ4vAy3GByv04Lpv5pRNyxQy0zLMFtoGagM4UGNBAfyBQKmbRtaJ3xS3pnLgnIprGsrylZwypmT/cylvEZQ2yiGy82L8x5mk/K+QbFSCYQMX0xR2p6TuakZPg1USOwBgtItHXK2Nn9bIPPqW4zQE9IUsB21lXEwYV01rQeT1TJHHDFTCB2obsiFen2WfZiYx5K/SxRHbmZlEhezKiIGypyP1xKerPuOgpquk9HUDqfRe/Cex5YoyRn4H/uwVzmYYkJp/h/hzTUu3ckjpMll8Il4wE4t6BYG8I+tuzmQvauKzWmninZs3VjcIWvW9Ijr4bgBw7cEXsPsRIt8e3IAezqO/leNAtTBdxU8HrsEjwkV6QKGBWUby0y/Fq7qPeflRZpf6qUGRXfik9u1FNljVD8aSmVWofPWX24YPqmr9iWEoIlXDn8Rh6hPUvPtTfj1wloqkx/y06CoqDjjS+7BQsRfJo1BntI6TS7w8FJajEiFd4h8cabnh9gNpYQ6n6SHaFhylVqfT6XQ6/5UvpdcqOYZYp6gAAAAASUVORK5CYII=',
            }}
            style={styles.profileImage}
          />
          <View style={styles.addIconContainer}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="  Full Name"
          placeholderTextColor="#abb3bf"
        />
        <TextInput
          style={styles.input}
          placeholder="  User Name"
          placeholderTextColor="#abb3bf"
        />
        <View>
          <TextInput
            onPress={showDatePicker}
            style={styles.input}
            placeholder="  Date Of Birth"
            placeholderTextColor="#abb3bf"
            value={date}
            onChangeText={setDate}
          />
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.iconContainer}>
            <Image
              source={require('../assets/calendar.png')}
              style={{height: 20, width: 20, margin: 5, opacity: 0.4}}
            />
          </TouchableOpacity>
        </View>

        <View>
          
          <TextInput
            style={styles.input}
            placeholder=" E-mail"
            placeholderTextColor="#abb3bf"
            value={email}
            onChangeText={handleCheckEmail}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <Image
              source={require('../assets/Email.png')}
              style={{height: 20, width: 20, margin: 5, opacity: 0.4}}
            />
          </TouchableOpacity>
        </View>

        {checkValidEmail ? (
          <Text style={styles.textFailed}>Wrong format email</Text>
        ) : (
          <Text style={styles.textFailed}></Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

  //=====================================//

 //style Sheet start

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 50,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 260 / 2,
    backgroundColor: '#cccccc',
  },
  addIconContainer: {
    position: 'absolute',
    top: 105,       //plus button access
    left: 95,
    width: 20,
    height: 23,
    borderRadius: 5,
    backgroundColor: '#015093',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    position: 'absolute',
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '300',
    top: -9,
  },
  inputs: {
    flex: 1,
    padding: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 32,
    padding: 16,
    marginBottom: 30,
    backgroundColor: '#ffffff',
    fontSize: 18,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  button: {
    backgroundColor: '#20D4D4',
    padding: 13,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textFailed: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    marginLeft: '62%',
    marginTop: -8,
  },
});

export default ProfileScreen;