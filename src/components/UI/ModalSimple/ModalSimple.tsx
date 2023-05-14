import React, {FC, PropsWithChildren, ReactChildren, ReactNode} from 'react';
import {Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Video from "react-native-video";
//@ts-ignore

import {colors} from '../../../constants/Colors';
import {translate} from "../../../utils/translate";

interface IModalSimpleProps {
    isVisible: boolean,
    toggleModal: () => void,
    styleModalView?: any;
    compState: any,

}

const ModalSimple:FC<PropsWithChildren<IModalSimpleProps>> = ({
                                               isVisible,
                                               toggleModal,
                                               styleModalView = {},
                                               compState,
                                               children,
                                               ...props
                                           }) => {


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={[styles.centeredView, {padding:0}]}>
                <View style={[styles.modalView, styleModalView]}>
                    <>{children}</>
                </View>
            </View>
        </Modal>

    );
};

export default ModalSimple;


