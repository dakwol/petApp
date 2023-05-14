import React, { FC, useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../../../components/UI/Button/Button";
import Input from "../../../../components/UI/Input/Input";
import SubButton from "../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../constants/Colors";
import { globalStyles, SCREEN_WIDTH } from "../../../../constants/globalStyles";
import { headerImage } from "../../../../constants/images";
import navigation from "../../../../navigation";
import { IScreen } from "../../../../types";
import { errorMessage } from "../../../../utils/showMessage";
import { translate } from "../../../../utils/translate";
import MaskInput from 'react-native-mask-input';
import {userCheckFreeEmail} from "../../../../api/user/userCheckFreeEmail/userCheckFreeEmail";
import {Dictionary} from "../../../../locales/dictionary";
import {userCheckFreePhone} from "../../../../api/user/userCheckFreePhone/userCheckFreePhone";

const RegistrationExecuter:FC<IScreen> = ({navigation, route}) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [phone, setPhone] = useState<any>({});

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);


    useEffect(()=>{
        setArrInfo({...arrInfo, phone: phone.unmasked})
    },[phone])

    const [err, setErr] = useState<boolean>(false)

    const switchScreen = () => {
        //console.log(phone.unmasked)
        if(phone.unmasked != undefined && phone.unmasked.length == 10){
            setErr(false)
            userCheckFreePhone(phone.unmasked).then(resp=>{
                if (resp.success) {
                    if(resp.data) {
                        navigation.navigate('UserRegEmail', {infoUser: arrInfo})
                    } else {
                        errorMessage({
                            message: translate(Dictionary.user.phoneTaken),
                        });
                    }
                }
            });
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_phone_field_is_required"),
            });
        }

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
                <Image source={headerImage}  />
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('auth.registration')}</Text>
                    <View>
                        <Text style={[{fontSize: 14}]}>{translate('registration.ex_reg')}</Text>
                         <MaskInput
                            value={phone.masked}
                            style={{width: SCREEN_WIDTH - 50, alignSelf: "center", fontSize:18, borderBottomWidth: 1, borderBottomColor: colors.greenPH}}
                            onChangeText={(masked, unmasked) => {
                                setPhone({masked, unmasked});
                            }}
                            mask={['+','7','(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            keyboardType="number-pad"
                        />
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

export default RegistrationExecuter;
