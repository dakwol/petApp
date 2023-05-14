import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {MaterialIndicator} from 'react-native-indicators';
import {colors} from '../../../constants/Colors';

type Props = {
    text: String;
    action: () => void;
    loading?: boolean;
    styleView?: any;
    styleContainer?: any;
    styleText?: any;
};
const CustomButton:FC<Props> = ({
                              styleView = {},
                              styleContainer = {},
                              styleText = {},
                              ...props}) => {
    const {loading = false} = props;
    return (
        <>
            {loading ? (
                <TouchableOpacity onPress={() => {} } style={[styles.container, styleContainer]}>
                    <MaterialIndicator color={colors.white} size={25} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={props.action} style={[styles.container, styleContainer]}>
                    <View>
                        <Text style={[styles.text,styleText]}>{props.text}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </>
    );
};

export default CustomButton;
