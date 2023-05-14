import React, {FC} from 'react';
import {TextInputProps as RNTextInputProps, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {globalStyles} from '../../../constants/globalStyles';
import {
    NativeViewGestureHandlerProps
} from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";

interface ITextInputProps {
    placeTextColor?: string,
    err: boolean,
}

const TextInp:FC<
    ITextInputProps
    & RNTextInputProps
    & NativeViewGestureHandlerProps
    & React.RefAttributes<React.ComponentType<any>>> = ({
                                                            placeTextColor,
                                                            style,
                                                            err= false,
                                                            ...props
                                                        }) => {
    const errStyle = err? globalStyles.errorInput : {borderWidth: 0};
    (Array.isArray(style)) ? style.push(errStyle): style = [style, errStyle];
    return (
            <TextInput
                style={style}
                {...props}
            />
    )
}
export default TextInp;
