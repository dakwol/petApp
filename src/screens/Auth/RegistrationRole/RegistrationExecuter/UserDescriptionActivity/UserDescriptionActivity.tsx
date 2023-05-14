import React, { FC, useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_WIDTH } from "../../../../../constants/globalStyles";
import { headerImage } from "../../../../../constants/images";
import navigation from "../../../../../navigation";
import { IScreen } from "../../../../../types";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";
import MaskInput from 'react-native-mask-input';
import { userCheckFreeEmail } from "../../../../../api/user/userCheckFreeEmail/userCheckFreeEmail";
import { Dictionary } from "../../../../../locales/dictionary";
import TextArea from "../../../../../components/UI/TextArea/TextArea";

const UserDescriptionActivity:FC<IScreen> = ({navigation, route}) => {
    
    const [description, setDescription] = useState<string>('');
    const [descriptionLength, setDescriptionLength] = useState<number>(0);

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);

    const validate = (value:string) => {
      
            setDescription(value.substring(0, 70))
        
    }

    useEffect(()=>{
        if(descriptionLength <= 70){
            setArrInfo({...arrInfo,  ur_description: description})
        }
    },[description])

    const [err, setErr] = useState<boolean>(false)

    const switchScreen = () => {
            setErr(false)
            navigation.navigate('UserNickname', {infoUser: arrInfo})
    }

  
    return (
            <KeyboardAvoidingView 
                style={
                    [globalStyles.vwFlexOne, 
                        {justifyContent: "space-between", alignItems: "center",  marginVertical: 60}
                    ]
                } 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={20}
            >
                <Image source={headerImage}/>
                <View style={{marginHorizontal: 20}}>
                    <View style={{marginBottom: 20}}>
                        <View style={{marginBottom: 30}}>
                            <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.tellAboutTitle')}</Text>
                            <Text style={{fontSize: 12}}>{translate('registration.tellAboutText')}</Text>
                        </View>
                        <View>
                            <TextArea
                                value={description}
                                onChangeText={value => validate(value)}
                            />
                            <Text>{description.length}/70</Text>
                        </View>
                    </View>
                    
                    
                </View>
                <View>
                    <Button text={translate('common.continue')} action={()=>switchScreen()} />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}

export default UserDescriptionActivity;