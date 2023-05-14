import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../../constants/globalStyles';
import Button from '../../../components/UI/Button/Button';
import BackButton from '../../../components/UI/BackButton/BackButton';
import AdditionalAddress from '../AdditionalAddress/AdditionalAddress';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, RootStackParamList} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import {signup} from '../../../api/user/registration';
import {connect} from 'react-redux';
import {getTabBarHeight} from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {getFormData} from '../../../utils/formData';
import {translate} from '../../../utils/translate';
import { updateRegistrationField } from '../../../redux/AuthRedux/actions/actionCreator';

type Props = {
  session: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    role: number;
  };
};

const RoleAddress = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [companyAddress, onChangeCompanyAddress] = useState('');
  const [serviceAddress, onChangeServiceAddress] = useState('');

  const onRegister = async () => {
    try {
      const payload = {
        first_name: props.session.firstName,
        last_name: props.session.lastName,
        email: props.session.email,
        password: props.session.password,
        password_confirmation: props.session.confirmPassword,
        role: props.session.role,
      };

      const response = await signup(getFormData(payload));
      if (response.data.status === 'success') {
        navigation.navigate('BottomTabNavigator');
      }
    } catch (error: any) {}
  };
  const goBack = () => {
    navigation.goBack();
  };
  const addAddress = () => {};
  return (
    <SafeAreaView style={globalStyles.vwFlexOne}>
      <View style={styles.container}>
        <View style={globalStyles.headerContainer}>
          <BackButton text={'Back'} action={goBack} />
        </View>
        <View style={styles.bodyContainer}>
          <AdditionalAddress
            companyAddress={companyAddress}
            serviceAddrress={serviceAddress}
            actionOne={onChangeCompanyAddress}
            actionTwo={onChangeServiceAddress}
          />
          <TouchableOpacity onPress={addAddress}>
            <View style={styles.headingTitleContainer}>
              <Text style={styles.headingTitle}>
                {translate('addAdditionalAddress')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Button loading={false} text="REGISTER" action={onRegister} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    session: state.session,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRegisterField: (field: string, value: any) =>
      dispatch(updateRegistrationField({field, value})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoleAddress);
