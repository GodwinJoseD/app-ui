import React, { useState } from "react";
import { Text, View, Image, StyleSheet,TouchableOpacity } from "react-native";
import InputField from "../components/InputField";


export default CreateNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image source={require('../assets/CreateNewPassword.png')} style={{ alignSelf: 'center' }} />
            </View>
            <View style={styles.bottomView}>
                <Text>Create New Password</Text>
                <Text>Atleast 9 characters with Uppercase and lowercase letters</Text>
                <InputField
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="New Password" />
                <InputField
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password" />
                    <TouchableOpacity style={styles.button}><Text>Continue</Text></TouchableOpacity>
            </View>
        </View>
    )
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
    button:{
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white', // Button color
        borderRadius: 20,
    },
})