import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, Text, View,} from 'react-native';
import {globalStyles} from '../../../constants/globalStyles';
import Button from '../../../components/UI/Button/Button';
import SubButton from '../../../components/UI/SubButton/SubButton';
import Input from '../../../components/UI/Input/Input';
import {emailIcon, headerImage} from '../../../constants/images';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import {translate} from "../../../utils/translate";
import {resetPasswordByEmail} from "../../../api/user/resetPasswordByEmail/resetPasswordByEmail";
import {showMessage} from "react-native-flash-message";
import {capitalizeFirstLetter} from "../../../utils/text";
import {errorMessage} from "../../../utils/showMessage";


const ForgotPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, onChangeEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onPasswordRecovery = () => {
    resetPasswordByEmail({email: email}).then( resp => {
      if(resp.success) {
        showMessage({
          message: translate("auth.passwordRecoveryByEmailSuccess"),
          type: "success"
        });
        navigation.goBack();
      } else {
        errorMessage({
          message: translate("errors." + resp.message),
        });
      }

    });
    //navigation.navigate('BottomTabNavigator');
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
      <KeyboardAvoidingView
          behavior="height"
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
                <Text style={styles.headingTitle}>{translate('auth.passwordRecoveryTitle')}</Text>
              </View>
              <View>
                <Input
                    valueText={email}
                    onChange={onChangeEmail}
                    placeHolderText={translate('auth.email')}
                    type="emailAddress"
                    icon={emailIcon}
                    isShowIcon
                />
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <Button loading={isLoading} text={translate('auth.passwordRecoveryButton')} action={onPasswordRecovery} />
              <SubButton text={capitalizeFirstLetter(translate("common.cancel"))} action={goBack} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
