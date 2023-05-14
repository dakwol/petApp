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
import { userCheckFreeNickname } from "../../../../../api/user/userCheckFreeNickname/userCheckFreeNickname";
import { responseWithBadWords } from "../../../../../utils/response";

const UserNickname:FC<IScreen> = ({navigation, route}) => {
    
    const [nickname, setNickname] = useState<any>({});

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);

    useEffect(()=>{
        if(nickname != ''){
            setArrInfo({...arrInfo, nickname: nickname})
        }
    },[nickname])

    const [err, setErr] = useState<boolean>(false)

    const switchScreen = async () => {

            const parentResp = await userCheckFreeNickname(nickname);
            responseWithBadWords({
                resp: parentResp,
                messageBadWords: Dictionary.errors.badWords,
                messageError: [Dictionary.errors.section, parentResp.message].join('.'),
                callBackSuccess: () => {
                    if (parentResp.success) {
                        if(parentResp.data) {
                            navigation.navigate(arrInfo.v_type == 2?
                                'VoluenterScore'
                            : 
                            arrInfo.role == '2'? 
                                'CompanyPhoto'
                                :
                                'UserProfession' 
                            , 
                            {infoUser: arrInfo}
                        )
                        }
                        else {
                            errorMessage({
                                message: translate(Dictionary.user.nicknameTaken),
                            });
                        }
                    }

                },
            })
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
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.nickame')}</Text>
                    <View>
                        <Text style={[{position: "absolute"},{ bottom: 35,fontSize: 11}]}>{translate('registration.nickameText')}</Text>
                         <Input valueText={nickname} onChange={(value:any)=>{setNickname(value)}} placeHolderText={""}></Input>
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

export default UserNickname;