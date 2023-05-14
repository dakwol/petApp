import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

type Props = {
    text: String;
    action: () => void;
    styleContainer?: object;
    styleText?: object;
};
const SubButton:FC<Props> = ({
                                 text,
                                 action,
                                 styleContainer= {},
                                 styleText={}
}) => {
    return (
        <TouchableOpacity onPress={action} style={[styles.container,styleContainer]}>
            <View>
                <Text style={[styles.text,styleText]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SubButton;
