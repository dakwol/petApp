import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Auth/Login/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword/ForgotPassword';
import Registration from '../screens/Auth/Registration/Registration';
import RoleSelection from '../screens/Auth/RoleSelection/RoleSelection';
import RoleAddress from '../screens/Auth/RoleAddress/RoleAddress';
import Start from '../screens/Auth/Start/Start';
import {AuthStackParamList} from '../types';
import RegistrationRole from '../screens/Auth/RegistrationRole/RegistrationRole';
import RegistrationExecuter from '../screens/Auth/RegistrationRole/RegistrationExecuter/RegistrationExecuter';
import ConfirmNumber from '../screens/Auth/RegistrationRole/RegistrationExecuter/ConfirmNumber/ComfirmNumber';
import ActivityCategory from '../screens/Auth/RegistrationRole/RegistrationExecuter/ActivityCategory/ActivityCategory';
import CompanyName from '../screens/Auth/RegistrationRole/RegistrationExecuter/companyName/CompanyName';
import UserInfo from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserInfo/UserInfo';
import UserSpecialization from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserSpecialization/UserSpecialization';
import UserSpecializationSale from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserSpecializationPrice/UserSpecializationPrice';
import UserAddres from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserAddres/UserAddres';
import UserWorkInfo from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserWorkInfo/UserWorkInfo';
import UserEndScreen from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserEndScreen/UserEndScreen';
import UserSpecializationPrice from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserSpecializationPrice/UserSpecializationPrice';
import CompanyPhoto from '../screens/Auth/RegistrationRole/RegistrationExecuter/CompanyPhoto/CompanyPhoto';
import UserRegEmail from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserRegEmail/UserRegEmail';
import RegistrationVoluenteer from '../screens/Auth/RegistrationRole/RegistrationVolunteer/RegistrationVoluenteer';
import VoluenteerType from '../screens/Auth/RegistrationRole/RegistrationVolunteer/VoluenteerType/VoluenteerType';
import RequisitesVolunter from '../screens/Auth/RegistrationRole/RegistrationVolunteer/RequisitesVolunter/RequisitesVolunter';
import UploadDocumentsVoluenter from '../screens/Auth/RegistrationRole/RegistrationVolunteer/UploadDocumentsVoluenter/UploadDocumentsVoluenter';
import VoluenterScore from '../screens/Auth/RegistrationRole/RegistrationVolunteer/VoluenteerScore/VoluenterScore';
import VoluenterAddres from '../screens/Auth/RegistrationRole/RegistrationVolunteer/VoluenteerAddres/VoluenterAddres';
import UserProfession from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserProfession/UserProfession';
import Login2fa from '../screens/Auth/Login/Login2fa/Login2fa';
import LoginPassword from '../screens/Auth/Login/LoginPassword/LoginPassword';
import UserNickname from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserNickname/UserNickname';
import UserDescriptionActivity from '../screens/Auth/RegistrationRole/RegistrationExecuter/UserDescriptionActivity/UserDescriptionActivity';
const Auth = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  const options = {
    gestureEnabled: false,
  };
  return (
    <Auth.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
      <Auth.Screen name="Start" component={Start} options={options} />
      <Auth.Screen name="Login" component={Login} options={options} />
      <Auth.Screen name="LoginPassword" component={LoginPassword} options={options} />
      <Auth.Screen name="Login2fa" component={Login2fa} options={options} />
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={options}
      />
      <Auth.Screen
        name="Registration"
        component={Registration}
        options={options}
      />
      <Auth.Screen
        name="RegistrationRole"
        component={RegistrationRole}
        options={options}
      />
      <Auth.Screen
        name="RegistrationExecuter"
        component={RegistrationExecuter}
        options={options}
      />
      <Auth.Screen
        name="ConfirmNumber"
        component={ConfirmNumber}
        options={options}
      />
      <Auth.Screen
        name="UserRegEmail"
        component={UserRegEmail}
        options={options}
      />
      <Auth.Screen
        name="ActivityCategory"
        component={ActivityCategory}
        options={options}
      />
      <Auth.Screen
        name="CompanyName"
        component={CompanyName}
        options={options}
      />
      <Auth.Screen
        name="UserInfo"
        component={UserInfo}
        options={options}
      />
      <Auth.Screen
        name="UserSpecialization"
        component={UserSpecialization}
        options={options}
      />
      <Auth.Screen
        name="UserProfession"
        component={UserProfession}
        options={options}
      />
      <Auth.Screen
        name="UserSpecializationPrice"
        component={UserSpecializationPrice}
        options={options}
      />
      <Auth.Screen
        name="UserAddres"
        component={UserAddres}
        options={options}
      />
      <Auth.Screen
        name="UserNickname"
        component={UserNickname}
        options={options}
      />
      <Auth.Screen
        name="UserWorkInfo"
        component={UserWorkInfo}
        options={options}
      />
      <Auth.Screen
        name="UserEndScreen"
        component={UserEndScreen}
        options={options}
      />
      <Auth.Screen
        name="CompanyPhoto"
        component={CompanyPhoto}
        options={options}
      />
      <Auth.Screen
        name="RoleSelection"
        component={RoleSelection}
        options={options}
      />
      <Auth.Screen
        name="RoleAddress"
        component={RoleAddress}
        options={options}
      />
      <Auth.Screen
        name="Voluenter"
        component={RegistrationVoluenteer}
        options={options}
      />
      <Auth.Screen
        name="VoluenteerType"
        component={VoluenteerType}
        options={options}
      />
      <Auth.Screen
        name="RequisitesVolunter"
        component={RequisitesVolunter}
        options={options}
      />
      <Auth.Screen
        name="UploadDocumentsVoluenter"
        component={UploadDocumentsVoluenter}
        options={options}
      />
      <Auth.Screen
        name="VoluenterScore"
        component={VoluenterScore}
        options={options}
      />
      <Auth.Screen
        name="VoluenterAddres"
        component={VoluenterAddres}
        options={options}
      />
      <Auth.Screen
        name="UserDescriptionActivity"
        component={UserDescriptionActivity}
        options={options}
      />
    </Auth.Navigator>
    
  );
}

export default AuthNavigator;
