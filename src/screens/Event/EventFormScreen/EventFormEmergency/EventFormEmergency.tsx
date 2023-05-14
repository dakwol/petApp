import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {translate} from "../../../../utils/translate";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {styles} from "../../../../components/UI/StarsRating/styles";
import {colors} from "../../../../constants/Colors";
import Button from "../../../../components/UI/Button/Button";
import {capitalizeFirstLetter} from "../../../../utils/text";
import EmergencyModal from "../../../../components/Project/EmergencyModal/EmergencyModal";

interface IEventFormEmergencyProps {
    showText?: boolean,
    showIcon?: boolean,
    iconSize?: number,
}

const EventFormEmergency:FC<IEventFormEmergencyProps> = ({showText=true, showIcon= true, iconSize=22}) => {
    const [fullView, setFullView] = useState(false);
    const toggleModal = () => {
        setFullView(!fullView);
    }
    return (
        <>
            <EmergencyModal isVisible={fullView}  toggleModal={toggleModal}/>
            <View style={{alignItems:"center", justifyContent: "center"}}>
                <TouchableOpacity onPress={ toggleModal }>
                    <Text style={{color: colors.greenPH, fontSize: 22}}>
                        {showText && translate('event.addEmergencyTitle')  + ' ' }
                        {showIcon && <Icon name="help-circle" size={iconSize} style={{color: colors.greenPH}}/> }
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default EventFormEmergency;
