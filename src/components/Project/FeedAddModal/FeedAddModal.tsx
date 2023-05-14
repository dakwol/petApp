import React, {FC} from 'react';
import Button from "../../UI/Button/Button";
import {capitalizeFirstLetter} from "../../../utils/text";
import {translate} from "../../../utils/translate";
import {SCREENS} from "../../../navigation/screenName";
import {useNavigation} from "@react-navigation/native";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "../../../constants/Colors";

interface IFeedAddModalProps {
    isVisible: boolean,
    toggleModal: () => void,
}

const FeedAddModal:FC<IFeedAddModalProps> = ({
                                                 isVisible,
                                                 toggleModal,
                                                 ...props
                                             }) => {

    const navigation = useNavigation();
    const navigateToEventForm = () => {
        toggleModal();
        // @ts-ignore
        navigation.navigate('CommonNavigator', { screen: 'EventFormScreen', params: {category_id: 0} } );
    }
    const navigateToPostForm = () => {
        toggleModal();
        // @ts-ignore
        navigation.navigate('CommonNavigator', { screen: SCREENS.PostFormScreen } );
    }
    const items = [
        {text:capitalizeFirstLetter(translate('event.event')), icon:"post", action: navigateToEventForm },
        {text:capitalizeFirstLetter(translate('post.post')), icon: "card-text", action: navigateToPostForm },
        {text:capitalizeFirstLetter(translate('common.close')), icon: "close", action: toggleModal }
    ]

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >

            <View style={styles.centeredView}>
                <View style={[styles.modalView,{width:170}]}>
                    {items.map ( (item, indx) =>
                        <TouchableOpacity key={indx} onPress={item.action}>
                            <View style={{
                                paddingHorizontal:20,
                                width:170,
                                flexDirection:"row", alignItems:"center", justifyContent:"space-between",
                                height:45,
                                borderBottomWidth: ((indx === items.length - 1)) ? 0:1,
                                borderColor: colors.black
                            }} >
                                <Text style={{fontWeight: "bold", color:colors.black}}>{item.text}</Text>
                                <Icon name={item.icon} size={24}  />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>

    );
};

export default FeedAddModal;


