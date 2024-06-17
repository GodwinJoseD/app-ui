import React from "react";
import {View,TextInput,StyleSheet, ImageBackground} from 'react-native';

export default InputField=({value,placeholder,onChangeText})=>{
    return (
        <View>
        <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='white'/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 50,
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      color:'white',
      borderRadius:30,
      borderWidth:2,
      fontSize:15
    },
});