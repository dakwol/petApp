import React, { FC, useEffect, useState } from "react";
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles} from "../../../../../constants/globalStyles";
import { headerImage } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { translate } from "../../../../../utils/translate";
import styles from "./styles";
import CheckBox from "@react-native-community/checkbox";
import { errorMessage } from "../../../../../utils/showMessage";

const ActivityCategory:FC<IScreen> = ({navigation, route}) => {

    const [checkBox, setCheckBox] = useState(false)
    const [checkBoxTwo, setCheckBoxTwo] = useState(false)
    const [check, setCheck] = useState<number>()

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);

    useEffect(()=>{
        setArrInfo({...arrInfo, is_entrepreneur: (checkBox || checkBoxTwo)? check : '', service_role: checkBox? 2 : 3})
    },[check])

    console.log(arrInfo)

    
    const selectedCheck = (checkIndex: number) => { 
        if(checkIndex === 0) {
            setCheckBox(!checkBox);
            setCheckBoxTwo(false);
            setCheck(checkIndex)
        } else {
            setCheckBox(false);
            setCheckBoxTwo(!checkBoxTwo);
            setCheck(checkIndex)
        }
    }

    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(checkBox || checkBoxTwo){
            setErr(false)
            if(check === 0){
                navigation.navigate('UserInfo', { infoUser: arrInfo })
            } else {
                navigation.navigate('CompanyName', { infoUser: arrInfo })
            }
           
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }


    return (
            <SafeAreaView style={[globalStyles.vwFlexOne,{justifyContent: "space-between", alignItems: "center",  marginTop: 60}]}>
                <Image source={headerImage}/>
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.howWork')}</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {Platform.OS === 'ios' ? (
                            <CheckBox
                                boxType="square"
                                value={checkBox}
                                onChange={() => selectedCheck(0)}
                                onCheckColor={colors.greenPH}
                                onAnimationType={'fill'}
                                style={{transform: [{scale: .8}]}}
                            />
                            ) : (
                            <CheckBox
                                value={checkBox}
                                onValueChange={()=>selectedCheck(0)}
                                tintColors={{true: colors.greenPH}}
                            />
                        )}
                        <Text style={styles.textCheck}>{translate('registration.ex_privateSpec')}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {Platform.OS === 'ios' ? (
                            <CheckBox
                                boxType="square"
                                value={checkBoxTwo}
                                onChange={() => selectedCheck(1)}
                                onCheckColor={colors.greenPH}
                                onAnimationType={'fill'}
                                style={{transform: [{scale: .8}]}}
                            />
                            ) : (
                            <CheckBox
                                value={checkBoxTwo}
                                onValueChange={()=>selectedCheck(1)}
                                tintColors={{true: colors.greenPH}}
                            />
                        )}
                        <Text style={styles.textCheck}>{translate('registration.ex_companySpec')}</Text>
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
            </SafeAreaView>
    )
}



export default ActivityCategory;