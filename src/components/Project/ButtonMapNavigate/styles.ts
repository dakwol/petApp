import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: 38,
        borderRadius: 3,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: .7,
        position: 'absolute',
        zIndex: 1000,
        right: 12,
        bottom: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },
    buttonText: {
        color: colors.black,
        fontFamily: fonts.Bold,
        fontSize: 16
    },
});

export default styles;