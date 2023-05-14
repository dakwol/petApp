import React, {FC} from 'react';
import {Modal, Text, TouchableOpacity, View} from "react-native";
import {IModalProps} from "../../../types";
import {styles} from "./styles";
import {capitalizeFirstLetter} from "../../../utils/text";
import {translate} from "../../../utils/translate";
import {colors} from "../../../constants/Colors";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EmergencyModal:FC<IModalProps> = ({isVisible, toggleModal}) => {
    return (
        <>
            {isVisible &&
                <View style={{flex: 1}}>
                    <Modal
                        animationType="slide"
                        visible={isVisible}
                        transparent={true}
                        presentationStyle={"overFullScreen"}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView]}>
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{color: colors.greenPH, fontSize: 22}}>
                                        {translate('event.addEmergencyTitle')}
                                    </Text>
                                </View>
                                <Text>{translate('event.emergencyDescr')}</Text>
                                <TouchableOpacity onPress={() => toggleModal(false)}>
                                    <Text
                                        style={{fontWeight: "bold"}}>{capitalizeFirstLetter(translate('common.close'))}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </>
    );
};

export default EmergencyModal;
