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
import styles from "./styles";

const CompanyName:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyUser, setCompanyUser] = useState<string>('');

    useEffect(()=>{
        setArrInfo({...arrInfo, company_name: companyName, last_name: companyUser.split(' ')[0], first_name: companyUser.split(' ')[1], middle_name: companyUser.split(' ')[2]})
    },[companyName, companyUser])

    console.log(arrInfo)

    const [isFocus, setIsFocus] = useState<boolean>(false);



    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(companyName && companyUser){
            setErr(false)
            navigation.navigate('UserInfo', {infoUser: arrInfo})
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
                <Image source={petHelp}  />
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.howCompanyName')}</Text>
                    <View>
                        <View style={{marginBottom: 10}}>
                            <Text style={[{ fontSize: 12}]}>{translate('registration.ex_companyName')}</Text>
                            <Input
                                onChange={(value: string)=>{setCompanyName(value)}} 
                                placeHolderText={""}
                                extraStyles={{input: {margin: 0, width: SCREEN_WIDTH-30}, inputSection: {paddingLeft: 20,width: SCREEN_WIDTH-50, justifyContent: "center", alignItems: "center"}}}
                            />
                        </View>
                        <View style={{marginBottom: 10}}>
                            <Text style={[ {fontSize: 12}]}>{translate('registration.ex_nameUserCompany')}</Text>
                            <Input
                                onChange={(value: string)=>{setCompanyUser(value)}} 
                                placeHolderText={""}
                                extraStyles={{input: {margin: 0, width: SCREEN_WIDTH-30}, inputSection: {paddingLeft: 20,width: SCREEN_WIDTH-50, justifyContent: "center", alignItems: "center"}}}
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



export default CompanyName;