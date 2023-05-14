import React, {FC, useEffect, useState} from 'react';
import {IScreen} from "../../../types";
import {styles} from "../../../components/Project/Profile/styles";
import {ActivityIndicator, BackHandler, ScrollView, Text, View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {getTranslateMessage, translate} from "../../../utils/translate";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {showMessage} from "react-native-flash-message";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {errorMessage} from "../../../utils/showMessage";

import {userCheckFreeNickname} from "../../../api/user/userCheckFreeNickname/userCheckFreeNickname";
import {Dictionary} from '../../../locales/dictionary';
import {getUserById} from '../../../api/user/getUserById/getUserById';
import {useDispatch, useSelector} from 'react-redux';
import {updateNickname} from '../../../api/user/updateNickname/updateNickname';
import {updateUserData, updateUserDataFull} from "../../../redux/AuthRedux/actions/actionCreator";
import {responseWithBadWords} from "../../../utils/response";

interface INickNameForm {
    "nickname": any,
}

const ProfileNickname:FC<IScreen> = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState<INickNameForm>({
        "nickname":  "",
    })

    // @ts-ignore
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    useEffect(() => {
        getUserById(userInfo.user_id).then((dataUser) => {
            setFormData({...formData, nickname: dataUser.nickname})
            setIsLoading(false)
        });
    }, [])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const onFieldChange = ( {field, data}:{form?:string | undefined, field:string, data: any}) => {
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

    const [backError, setBackError] = useState(false)

    const saveNickname = async () => {
        const response = await getUserById(userInfo.user_id);
        if(response.nickname_migrate) {
            const updateResponse = await updateNickname(formData.nickname);
            if(updateResponse.success) {
                showMessage({
                    message: "Никнейм изменён",
                    type: "success"
                });
                dispatch(updateUserDataFull({...response, nickname_migrate: false, nickname: formData.nickname}))
                navigation.goBack();
                return
            }
            errorMessage({
                message: getTranslateMessage(Dictionary.errors.section, updateResponse.message),
            });
            return
        }
        errorMessage({
            message: 'Никнейм можно изменить один раз',
        });
        return;
    }

    const checkNickname = async () => {
        try {
            if( formData.nickname == "") {
                showMessage({
                    message: "Все поля обязательны к заполнению",
                    type: "warning"
                });
                setIsLoading(false);
                return;
            } else {
                const parentResp = await userCheckFreeNickname(formData.nickname);
                responseWithBadWords({
                    resp: parentResp,
                    messageBadWords: Dictionary.errors.badWords,
                    messageError: [Dictionary.errors.section, parentResp.message].join('.'),
                    callBackBadWords: () => { setIsUploading(false) },
                    callBackError: () => {
                        //setErr(parentResp?.originResp?.data?.fields ?? []);
                        setBackError(true);
                        setIsUploading(false);
                    },
                    callBackSuccess: () => {
                        if (parentResp.success) {
                            if(parentResp.data) {
                                saveNickname().then();
                                return;
                            }
                            errorMessage({
                                message: translate(Dictionary.user.nicknameTaken),
                            });
                            setBackError(true);
                            setIsLoading(false);
                            return;
                        }

                    },
                })
            }
        } catch (e) {
            errorMessage({
                message: translate(Dictionary.errors.unknownError),
            });
        }
    }

    return (
        <ScrollView>
            <ViewScreen keyboardVerticalOffset={50}>
                <View style={styles.background}>
                    {isLoading
                        ?
                        <ActivityIndicator size={38}/>
                        :
                        <View style={styles.profile}>
                            <View style={{position: 'absolute', left: 0}}>
                                {/*
                                <BackButton
                                    text={translate('back')}
                                    action={() => {
                                        navigation.goBack()
                                    }}
                                />
                                */}
                            </View>
                            <View style={styles.profileHeader}>
                                <View style={{width: "100%", justifyContent: 'center', alignItems: 'center', marginTop:10}}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "#392413",
                                        lineHeight: 22.5,
                                        fontWeight: "500"
                                    }}>ТЕБЕ ДОБАВЛЕН НИКНЕЙМ{/*translate('profile.changeNickname')*/}</Text>
                                </View>

                                <View style={[styles.profileSettingsContainer, {alignItems: "center", marginTop:10}]}>
                                    <View>
                                        <Text style={{textAlign:"center", marginTop: 15}}>Теперь тебя проще узнать и запомнить среди пользователей!{"\n"}{"\n"}
                                            Никнейм будет отображаться в записях блога, профиле и комментариях.{"\n"}{"\n"}
                                            Мы автоматически сгенерировали и присвоили Никнейм для каждого пользователя.{"\n"} Его, конечно, можно изменить, но только <Text style={{fontWeight: "bold"}}>один раз</Text>.{"\n"}{"\n"}
                                            Жми ниже и создавай свой уникальный <B>НИК</B> на <B>ЗооКлик</B>.{"\n"}
                                        </Text>
                                        <Text style={{textAlign:"left", marginTop: 15, marginLeft:20}}>
                                            Текущий никнейм:
                                        </Text>
                                    </View>
                                    <View style={[{marginTop: 10}, backError?{borderColor: 'red', borderWidth: 1}:{borderColor: 'inherit'}]}>
                                        <Input
                                            valueText={formData.nickname}
                                            onChange={(value: any) => onFieldChange({field: "nickname", data: value})}
                                            placeHolderText={translate("profile.editNickname")}
                                            type="text"
                                            isShowIcon
                                        />
                                    </View>
                                    <View style={{marginTop:20}}>
                                        <Button text={translate("profile.edit")} loading={isLoading} action={ () => checkNickname()} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </ViewScreen>
        </ScrollView>
    );
};

export default ProfileNickname;
