import React, {useState} from 'react';
import {View, SafeAreaView, Image, Text} from 'react-native';
import {globalStyles} from '../../../constants/globalStyles';
import Button from '../../../components/UI/Button/Button';
import SubButton from '../../../components/UI/SubButton/SubButton';
import {petHelp, beingGoodSimple, logoPH} from '../../../constants/images';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../../../utils/translate';

const Start = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [email, onChangeEmail] = useState('');
  const [isShowErrMsg, setShowErrMsg] = useState(true);
  const onRegister = () => {
    navigation.navigate('RegistrationRole');
  };
  const onLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={globalStyles.vwFlexOne}>
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Image source={logoPH} style={globalStyles.headerImage} />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomImage}>
            <View>
              <Image source={petHelp} style={globalStyles.headerImage} />
            </View>
            <View>
              <Image
                source={beingGoodSimple}
                style={globalStyles.headerImage}
              />
            </View>
          </View>
          <Button text={translate('auth.registration')} action={onRegister} />
          <SubButton text={translate('login')} action={onLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Start;
