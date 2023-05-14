import React, {FC, useRef, useState} from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {colors} from "../../../constants/Colors";
import { globalStyles } from '../../../constants/globalStyles';

interface ITextAreaProps {
    placeholder?: any;
    onChangeText:((text: string) => void) | undefined;
    value?: any,
    style?: any,
    err?: boolean,
}

const TextArea:FC<ITextAreaProps> = ({
    placeholder,
    onChangeText,
    value = "",
    style,
    err=false,
    ...props
                                     }) => {

    const [scrollEnabled, setScrollEnabled] = useState(false)
    const scrollEnabledTimerRef = useRef()

    return (
        <View>
            <TextInput
                multiline
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.halfCedar}
                style={[style? style : styles.bigInput, err? globalStyles.errorInput : {borderWidth: 1}]}
                onChangeText={onChangeText}
                scrollEnabled={scrollEnabled}
                onBlur={(e) => {
                    // @ts-ignore
                    scrollEnabledTimerRef.current = setTimeout(() => setScrollEnabled(true), 800)
                }}
                onFocus={() => {
                    // @ts-ignore
                    clearTimeout(scrollEnabledTimerRef.current)
                    setScrollEnabled(false)
                }}

                {...props}
            />
        </View>
    )
}
export default TextArea;
