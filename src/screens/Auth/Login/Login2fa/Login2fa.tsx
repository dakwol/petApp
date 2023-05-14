import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { FC, useEffect, useRef, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { TouchableOpacity } from "react-native-gesture-handler";
import { userLogin2fa } from "../../../../api/user/userLogin2fa/userLogin2fa";

import Button from "../../../../components/UI/Button/Button";
import { colors } from "../../../../constants/Colors";
import { globalStyles } from "../../../../constants/globalStyles";
import { headerImage } from "../../../../constants/images";
import { IScreen } from "../../../../types";
import { getFormData } from "../../../../utils/formData";
import { errorMessage } from "../../../../utils/showMessage";
import { translate } from "../../../../utils/translate";
import styles from "./styles";

import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../../../../api/user/getUserById/getUserById";
import { setIsLoggedIn, updateUserData, updateUserDataFull } from "../../../../redux/AuthRedux/actions/actionCreator";
import {userRequestCode} from "../../../../api/user/userRequestCode/userRequestCode";

const CELL_COUNT = 4;

const Login2fa:FC<IScreen> = ({navigation, route}) => {


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const dispatch = useDispatch();

    const [codeInfo, setCodeInfo] = useState();

    const [requestType, setRequestType] = useState('call');
    const [requestNumber, setRequestNumber] = useState(0);

    const [resetCall, setResetCall] = useState<boolean>(false);
    const [timerCount, setTimer] = useState(60)

    const requestAuthCode = () => {

        userRequestCode({phone: route.params.phone.slice(1), type: "1"}).then(resp=>{
            //console.log('wzs', resp)
            //console.log('wzs type   = ', requestType);
            //console.log('wzs number = ', requestNumber);

            if(resp.success){
                setCodeInfo(resp.data.code)
                setRequestType(resp.data.request_type);
                setRequestNumber(requestNumber + 1);
                //console.log('wzs code set = ', resp.data.code);
                //if (resp.data.request_type == 'sms') {
                //    setResetCall(true);
                //}
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
            console.log('wzs go check & switch');
            switchScreen()
        }
    },[value])

    const switchScreen = async () => {
        const payload = {
            phone: route.params.phone.slice(1),
            code: value
        }
        //console.log('wzs user entered = ' + value + ' auth code = ' + codeInfo);
        //console.log('wzs payload', payload);

        if(value != ''){
            if(codeInfo == value){
                setErr(false)
                const response = await userLogin2fa(getFormData(payload));
                if (response.data.status === 'success') {
                    await AsyncStorage.setItem('apiToken', response?.data?.token);
                    const userData = await getUserById(response.data.id);
                    dispatch(updateUserDataFull({...userData}));
                    dispatch(updateUserData({...response?.data}));
                    dispatch(setIsLoggedIn(true))

                } else {
                    errorMessage({
                        message: translate("errors." + response?.data?.message?? "unknownError" ),
                    });
                }
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
                        <Text style={{fontWeight: "bold"}}>{route.params.phone}</Text>{' '}
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
                        <TouchableOpacity onPress={()=>{setTimer(59), requestAuthCode()}}>
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



export default Login2fa;
