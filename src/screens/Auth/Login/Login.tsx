import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView, Platform,
  TouchableOpacity
} from 'react-native';
import {globalStyles, SCREEN_WIDTH} from '../../../constants/globalStyles';
import Button from '../../../components/UI/Button/Button';
import SubButton from '../../../components/UI/SubButton/SubButton';
import Input from '../../../components/UI/Input/Input';
import {emailIcon, passwordIcon, headerImage, Icons} from '../../../constants/images';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, RootStackParamList} from '../../../types';
import {translate} from '../../../utils/translate';
import {login} from '../../../api/user/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTemperatureUnit} from 'react-native-localize';
import {getFormData} from '../../../utils/formData';
import { useDispatch, useSelector } from 'react-redux';
import {updateUserData, setIsLoggedIn, updateUserDataFull} from '../../../redux/AuthRedux/actions/actionCreator';
import {getUserById} from "../../../api/user/getUserById/getUserById";
import {showMessage} from "react-native-flash-message";
import { AntDesign } from '@expo/vector-icons';
import {errorMessage} from "../../../utils/showMessage";
import MaskInput from 'react-native-mask-input';
import { colors } from '../../../constants/Colors';
const validator = require('validator');

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [email, onChangeEmail] = useState('');
  const [value, onChangeValue] = useState('');
  const [password, onChangePassword] = useState('');
  const [errMesg, setErrMsg] = useState('');
  const [isShowErrMsg, setShowErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state:any) => state?.session?.isLoggedIn);

  /*const onLogin = async () => {
    setShowErrMsg(false);
    setIsLoading(true);
    const payload = {
      email,
      password,
    };

    try {
      const response = await login(getFormData(payload));
      if (response.data.status === 'success') {
        setIsLoading(false);
        await AsyncStorage.setItem('apiToken', response?.data?.token);
        const userData = await getUserById(response.data.id);
        //const userDataAll = await getUserById({user_id: response?.data.user_id});
        //console.log(userDataAll);
        dispatch(updateUserDataFull({...userData}));
        dispatch(updateUserData({...response?.data}));
        dispatch(setIsLoggedIn(true))
        // navigation.navigate('BottomTabNavigator');

      } else {
        setIsLoading(false);
        errorMessage({
          message: translate("errors." + response?.data?.message?? "unknownError" ),
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      dispatch(setIsLoggedIn(false))
      errorMessage({
        message: translate("errors." + error?.response?.data?.message?? "unknownError" ),
      });
      /*
      setErrMsg(error?.response?.data?.message??"Something Went Wrong, Please Try Again Later!");
      setShowErrMsg(true);

    }
  };*/

  const handleError = (errMesg: string) => {
    setErrMsg(errMesg);
    setShowErrMsg(true);
  };

 

  const validateForm = () => {
    let reg = /^[0]?[78]\d{10}$/;
    if(value.length == 12){
      reg = /^[0]?[+]\d{11}$/;
    }
   
      if(reg.test(value) === true){
        if(value.length == 12){
          navigation.navigate('Login2fa', {phone: value.slice(1)});
        } else {
          navigation.navigate('Login2fa', {phone: value});
        }
      } else {
      
        if (!validator.isEmail(value)) {
          handleError(translate('invalidEmail'));
          return;
        } else {
          navigation.navigate('LoginPassword', {email: value});
        }
    }
    /*
    if (password.length < 8) {
      handleError(translate('tooShortPass'));
      return;
    }
    onLogin();
    */

  };
  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const [viewPassword, setViewPassword] = useState(true);


  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-150}
          style={{flex: 1}}
          contentContainerStyle={globalStyles.flexOne}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={globalStyles.headerContainer}>
                <Image source={headerImage} style={globalStyles.headerImage} />
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.headingTitleContainer}>
                <Text style={styles.headingTitle}>{translate('login')}</Text>
              </View>
              <View>
              <Text style={[{fontSize: 14}]}>{translate('registration.emailOrPhone')}</Text>

                <Input
                    valueText={value}
                    onChange={onChangeValue}
                    placeHolderText={''}
                    isShowIcon
                />
                {/*<Input
                    valueText={email}
                    onChange={onChangeEmail}
                    placeHolderText={translate("auth.email")}
                    type="emailAddress"
                    icon={emailIcon}
                    isShowIcon
                 />*/}
              </View>
              {/*<View>
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

                </View>*/}
            </View>
            <View style={styles.bottomContainer}>
              {isShowErrMsg && (
                  <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageText}>{errMesg}</Text>
                  </View>
              )}
              <Button text={translate('common.continue')} loading={isLoading} action={validateForm} />
              {/*<SubButton
                  text={translate('forgotPassword')}
                  action={onForgotPassword}
              />*/}
              <SubButton
                  text={translate("auth.registration")}
                  action={() => {navigation.navigate('RegistrationRole')}}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default Login;
