import {Image, TouchableOpacity} from "react-native";
import {addIcon} from "../../../constants/images";
import React, {FC} from "react";
import { translate } from "i18n-js";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../../../constants/Colors";

interface IButtonAddProps {
    buttonSize: number,
    onPress: () => void
}

/**
 *
 * @param buttonSize
 * @param onPress
 * @constructor
 * @author ArtemMraka
 */
const ButtonDelete:FC<IButtonAddProps> = ({
                                           buttonSize= 32,
                                           onPress
                                       }) => {
    return (
        <TouchableOpacity
            style={{justifyContent: "center"}}
            onPress={ onPress }>
            <AntDesign name="close" size={buttonSize} color={'white'} style={{backgroundColor: colors.red, borderRadius:50}}/>
        </TouchableOpacity>
    );
};

export default ButtonDelete;
