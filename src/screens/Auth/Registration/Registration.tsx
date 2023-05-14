import React, {FC, useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import {globalStyles, SCREEN_WIDTH} from '../../../constants/globalStyles';
import Button from '../../../components/UI/Button/Button';
import SubButton from '../../../components/UI/SubButton/SubButton';
import Input from '../../../components/UI/Input/Input';
import {accountIcon, emailIcon, headerImage, passwordIcon, phoneIcon,} from '../../../constants/images';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getTranslateMessage, translate} from '../../../utils/translate';
import {setIsLoggedIn, updateUserData} from '../../../redux/AuthRedux/actions/actionCreator';
import {signup} from "../../../api/user/registration";
import {getFormData} from "../../../utils/formData";
import {IRegistrationFormData} from "./types";
import {defaultRegData, registerAsList} from "./prepare";
import RegistrationRoles from "./RegistrationRoles/RegistrationRoles";
import RegistrationUR from "./RegistrationUR/RegistrationUR";
import {showMessage} from "react-native-flash-message";
import ButtonSaveEvent from "../../../components/Project/ButtonSaveEvent/ButtonSaveEvent";
import {login} from "../../../api/user/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../constants/Colors';
import {userCheckFreeEmail} from "../../../api/user/userCheckFreeEmail/userCheckFreeEmail";
import {Dictionary} from "../../../locales/dictionary";
import {errorMessage} from "../../../utils/showMessage";
import appsFlyer from "react-native-appsflyer";
// @ts-ignore
import {APPSFLYER_ENABLED, APPSFLYER_APPID, APPSFLYER_KEY }  from '@env';
import DropdownSelect from "../../../components/UI/DropdownSelect/DropdownSelect";
import FormLabel from "../../../components/UI/FormLabel/FormLabel";
import {capitalizeFirstLetter} from "../../../utils/text";
import message from "../../Message/Message";
import {userCheckFreeNickname} from "../../../api/user/userCheckFreeNickname/userCheckFreeNickname";
import {responseWithBadWords} from "../../../utils/response";
import { userCheckFreePhone } from '../../../api/user/userCheckFreePhone/userCheckFreePhone';

type Props = {
  updateRegisterField: (field: string, value: any) => void;
};

const Registration:FC<Props> = (props) => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [errMesg, setErrMsg] = useState('');
  const [isShowErrMsg, setShowErrMsg] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [screenState, setScreenState] = useState({
    isEmailFree: true,
    isPhoneFree: true,
    isNicknameFree: true,
  })
  const [formData, setFormData] = useState<IRegistrationFormData>(defaultRegData);

  const dispatch = useDispatch();

  const onFieldChange = ( {form = 'registration', field, data}:{form?:string | undefined, field:string, data: any}) => {
    let tmpFormData = {...formData};
    switch (field) {
      case "name": {
        tmpFormData.name = data;
        const dataArr = data.split(' ');
        tmpFormData.first_name = dataArr[0];
        if(dataArr[1] != undefined) {
          tmpFormData.last_name = dataArr[1];
        } else {
          tmpFormData.last_name = defaultRegData.last_name;
        }
        break;
      }
      default: {
        // @ts-ignore
        tmpFormData[field] = data;
        break;
      }
    }
    setFormData(tmpFormData);
  }

  useEffect(() =>{
    //console.log("FORM DATA", formData);
  }, [formData.role])
  const onValidation = () => {
      if (
          !formData.nickname ||
          !formData.name ||
          !formData.password ||
          !formData.phone ||
          !formData.email ||
          !formData.password_confirmation
      ) {
        return {success: false, message: translate("registration.errorCommonForm")};
      }
      else if (formData.password_confirmation != formData.password) {
        return {success: false, message: translate("registration.errorPasswordConfirmation")};
      }
      else if(formData.name.split(' ').length < 2) {
        return {success: false, message: translate("registration.errorLastName")};
      }
      else if(formData.password.length <8) {
        return {success: false, message: translate("registration.errorPasswordLength")};
      }

      if(formData.role != 1) {
        let errorFields = [];
        let errorMessages: string[] = [];
        const notEmptyFields: {[x:string]: string[]} = {
          common: ["ur_type", "ur_name", "website","ur_description","ur_rekv"],
          2: ["ur_legalname", "ur_kpp","ur_ogrn","ur_inn","ur_bik","ur_address","ur_factaddress"],
          3: ["ur_fio","ur_passport","ur_ogrn","ur_inn","ur_bik","ur_address","ur_factaddress"]
        }
        const keys = ["common", formData.role];
        keys.map(key => {
          notEmptyFields?.[key].map(item => {
            // @ts-ignore
            if((formData?.[item].length == 0) || (item == "ur_type" && formData?.[item] == 0 )) {
              if(Dictionary?.registration?.[item]) {
                errorFields.push(item);
                errorMessages.push(getTranslateMessage(Dictionary.registration.section,item));
              }
            }
          })
        })
        if(errorMessages.length > 0) {
          return {success: false, message: "Пожалуйста заполните все поля формы для специальной регистрации: " + errorMessages.join(', ')};
        }
      }
    return {success: true, message: ""};
  }

  const onRegister = async () => {
    setIsUploading(true);
    const validateResponse = onValidation();
    if(validateResponse.success !== true) {
      errorMessage({message: validateResponse.message})
      setIsUploading(false);
      return false;
    }
    try {
      const payload = {...formData};
      const response = await signup(getFormData(payload));
      const parentResp = {...response.data,
        success: response?.data?.status == "success" ? true:false,
        originResp: response
      };
      responseWithBadWords({
        resp: parentResp,
        messageBadWords: Dictionary.errors.badWords,
        messageError: [Dictionary.errors.section, parentResp?.message ?? "unknownError"].join('.'),
        callBackBadWords: () => { setIsUploading(false) },
        callBackError: () => { setIsUploading(false) },
        callBackSuccess: () => {
          showMessage({
            message: translate("registration.success"),
            type:"success"
          });
          if(APPSFLYER_ENABLED && APPSFLYER_ENABLED == 1) {
            appsFlyer.logEvent('af_complete_registration',{'af_registration_method': 'zooclick'},(res) => {},(err) => { });
          }
          onLogin(payload.email, payload.password).then( (loginSuccess) => {
            if(!loginSuccess) { navigation.navigate('Login') }
          });
          setIsUploading(false);
        },
      })
    } catch (e) {
      errorMessage({
        message: translate(Dictionary.errors.unknownError),
      });
      setIsUploading(false);
    }
  }

  const onLogin = async (email:string, password:string) => {
    const payload = {
      email,
      password,
    };
    let output = false;
    try {
      const response = await login(getFormData(payload));

      if (response.data.status === 'success') {

        await AsyncStorage.setItem('apiToken', response?.data?.token);
        dispatch(updateUserData({...response?.data}));
        dispatch(setIsLoggedIn(true));
        output = true;
      } else {

        errorMessage({
          message: translate("errors." + response?.data?.message?? "unknownError" ),
        });

        output = false;
      }

    } catch (error: any) {

      errorMessage({
        message: translate("errors." + error?.response?.data?.message?? "unknownError" ),
      });

      output = false;
    }

    return output;
  }

  //TODO::сделать выделение поля
  const checkNickname = async () => {
    try {
      const parentResp = await userCheckFreeNickname(formData.nickname);
      responseWithBadWords({
        resp: parentResp,
        messageBadWords: Dictionary.errors.badWords,
        messageError: [Dictionary.errors.section, parentResp.message].join('.'),
        callBackBadWords: () => { setScreenState({...screenState, isNicknameFree: false}) },
        callBackError: () => {  setScreenState({...screenState, isNicknameFree: false}) },
        callBackSuccess: () => {
          if (parentResp.success) {
            if(parentResp.data) {
              setScreenState({...screenState, isNicknameFree: true})
              return;
            }
            errorMessage({
              message: translate(Dictionary.user.nicknameTaken),
            });
            setScreenState({...screenState, isNicknameFree: false});
            return;
          }
        },
      })
    } catch (e) {
      errorMessage({
        message: translate(Dictionary.errors.unknownError),
      });
    }
  }

  const checkPhone = async () => {
    try {
      const resp = await userCheckFreePhone(formData.phone);
      if (resp.success) {
        if(resp.data) {
          setScreenState({...screenState, isPhoneFree: true})
        } else {
          errorMessage({
            message: translate(Dictionary.user.phoneTaken),
          });
          setScreenState({...screenState, isPhoneFree: false})
        }
      }
    } catch (e) {
      errorMessage({
        message: translate(Dictionary.errors.unknownError),
      });
    }
  }

  const checkEmail = async () => {
    try {
      const resp = await userCheckFreeEmail(formData.email);
      if (resp.success) {
        if(resp.data) {
          setScreenState({...screenState, isEmailFree: true})
        } else {
          errorMessage({
            message: translate(Dictionary.user.emailTaken),
          });
          setScreenState({...screenState, isEmailFree: false})
        }
      }
    } catch (e) {
      errorMessage({
        message: translate(Dictionary.errors.unknownError),
      });
    }
  }

  const [viewPassword, setViewPassword] = useState(true);

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
          style={{flex: 1}}
          contentContainerStyle={globalStyles.flexOne}>
        <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.container}>
                <View style={styles.headerContainer}>
                  <View style={globalStyles.headerContainer}>
                    <Image source={headerImage} style={globalStyles.headerImage}/>
                  </View>
                </View>
                <View style={styles.bodyContainer}>
                  <View>
                    <Input
                        valueText={formData.nickname}
                        onChange={(value: any) => onFieldChange({field: "nickname", data: value})}
                        placeHolderText={translate(Dictionary.user.nickname)}
                        icon={accountIcon}
                        onBlur={ () => checkNickname() }
                        borderColor={(!screenState.isNicknameFree) ? colors.red: undefined}
                        isShowIcon
                    />
                  </View>
                  <View>
                    <Input
                        valueText={formData.name}
                        onChange={(value: any) => onFieldChange({field: "name", data: value})}
                        placeHolderText={translate("registration.name")}
                        icon={accountIcon}
                        isShowIcon
                    />
                  </View>
                  <View>
                    <Input
                        valueText={formData.phone}
                        onBlur={()=>{checkPhone()}}
                        //onChange={onChangePhoneNumber}
                        onChange={(value: any) => onFieldChange({field: "phone", data: value})}
                        placeHolderText={translate("registration.phone")}
                        icon={phoneIcon}
                        type={'telephoneNumber'}
                        isPassword={false}
                        isShowIcon
                    />
                  </View>

                  <View>
                    <Input
                        valueText={formData.email}
                        //onChange={onChangeEmail}
                        onChange={(value: any) => onFieldChange({field: "email", data: value})}
                        onBlur={ () => checkEmail() }
                        placeHolderText={translate("registration.email")}
                        type="emailAddress"
                        icon={emailIcon}
                        borderColor={(!screenState.isEmailFree) ? colors.red: undefined}
                        isShowIcon
                    />
                  </View>

                  <View>
                    <Input
                        valueText={formData.password}
                        //onChange={onChangePassword}
                        onChange={(value: any) => onFieldChange({field: "password", data: value})}
                        placeHolderText={translate("registration.password")}
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
                          justifyContent: 'flex-end',
                          position: 'absolute',
                          right: 0,
                          bottom: -12,
                        }}>
                      <AntDesign name="eye" size={22} color="grey" />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Input
                        valueText={formData.password_confirmation}
                        //onChange={onChangePasswordConfirmation}
                        onChange={(value: any) => onFieldChange({field: "password_confirmation", data: value})}
                        placeHolderText={translate("registration.passwordConfirmation")}
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
                <View style={{
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  width: SCREEN_WIDTH * 0.8,
                }}>
                  <View style={{flex: 1, flexDirection: "column", marginLeft: 0}}>
                    <FormLabel text={capitalizeFirstLetter(translate(Dictionary.user.registerAs))}/>
                    <DropdownSelect
                        defaultValue={formData.role}
                        data={registerAsList}
                        onSelect={(item) => onFieldChange({field:"role", data:item.value})}
                        placeholder={capitalizeFirstLetter(translate(Dictionary.user.registerAs))}
                        textStyle={{fontSize:14}}
                    />
                  </View>
                </View>
                {formData.role !== 1 &&
                    <View style={{flex:1, width: SCREEN_WIDTH*0.8}}>
                      <RegistrationUR formData={formData} onFieldChange={onFieldChange}/>
                    </View>
                }

                <View style={[styles.bottomContainer, {marginTop:20}]}>
                  {isShowErrMsg && (
                      <View style={styles.errorMessage}>
                        <Text style={styles.errorMessageText}>{errMesg}</Text>
                      </View>
                  )}
                  <View style={styles.descriptionMsg}>
                    <Text style={styles.descriptionMsgText}>
                      {translate("registration.userAgreement1") } {' '}
                      <Text style={styles.textLink}>{translate("registration.userAgreement2") }</Text>{' '}
                      {translate("registration.userAgreement3") } {' '}
                      <Text style={styles.textLink}>{translate("registration.userAgreement2") }</Text>.
                    </Text>
                  </View>
                  <ButtonSaveEvent
                      style={{marginTop:10, width:SCREEN_WIDTH*0.9}}
                      buttonText={translate("auth.registration")}
                      onPress={ onRegister }
                      loading={isUploading}
                  />
                  <SubButton text={translate("auth.back")}  action={ () => {navigation.goBack();}} />
                </View>
              </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default Registration;
