import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

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
const ButtonOutline:FC<Props> = ({
                                     styleView = {},
                                     styleContainer = {},
                                     styleText = {},
                                     ...props}) => {
    const {loading = false} = props;
    return (
        <></>
        /*
        <TouchableOpacity onPress={props.action} style={[styles.container, styleContainer]}>
            {loading ? (
                <MaterialIndicator color={colors.white} size={25} />
            ) : (
                <View>
                    <Text style={[styles.text,styleText]}>{props.text}</Text>
                </View>
            )}
        </TouchableOpacity>

         */
    );
};

export default ButtonOutline;
