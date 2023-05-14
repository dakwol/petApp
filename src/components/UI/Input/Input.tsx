import React, {FC} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/Colors';
import styles from './styles';
import {translate} from "../../../utils/translate";


interface IInputStyles {
    inputSection?: object;
    tinyLogoRight?: object;
    input?:object;
}

interface Props {
    onChange: any;
    onPress?: any;
    onBlur?: any;
    placeHolderText: string;
    valueText?: string;
    isShowIcon?: boolean;
    icon?: any;
    type?: any;
    isShowRightIcon?: boolean;
    rightIcon?: any;
    isPassword?: boolean;
    extraStyles?: IInputStyles
    borderColor?: any,
    inputRef?: any,
    keyboardType?:string;
};

const Input:FC<Props> = ({
                             onChange,
                             onPress,
                             onBlur,
                             inputRef,
                             placeHolderText,
                             valueText,
                             type = 'none',
                             icon,
                             isShowIcon = false,
                             isShowRightIcon = false,
                             rightIcon,
                             isPassword = false,
                             extraStyles= {
                                 inputSection: {},
                                 tinyLogoRight: {},
                                 input: {}
                             },
                             borderColor,
                             keyboardType = 'default',
                             ...props
                         }) => {

    const stylesSection = {
        borderBottomColor:  (borderColor) ? borderColor: styles.inputSection.borderBottomColor
    }

    return (
        <View style={[styles.inputSection, stylesSection, extraStyles?.inputSection]}>
            {isShowIcon && <Image style={styles.tinyLogo} source={icon} />}
            <TextInput
                style={[styles.input,extraStyles?.input]}
                onChangeText={onChange}
                value={valueText}
                placeholder={placeHolderText}
                textContentType={type}
                placeholderTextColor={colors.silver}
                secureTextEntry={isPassword}
                ref = {inputRef}
                onBlur={onBlur}
                keyboardType={keyboardType}
            />
            {isShowRightIcon && (
                <TouchableOpacity onPress={onPress}>
                    <Image
                        style={[styles.tinyLogo, styles.tinyLogoRight, extraStyles.tinyLogoRight]}
                        source={rightIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Input;
