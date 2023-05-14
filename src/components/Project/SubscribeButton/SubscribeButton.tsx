import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import React, {FC} from "react";
import { styles } from "./styles";
import Loading from "../../External/Post/components/Loading";
import { globalStyles } from "../../../constants/globalStyles";

interface ISubscribeButtonProps {
    isLoading: boolean;
    textButton: any;
    isSubscribe: boolean,
    onSubscribe: () => void,
    onUnSubscribe: () => void,
}

const SubscribeButton:FC<ISubscribeButtonProps> = ({
    isLoading,
    textButton,
    isSubscribe,
    onSubscribe,
    onUnSubscribe
}) => {
return (
        <TouchableOpacity style={[styles.redactButton, {marginVertical: 10, width: '50%', marginRight: 10}]} onPress={isSubscribe? onUnSubscribe:onSubscribe}>
            {isLoading?
                <View style={[globalStyles.loading,{alignItems: "flex-start"}]}>
                    <ActivityIndicator size={'small'} color='#fff'/>
                </View>
                :
                <Text style={{color: 'white', fontWeight: 'bold',  textTransform: 'uppercase'}}>{textButton}</Text>
            }
        </TouchableOpacity>
    );
};

export default SubscribeButton;