import React, { FC, useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../../../components/UI/Button/Button";
import Input from "../../../../components/UI/Input/Input";
import SubButton from "../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../constants/Colors";
import { globalStyles, SCREEN_WIDTH } from "../../../../constants/globalStyles";
import { headerImage, passwordIcon } from "../../../../constants/images";
import navigation from "../../../../navigation";
import { IScreen } from "../../../../types";
import { errorMessage } from "../../../../utils/showMessage";
import { translate } from "../../../../utils/translate";
import { AntDesign } from '@expo/vector-icons';
import { login } from "../../../../api/user/login";
import { getFormData } from "../../../../utils/formData";

import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../../../../api/user/getUserById/getUserById";
import { setIsLoggedIn, updateUserData, updateUserDataFull } from "../../../../redux/AuthRedux/actions/actionCreator";

const LoginPassword:FC<IScreen> = ({navigation, route}) => {

    const [email, setEmail] = useState(route.params.email);
    const [password, onChangePassword] = useState('');
    
    const [viewPassword, setViewPassword] = useState(true);

    const [err, setErr] = useState<boolean>(false)
    const dispatch = useDispatch();

    const onLogin = async () => {
        const payload = {
            email,
            password,
        };
    
       console.log(payload)
      if(password != ''){
        try {
            const response = await login(getFormData(payload));
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
          } catch (error: any) {
            dispatch(setIsLoggedIn(false))
            errorMessage({
              message: translate("errors." + error?.response?.data?.message?? "unknownError" ),
            });
          }
      }
    };

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
                        <Text style={[{fontSize: 14}]}>{translate('auth.paswordWrite')}</Text>
                        <View>
                            <Input
                                valueText={password}
                                onChange={onChangePassword}
                                placeHolderText={translate("auth.password")}
                                type="password"
                                icon={passwordIcon}
                                isPassword={viewPassword}
                                isShowIcon
                            />
                            <TouchableOpacity
                                onPress={() => setViewPassword(viewPassword => !viewPassword)}
                                style={{
                                padding: 15,
                                zIndex: 100,
                                position: 'absolute',
                                right: 0,
                                bottom: -12,

                            }}>
                                <AntDesign name="eye" size={22} color="grey" />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View>
                    <Button text={translate('common.continue')} action={()=>{onLogin()}} />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}

export default LoginPassword;
