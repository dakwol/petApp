import React, { FC, useEffect, useRef, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_WIDTH } from "../../../../../constants/globalStyles";
import { headerImage } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { translate } from "../../../../../utils/translate";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IRegistrationFormData } from "../../../Registration/types";
import { exRegData } from "../../../Registration/prepare";
import { errorMessage } from "../../../../../utils/showMessage";
import { userRequestCall } from "../../../../../api/user/userRequestCall/userRequestCall";
import { userRequestCode } from "../../../../../api/user/userRequestCode/userRequestCode";

  const CELL_COUNT = 4;

const ConfirmNumber:FC<IScreen> = ({navigation, route}) => {
    

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [codeInfo, setCodeInfo] = useState();
    const [resetCall, setResetCall] = useState<boolean>(false);
    const [timerCount, setTimer] = useState(60)
    const [requestType, setRequestType] = useState('call');
    const [requestNumber, setRequestNumber] = useState(0);

    const requestAuthCode = () => {

        userRequestCode({phone: route.params.infoUser.phone, type: 0}).then(resp=>{
            if(resp.success){
                setCodeInfo(resp.data.code)
                setRequestType(resp.data.request_type);
                setRequestNumber(requestNumber + 1);
            } else {
                setRequestNumber(requestNumber + 1);
                errorMessage({
                    message: translate("errors.unknownError"),
                });
            }
        })

        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }


    useEffect(()=>{
        requestAuthCode();
    },[])

    
    const [err, setErr] = useState<boolean>(false)

    useEffect(()=>{
        if(value.length == 4){
                switchScreen()
        }
    },[value])
    
    const switchScreen = () => {
        if(value != ''){
            if(codeInfo == value){
                setArrInfo({...arrInfo, ur_verify: value})
                setErr(false)
                navigation.navigate(arrInfo.role == '1'? 'ActivityCategory' : 'UserInfo', {infoUser: arrInfo})
            } else {
                errorMessage({
                    message: translate("errors.Invalid_code"),
                });
            }
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
                    [globalStyles.vwFlexOne, {justifyContent: "space-between", alignItems: "center",  marginVertical: 60}
                    ]
                } 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={20}
            >
                <Image source={headerImage}/>
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('auth.verificationCode')}</Text>
                    <View style={{width: SCREEN_WIDTH - 100, alignSelf: "center"}}>
                        <Text style={styles.descriptionMsgText}>
                            {!resetCall? translate("registration.ex_phoneOne") : translate("registration.ex_smsOne") } {' '}
                            <Text style={{fontWeight: "bold"}}>7{route.params.infoUser.phone}</Text>{' '}
                            <Text style={styles.descriptionMsgText}>{translate("registration.ex_phoneTwo") }</Text>{' '}
                            <Text style={{fontWeight: "bold"}}>{translate("registration.ex_phoneThr") } {' '}</Text>
                            <Text style={styles.descriptionMsgText}>{translate("registration.ex_phoneFor") }</Text>.
                        </Text>
                    </View>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell, Platform.OS == 'ios' && {lineHeight: 60}]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                        )}
                    />
                    <View style={{alignSelf: "center"}}>
                        {timerCount > 0? 
                            <Text>Позвонить ещё раз через 00:{
                                timerCount < 10?
                                '0' + timerCount
                                :
                                timerCount
                            }</Text>
                            :
                            <TouchableOpacity onPress={()=>{setTimer(59), setResetCall(!resetCall)}}>
                                <Text>Повторить</Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.descriptionMsg}>
                    <Text style={styles.descriptionMsgText}>
                      {translate("registration.userAgreement1") } {' '}
                      <Text style={styles.textLink}>{translate("registration.userAgreement2") }</Text>{' '}
                      {translate("registration.userAgreement3") } {' '}
                      <Text style={styles.textLink}>{translate("registration.userAgreement2") }</Text>.
                    </Text>
                  </View>
                </View>
                
                <View>
                    <Button text={translate('common.continue')} action={()=>{switchScreen()}} />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}



export default ConfirmNumber;