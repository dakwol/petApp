import React, { FC, useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { check } from "react-native-permissions";
import Button from "../../../components/UI/Button/Button";
import SubButton from "../../../components/UI/SubButton/SubButton";
import { colors } from "../../../constants/Colors";
import { globalStyles } from "../../../constants/globalStyles";
import { beingGoodSimple, headerImage, logoPH, petHelp } from "../../../constants/images";
import navigation from "../../../navigation";
import { IScreen } from "../../../types";
import { errorMessage } from "../../../utils/showMessage";
import { translate } from "../../../utils/translate";
import styles from "./styles";

const RegistrationRole:FC<IScreen> = ({navigation}) => {

    const [isSelected, setIsSelected] = useState<number>(); 
    const [isSelectedScreen, setIsSelectedScreen] = useState<string>(''); 

    const [arrInfo, setArrInfo] = useState<any>({});

    const buttonHandler = (type:any) =>
    {
        setIsSelected(type);
        
    }
    
    useEffect(()=>{
        setArrInfo({...arrInfo, role: JSON.stringify(isSelected)})
        setIsSelectedScreen(isSelected == 0? 'Registration' : (isSelected == 1? 'RegistrationExecuter' : 2? 'Voluenter' : ''))
    },[isSelected,isSelectedScreen])

    const [err, setErr] = useState<boolean>(false)

    const switchScreen = () => {
        if(isSelected != undefined || null){
            setErr(false)
            navigation.navigate(isSelectedScreen, {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_phone_field_is_required"),
            });
        }
       
    }

    return (
        <SafeAreaView style={[globalStyles.vwFlexOne, {justifyContent: "space-between"}]}>
            <View style={{justifyContent: "space-between", alignItems: "center"}}>
                <Image source={headerImage}  style={{justifyContent: "center", alignSelf: "center", marginTop: 60}}/>
                <View style={{flex: 1, justifyContent: "center"}}>
                    
                    <Button
                        styleContainer={isSelected === 0? {marginBottom: 20} : styles.whiteBtn}
                        styleText={isSelected === 0? {color: colors.white} :{color: colors.greenPH}} 
                        text={translate('auth.privatePerson')} 
                        action={()=>{buttonHandler(0)}}
                    />
                    <Button
                        styleContainer={isSelected === 1? {marginBottom: 20} : styles.whiteBtn} 
                        styleText={isSelected === 1? {color: colors.white} :{color: colors.greenPH}} 
                        text={translate('auth.Executor')} 
                        action={()=>{buttonHandler(1)}}
                    />
                    <Button
                        styleContainer={isSelected === 2? {marginBottom: 20} : styles.whiteBtn} 
                        styleText={isSelected === 2? {color: colors.white} : {color: colors.greenPH}} 
                        text={translate('auth.Volunteer')} 
                        action={()=>{buttonHandler(2)}} 
                    />
                </View>
                <View style={{marginBottom: 60}}>
                    <Button text={translate('common.continue')} action={()=>{switchScreen()}} />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default RegistrationRole;