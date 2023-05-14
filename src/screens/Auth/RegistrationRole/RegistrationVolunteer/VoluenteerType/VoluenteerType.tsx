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

const VoluenteerType:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [isSelected, setIsSelected] = useState<number>(); 
    const [isSelectedScreen, setIsSelectedScreen] = useState<string>(''); 

    const buttonHandler = (type:any) =>
    {
        setIsSelected(type);
        
    }
    

    useEffect(()=>{
        setArrInfo({...arrInfo, v_type: isSelected, service_role: isSelected == 0? 4 : isSelected == 1? 5 : 6})
        setIsSelectedScreen(isSelected == 0? 'Registration' : (isSelected == 1? 'RegistrationExecuter' : 2? 'Voluenter' : ''))
    },[isSelected,isSelectedScreen])

    

    console.log(isSelected)

    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(isSelected != undefined){
            setErr(false)
            navigation.navigate('RequisitesVolunter', {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }

    return (
        <SafeAreaView style={[globalStyles.vwFlexOne, {justifyContent: "space-between"}]}>
            <View style={{justifyContent: "space-between", alignItems: "center"}}>
                <Image source={headerImage}  style={{justifyContent: "center", alignSelf: "center", marginTop: 60}}/>
                <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginTop: 20, width: 200,textAlign: "center"}}>Как вы помогаете животным?</Text>
                <View style={{flex: 1, justifyContent: "center"}}>
                    
                    <Button
                        styleContainer={isSelected === 0? {marginBottom: 20} : styles.whiteBtn}
                        styleText={[isSelected === 0? {color: colors.white} :{color: colors.greenPH}, {textTransform: "uppercase"}]} 
                        text={translate('auth.physicalPerson')} 
                        action={()=>{buttonHandler(0)}}
                    />
                    <Button
                        styleContainer={isSelected === 1? {marginBottom: 20} : styles.whiteBtn} 
                        styleText={[isSelected === 1? {color: colors.white} :{color: colors.greenPH}, {textTransform: "uppercase"}]} 
                        text={translate('auth.individualEntrepreneur')} 
                        action={()=>{buttonHandler(1)}}
                    />
                    <Button
                        styleContainer={isSelected === 2? {marginBottom: 20} : styles.whiteBtn} 
                        styleText={[isSelected === 2? {color: colors.white} : {color: colors.greenPH}, {textTransform: "uppercase"}]} 
                        text={translate('auth.legalEntity')} 
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
}



export default VoluenteerType;