import React, {FC, useState} from 'react';
import {IScreen} from "../../../types";
import {styles} from "../../../components/Project/Profile/styles";
import {Text, View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {defaultRegData} from "../../Auth/Registration/prepare";
import {showMessage} from "react-native-flash-message";
import {updatePassword} from "../../../api/user/updatePassword/updatePassword";
import Input from "../../../components/UI/Input/Input";
import {passwordIcon} from "../../../constants/images";
import Button from "../../../components/UI/Button/Button";
import {errorMessage} from "../../../utils/showMessage";

interface IPasswordForm {
    "old_password": string,
    "new_password": string,
    "new_password_confirmation": string,
}

const ProfilePassword:FC<IScreen> = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<IPasswordForm>({
        "old_password": "",
        "new_password": "",
        "new_password_confirmation": "",
    })
    const onFieldChange = ( {form = 'changePassword', field, data}:{form?:string | undefined, field:string, data: any}) => {
        let tmpFormData = {...formData};
        switch (field) {
            default: {
                // @ts-ignore
                tmpFormData[field] = data;
                break;
            }
        }
        setFormData(tmpFormData);
    }

    const onChangePassword = async () => {
        setIsLoading(true);
        if(
            formData.old_password == ""
            || formData.new_password == ""
            || formData.new_password_confirmation == ""
        ) {
            showMessage({
                message: "Все поля обязательны к заполнению",
                type: "warning"
            });
            setIsLoading(false);
            return false;
        }

        else if(
            formData.new_password != formData.new_password_confirmation
        ) {
            showMessage({
                message: translate("registration.errorPasswordConfirmation"),
                type: "warning"
            });
            setIsLoading(false);
            return false;
        }
        else {
            updatePassword(formData).then( (resp) => {
                if(resp.success) {
                    showMessage({
                        message: translate("profile.passwordChangeSuccess"),
                        type: "success"
                    });
                    navigation.goBack();
                } else {
                    errorMessage({
                        message: translate("errors." + resp.message),
                    });
                    setIsLoading(false);
                }
            })
        }
    }

    return (
        <ViewScreen>
            <View style={styles.background}>
                <View style={styles.profile}>
                        <View style={{position: 'absolute', left: 0, zIndex: 1000}}>
                            <BackButton
                                text={translate('back')}
                                action={() => {
                                    navigation.goBack()
                                }}
                            />
                        </View>
                    <View style={styles.profileHeader}>
                        
                        <View style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 18,
                                color: "#392413",
                                lineHeight: 22.5,
                                fontWeight: "500"
                            }}>{translate('profile.changePassword')}</Text>
                        </View>

                        <View style={[styles.profileSettingsContainer, {alignItems: "center"}]}>
                            <View>
                                <Input
                                    valueText={formData.old_password}
                                    onChange={(value: any) => onFieldChange({field: "old_password", data: value})}
                                    placeHolderText={translate("profile.oldPassword")}
                                    type="password"
                                    icon={passwordIcon}
                                    isPassword
                                    isShowIcon
                                />
                            </View>
                            <View>
                                <Input
                                    valueText={formData.new_password}
                                    onChange={(value: any) => onFieldChange({field: "new_password", data: value})}
                                    placeHolderText={translate("profile.newPassword")}
                                    type="password"
                                    icon={passwordIcon}
                                    isPassword
                                    isShowIcon
                                />
                            </View>
                            <View>
                                <Input
                                    valueText={formData.new_password_confirmation}
                                    //onChange={onChangePasswordConfirmation}
                                    onChange={(value: any) => onFieldChange({field: "new_password_confirmation", data: value})}
                                    placeHolderText={translate("profile.newPasswordConfirmation")}
                                    type="password"
                                    icon={passwordIcon}
                                    isPassword
                                    isShowIcon
                                />
                            </View>
                            <View style={{marginTop:20}}>
                                <Button text={translate("profile.changePassword")} loading={isLoading} action={ () => onChangePassword()} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ViewScreen>
    );
};

export default ProfilePassword;
