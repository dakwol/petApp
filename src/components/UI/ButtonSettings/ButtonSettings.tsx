import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {leftIcon} from '../../../constants/images';
import styles from './styles';
//@ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    action: () => void;
};
const ButtonSettings:FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.action} style={styles.buttonSettings} >
            <View style={styles.container}>
                <Icon name="star" size={15} style={styles.icon}/>
            </View>
        </TouchableOpacity>
    );
};

export default ButtonSettings;
