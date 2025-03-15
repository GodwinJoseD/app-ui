import React from "react";
import { StyleSheet } from "react-native";


export const externalStyles = StyleSheet.create({
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

    logintext: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    loginbutton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white', // Button color
        borderRadius: 20,
    }
})