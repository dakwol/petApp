import React, {FC} from 'react';
import {Share, Linking, Platform, Modal, Text, TouchableOpacity, View} from "react-native";
import {IModalProps} from "../../../types";
import {styles} from "./styles";
import {capitalizeFirstLetter} from "../../../utils/text";
import {translate} from "../../../utils/translate";
import {colors} from "../../../constants/Colors";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { selectContactPhone } from 'react-native-select-contact';
import { requestContactPermission } from '../../../utils/permissions';
import { Dictionary } from "../../../locales/dictionary";

const InviteFriendModal:FC<IModalProps> = ({isVisible, toggleModal}) => {
    const getSMSDivider = () => {
        return Platform.OS === "ios" ? "&" : "?";
    }

    const getPhoneNumber = () => {
        requestContactPermission().then(permited => {
            if (permited) {
                selectContactPhone()
                .then(selection => {
                    if (!selection) {
                        return null;
                    }

                    const message = translate(Dictionary.profile.inviteFriendMessage);
                    const { selectedPhone } = selection;
                    const url = `sms:${selectedPhone.number}${getSMSDivider()}body=${message}`

                    Linking.openURL(url)
                    return selectedPhone.number;
                });
            }
        })
        toggleModal()
    }

    const shareLink = async () => {
        try {
          const result = await Share.share({
            message: translate(Dictionary.profile.inviteFriendMessage),
            title: "ЗооКлик",
            url: "https://zoo-click.com/storelink"
          });
        } catch (error) {
          console.log(error);
        }
        toggleModal();
      };

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            transparent={true}
            presentationStyle={"overFullScreen"}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <TouchableOpacity onPress={ () => shareLink() }>
                        <Text style={styles.modalEntry}>{translate(Dictionary.profile.shareLink)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => getPhoneNumber() }>
                        <Text style={styles.modalEntry}>{translate(Dictionary.profile.sendInvite)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => toggleModal() }>
                        <Text style={styles.modalEntry}>{capitalizeFirstLetter(translate('common.close'))}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default InviteFriendModal;
