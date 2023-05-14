import React, { FC, useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { headerImage, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";

const UserInfo:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [userLastName, setUserLastName] = useState<string>(arrInfo.last_name == ''? '' : arrInfo.last_name);
    const [userFirstName, setUserFirstName] = useState<string>(arrInfo.first_name == ''? '' : arrInfo.first_name);
    const [userMiddleName, setUserMiddleName] = useState<string>(arrInfo.middle_name == ''? '' : arrInfo.middle_name);

    useEffect(()=>{
        setArrInfo({
            ...arrInfo, 
            last_name: userLastName, 
            first_name: userFirstName, 
            middle_name: userMiddleName
        })
    },[userLastName, userFirstName, userMiddleName])

    console.log(arrInfo)

    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(userLastName && userFirstName && userMiddleName){
            setErr(false)
            navigation.navigate(arrInfo.role == '1'? 'UploadDocumentsVoluenter' : 'VoluenteerType', {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }

    return (
        <KeyboardAvoidingView    
            style={
                [globalStyles.vwFlexOne, 
                    {justifyContent: "space-between", alignItems: "center",  marginTop: 60}
                ]
            } 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={20}
        >
                 <Image source={petHelp} />
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.howUser')}</Text>
                    <Text style={{fontSize: 12, width: SCREEN_WIDTH - 50, marginBottom: 10, fontWeight: "bold"}}>{translate('registration.ex_howUserInfo')}</Text>
                    <View style={{alignSelf: "center"}}>
                        <View style={{marginBottom: 10}}>
                            <Text style={[{fontSize: 12}]}>{translate('registration.ex_lastName')}</Text>
                            <Input
                                valueText={arrInfo.last_name}
                                onChange={(value: string)=>{setUserLastName(value)}} 
                                placeHolderText={""}
                                extraStyles={{input: {margin: 0, width: SCREEN_WIDTH-30}, inputSection: {width: SCREEN_WIDTH-30, justifyContent: "center", alignItems: "center"}}}
                            />
                        </View>
                        <View style={{marginBottom: 10, }}>
                            <Text style={[{fontSize: 12}]}>{translate('registration.ex_firstName')}</Text>
                            <Input
                                valueText={arrInfo.first_name}
                                onChange={(value: string)=>{setUserFirstName(value)}} 
                                placeHolderText={""}
                                extraStyles={{input: {margin: 0, width: SCREEN_WIDTH-30}, inputSection: {width: SCREEN_WIDTH-30, justifyContent: "center", alignItems: "center"}}}
                            />
                        </View>
                        <View style={{marginBottom: 10}}>
                            <Text style={[{fontSize: 12}]}>{translate('registration.ex_middleName')}</Text>
                            <Input
                                valueText={arrInfo.middle_name}
                                onChange={(value: string)=>{setUserMiddleName(value)}} 
                                placeHolderText={""}
                                extraStyles={{input: {margin: 0, width: SCREEN_WIDTH-30}, inputSection: {width: SCREEN_WIDTH-30, justifyContent: "center", alignItems: "center"}}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{height: 150}}>
                    <Button 
                        text={translate('common.continue')} 
                        action={()=>{switchScreen()}} 
                    />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}



export default UserInfo;