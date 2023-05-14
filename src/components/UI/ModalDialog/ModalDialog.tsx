import React, {FC} from 'react';
import {Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "../../../constants/Colors";

interface IModalDialogProps {
    isVisible: boolean,
    toggleModal: () => void,
    items: {text:string, icon:string, action?: () => void}[],
}

const ModalDialog:FC<IModalDialogProps> = ({
                                               isVisible,
                                               toggleModal,
                                               items= [],
                                               ...props
                                           }) => {
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >

            <View style={styles.centeredView}>
                <View style={[styles.modalView,{width:170}]}>
                    {items.map ( (item, index) =>
                        <TouchableOpacity key={index} onPress={item.action}>
                            <View style={{
                                paddingHorizontal:20,
                                width:170,
                                flexDirection:"row", alignItems:"center", justifyContent:"space-between",
                                height:45,
                                borderBottomWidth: ((index === items.length - 1)) ? 0:1,
                                borderColor: colors.black
                            }} >
                                <Text style={{fontWeight: "bold", color:colors.black, marginRight: 5}}>{item.text}</Text>
                                <Icon name={item.icon} size={24} />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>

    );
};

export default ModalDialog;





