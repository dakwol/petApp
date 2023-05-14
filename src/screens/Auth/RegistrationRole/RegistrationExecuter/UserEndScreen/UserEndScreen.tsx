import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { car, computer, headerImage, home, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { translate } from "../../../../../utils/translate";
import styles from "./styles";
import ToggleButton from "../../../../../components/UI/ToggleButton/ToggleButton";
import { IServicesMnemo } from "../../../../../api/user/types";
import CheckBox from "@react-native-community/checkbox";
import { signup } from "../../../../../api/user/registration";
import { errorMessage } from "../../../../../utils/showMessage";
import { Dictionary } from "../../../../../locales/dictionary";
import { login } from "../../../../../api/user/login";
import { getFormData } from "../../../../../utils/formData";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../../../../../api/user/getUserById/getUserById";
import { setIsLoggedIn, updateUserData, updateUserDataFull } from "../../../../../redux/AuthRedux/actions/actionCreator";

// @ts-ignore
import * as mime from 'react-native-mime-types';

const UserEndScreen:FC<IScreen> = ({navigation, route}) => {

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [err, setErr] = useState<boolean>(false)

    const dispatch = useDispatch();

    const generateUUID = (digits:number) => {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
        let uuid = [];
        for (let i = 0; i < digits; i++) {
            uuid.push(str[Math.floor(Math.random() * str.length)]);
        }
        setArrInfo({...arrInfo, password: uuid.join(''), password_confirmation: uuid.join('')});
    }

    useEffect(()=>{
        generateUUID(16)
    },[])

    console.log(arrInfo)

    useEffect(()=>{
        if(arrInfo.password != undefined || '') {

            let data = new FormData();
            data.append('email', arrInfo.email)
            data.append('nickname', arrInfo.nickname)
            data.append('service_role', arrInfo.service_role)
            data.append('first_name', arrInfo.first_name)
            data.append('last_name', arrInfo.last_name)
            data.append('middle_name', arrInfo.middle_name)
            data.append('phone', arrInfo.phone)
            data.append('role',arrInfo.role)
            data.append('ur_passport', arrInfo.ur_passport)
            data.append('ur_description', arrInfo.ur_description)

            data.append('profile_photo',{
                name: arrInfo.profile_photo.uri.split('/')[9],
                type: mime.lookup(arrInfo.profile_photo.uri),
                uri: Platform.OS === 'ios' ? arrInfo.profile_photo.uri.replace('file://', '') : arrInfo.profile_photo.uri,
            })
            
            data.append('verify_photos[]', {
                name: arrInfo.verify_photos[0].uri.split('/')[9],
                type: mime.lookup(arrInfo.verify_photos[0].uri),
                uri: Platform.OS === 'ios' ? arrInfo.verify_photos[0].uri.replace('file://', '') : arrInfo.verify_photos[0].uri,
            })
            data.append('verify_photos[]', {
                name: arrInfo.verify_photos[1].uri.split('/')[9],
                type: mime.lookup(arrInfo.verify_photos[1].uri),
                uri: Platform.OS === 'ios' ? arrInfo.verify_photos[1].uri.replace('file://', '') : arrInfo.verify_photos[1].uri,
            })
            data.append('password', arrInfo.password)
            data.append('password_confirmation', arrInfo.password_confirmation)
            arrInfo.role == '2' &&
            [
                arrInfo.v_type == '2' && [
                    data.append('ur_address', arrInfo.ur_address),
                    data.append('ur_factaddress', arrInfo.ur_factaddress),
                    data.append('ur_inn', arrInfo.ur_inn),
                    data.append('ur_name', arrInfo.ur_name),
                    data.append('ur_orgn', arrInfo.ur_ogrn),
                    data.append('ur_kpp', arrInfo.ur_kpp),
                    data.append('website', arrInfo.website),
                    data.append('ur_fio', arrInfo.first_name + ' ' + arrInfo.last_name + ' ' + arrInfo.middle_name),
                ],
                data.append('ur_rekv', arrInfo.ur_rekv),
                data.append('v_type', arrInfo.v_type),
                data.append('profile_photo',{
                    name: arrInfo.profile_photo.uri.split('/')[9],
                    type: mime.lookup(arrInfo.profile_photo.uri),
                    uri: Platform.OS === 'ios' ? arrInfo.profile_photo.uri.replace('file://', '') : arrInfo.profile_photo.uri,
                })
            ]

            arrInfo.role == '1' && (
                data.append('company_name', arrInfo.company_name),
                data.append('is_entrepreneur', arrInfo.is_entrepreneur),
                data.append('is_home_service', arrInfo.is_home_service),
                data.append('is_remote_service', arrInfo.is_remote_service),
                data.append('occupations', arrInfo.occupations),
                data.append('services', arrInfo.services),
                data.append('ur_address', arrInfo.ur_address)
            )

            signup(data).then((resp)=>{
                onChangeEmail(arrInfo.email);
                onChangePassword(arrInfo.password)
                if(resp.data.status == 'Error'){
                    errorMessage({
                        message: translate(Dictionary.errors.Error_create_user),
                    });
                    setIsLoading(false)
                    setErr(true)
                } else {
                    setIsLoading(false)
                    setErr(false)
                }
            })
        }
    },[arrInfo.password])

    const onLogin = async () => {
        const payload = {
            email,
            password,
        };
    
       console.log(payload)
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
      };

    return (
        <SafeAreaView style={[globalStyles.vwFlexOne, {justifyContent: "space-between", marginTop: 60}]}>
                 <Image source={petHelp}/>
                <View style={{marginBottom: 20, justifyContent: "space-between", flexDirection: "column", height: 300, paddingHorizontal: 30}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginVertical: 20}}>{
                        arrInfo.role == '2' ?
                            translate('registration.thxFinish')
                            :
                            translate('registration.goToSearch')
                    }
                    </Text>
                    <View style={{width: SCREEN_WIDTH - 50}}>
                        <Text style={{fontSize: 15}}>{translate('registration.thxText')}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15}}>
                            {arrInfo.role == '2' &&
                                translate('registration.thxFinishSubText')
                            }
                        </Text>
                    </View>
                </View>
                <View style={{height: 150}}>
                    {isLoading?
                        <ActivityIndicator size={38}/>
                        :
                        err?
                        <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.navigate('RegistrationRole')}} >
                            <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                        </TouchableOpacity>
                        :
                        <Button 
                            text={arrInfo.role == '2'?
                                translate('registration.goToApp')
                                :
                                translate('registration.finish')
                            } 
                            action={()=>{arrInfo.role == '2'?
                                onLogin()
                                : 
                                //navigation.navigate('CompanyPhoto', {infoUser: arrInfo})
                                onLogin()
                            }} 
                        />
                    }
                    
                </View>
            </SafeAreaView>
    )
}



export default UserEndScreen;