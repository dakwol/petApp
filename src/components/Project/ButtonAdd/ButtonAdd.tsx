import {Image, TouchableOpacity} from "react-native";
import {addIcon} from "../../../constants/images";
import React, {FC} from "react";

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
const ButtonAdd:FC<IButtonAddProps> = ({
                                           buttonSize= 32,
                                           onPress
                                       }) => {
    return (
        <TouchableOpacity
            style={{justifyContent: "center"}}
            onPress={ onPress }>
            <Image style={{width: buttonSize, height: buttonSize }} source={addIcon} />
        </TouchableOpacity>
    );
};

export default ButtonAdd;
