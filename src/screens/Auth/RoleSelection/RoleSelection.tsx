import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../../constants/globalStyles';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import {Picker} from '@react-native-picker/picker';
import BackButton from '../../../components/UI/BackButton/BackButton';
import {downIcon} from '../../../constants/images';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {translate} from '../../../utils/translate';
import { updateRegistrationField } from '../../../redux/AuthRedux/actions/actionCreator';

type Props = {
  updateRegisterField: (field: string, value: any) => void;
};

const RoleSelection = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [companyName, onChangeCompanyName] = useState('');
  const [companyID, onChangeCompanyID] = useState('');
  const [errMesg, setErrMsg] = useState('');
  const [isShowErrMsg, setShowErrMsg] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<number>();
  const [isShowSelectRole, setShowSelectRole] = useState(false);

  const onShowSelectRole = () => {
    setShowSelectRole(true);
  };
  const onCloseSelectRole = () => {
    setShowSelectRole(false);
  };
  const onContinue = () => {
    navigation.navigate('RoleAddress');
  };
  const handleError = (errMesg: string) => {
    setErrMsg(errMesg);
    setShowErrMsg(true);
  };
  const resetError = () => {
    setErrMsg('');
    setShowErrMsg(false);
  };
  const validateForm = () => {
    resetError();
    if (!selectedLanguage) {
      handleError(translate('requireRole'));
      return;
    }
    onContinue();
  };
  const goBack = () => {
    navigation.goBack();
  };
  const onChangeRole = (value: number) => {
    setSelectedLanguage(value);
    props.updateRegisterField('role', value);
  };
  return (
    <SafeAreaView style={globalStyles.vwFlexOne}>
      <View style={styles.container}>
        <View style={globalStyles.headerContainer}>
          <BackButton text={'Cancel Role adding'} action={goBack} />
        </View>
        <View style={styles.bodyContainer}>
          <Modal animationType="fade" visible={isShowSelectRole} transparent>
            <View style={styles.modalStyle}>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeRole(itemValue)
                  }>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                </Picker>
                <TouchableOpacity onPress={onCloseSelectRole}>
                  <View>
                    <Text style={[styles.headingTitle, styles.blackText]}>
                      {translate('done')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View>
            <View style={styles.descriptionMsg}>
              <Text style={styles.descriptionMsgText}>
                Please select a Role:
              </Text>
            </View>
            <Input
              valueText={selectedLanguage?.toString()}
              onChange={onShowSelectRole}
              placeHolderText="Role List"
              isShowIcon={false}
              isShowRightIcon={true}
              rightIcon={downIcon}
            />
          </View>
          <View>
            <Input
              valueText={companyName}
              onChange={onChangeCompanyName}
              placeHolderText="Company Name"
              isShowIcon={false}
            />
          </View>
          <View>
            <Input
              valueText={companyID}
              onChange={onChangeCompanyID}
              placeHolderText="Company ID"
              isShowIcon={false}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {isShowErrMsg && (
            <View style={styles.errorMessage}>
              <Text style={styles.errorMessageText}>{errMesg}</Text>
            </View>
          )}
          <View style={styles.descriptionMsg}>
            <Text style={styles.descriptionMsgText}>
              Выберите роль и мы расскажем как Вы можете помочь животным в нашем
              проекте
            </Text>
          </View>
          <Button text="CONTINUE" loading={false} action={validateForm} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRegisterField: (field: string, value: any) =>
      dispatch(updateRegistrationField({field, value})),
  };
};
export default connect(null, mapDispatchToProps)(RoleSelection);
