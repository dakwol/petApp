import React, {FC, useEffect, useState} from 'react';
import {Image, ScrollView, View} from "react-native";
import {IProfileFormProps} from "./types";
import {IMedia, IOnFieldChange, IUser} from "../../../types";
import {useSelector} from "react-redux";
import {showMessage} from "react-native-flash-message";
import {getTranslateMessage, translate} from "../../../utils/translate";
import {addUserMediaMultiply} from "../../../api/user/addUserMediaMultiply/addUserMediaMultiply";
import {getFormData, getMediaForm} from "../../../utils/formData";
import {getUserById} from "../../../api/user/getUserById/getUserById";
import MediaAddList from "../../UI/MediaAddList/MediaAddList";
import styles from "./styles";
import {Dictionary} from "../../../locales/dictionary";
import {userDeleteMedia} from "../../../api/user/userDeleteMedia/userDeleteMedia";
import {userUpdateAvatar} from "../../../api/user/userUpdateAvatar/userUpdateAvatar";
import {getMediaPreviewSrc} from "../../../utils/common";
import {capitalizeFirstLetter} from "../../../utils/text";
import {errorMessage} from "../../../utils/showMessage";



interface IProfileState {
    isProfileLoading: boolean,
    formData: {[x:string]: any},
    medias: IMedia[],
    oldMedias: IMedia[],
    userData: IUser | undefined,
    isUploading: boolean
}

const ProfileForm:FC<IProfileFormProps> = ({navigation, route}) => {

    const userInfo = useSelector((state: any) => state?.session?.userData);
    const user_id = userInfo.user_id;

    const [compState, setCompState] = useState<IProfileState>({
        isProfileLoading: true,
        formData:{},
        medias:[],
        oldMedias: [],
        userData: undefined,
        isUploading: false
    })

    useEffect(() => {
        getUserById(user_id).then((userResp) => {
            console.log('userRespSource', userResp);
            setCompState({...compState, userData: userResp, oldMedias:userResp.media})
        });
    }, [])

    useEffect(() => {
        //console.log('compState.oldMedias', compState.oldMedias);
    }, [compState.oldMedias]);

    const onChangeMedias = (data:IMedia[]) => {
        setCompState({...compState, medias: data});
    }

    const onUploadMedias = async () => {
        addImages().then();
    }

    const onOldMediaDelete = (id:IMedia['id']) => {
        userDeleteMedia(id).then( (resp) => {
            if(resp.success) {
                showMessage({
                    message: capitalizeFirstLetter(translate(Dictionary.media.deleteSuccess)),
                    type: "success"
                });
                getUserById(user_id).then((resp) => {
                    setCompState({...compState, userData: resp, oldMedias:resp.media})
                });
            } else {
                errorMessage({
                    message: capitalizeFirstLetter(getTranslateMessage('errors', resp.message)),
                });
            }

        });
    }
    const onAvatarSet = async (id: IMedia['id'], indx?: number) => {
        const resp = await userUpdateAvatar(id);

        if(resp.success) {
            showMessage({
                message: capitalizeFirstLetter(translate(Dictionary.profile.updateAvatarSuccess)),
                type: "success"
            });
            getUserById(user_id).then((userResp) => {
                setCompState({...compState, userData: userResp, oldMedias:userResp.media})
            });

        } else {
            errorMessage({
                message: capitalizeFirstLetter(getTranslateMessage(Dictionary.errors.section, resp.message)),
            });
        }
    }

    const addImages = async () => {
        setCompState({...compState, isUploading: true})
        let mediaForm = new FormData();
        mediaForm = getMediaForm(mediaForm, compState.medias);
        const response = await addUserMediaMultiply(mediaForm);

        if(response.success)
        {
            showMessage({
                message: capitalizeFirstLetter(translate(Dictionary.common.uploadMediaSuccess)),
                type: "success"
            });

            getUserById(user_id).then((resp) => {
                setCompState({...compState, medias: [], userData: resp, oldMedias: resp.media, isUploading: false})
            });
        }
        else
        {
            errorMessage({
                message: capitalizeFirstLetter(getTranslateMessage("errors", response?.message ?? "unknownError")),
            });
            setCompState({...compState, isUploading: false})
        }


        return response;
    }

    const onFieldChange = ({form = 'user', field, data}:IOnFieldChange) => {
        let tmpFormData = {...compState.formData};
        tmpFormData[field] = data;
        setCompState({...compState, formData: tmpFormData} );
    }

    const onSubmit = async(  ) => {
        const formData = getFormData(compState.formData);
        let resp:any = {success:false, data: user_id, message: 'unknownError'};
        //resp = await updateUser(formData);
        resp = {success:true, data: user_id};

        if(resp.success) {
            const imagesResp = await addImages();
            if(imagesResp.success) {
                showMessage({
                    message: translate("pet.addSuccess"),
                    type: "success"
                });
                navigation.goBack();
            } else {
                errorMessage({
                    message: [translate("pet.addError"), translate('errors.' + imagesResp.message)].join('. '),
                });
                return 0;
            }
        } else {
            errorMessage({
                message: [translate("pet.addError"), translate('errors.' + resp.message)].join('. '),
            });
            return 0;
        }
    }

    return (
        <ScrollView style={[styles.container]}>
            <View style={[styles.formLayout]}>
                <View style={styles.leftLayout}>

                </View>
                <View style={styles.rightLayout}>
                    <Image source={getMediaPreviewSrc(compState.userData?.avatar_media)} style={[styles.image]} />
                </View>
            </View>
            <View style={[styles.textInputsRow]}>
                <View>
                    <MediaAddList
                        medias={compState.medias}
                        onChangeMedias={onChangeMedias}
                        onUploadMedias={onUploadMedias}
                        oldMedias={compState.oldMedias}
                        onOldMediaDelete={onOldMediaDelete}
                        buttonUpload={true}
                        buttonAvatar={true}
                        buttonAvatarAction={onAvatarSet}
                        isUploading={compState.isUploading}
                        /*
                        odlMediaButtons = {[
                            {text: 'Аватар', action: (media: IMedia, index: number) => { onAvatarSet(media) }}
                        ]}

                         */
                    />
                </View>
            </View>
            {/*
                <View style={styles.textInputsRow}>
                    <View style={styles.halfInput}>

                    </View>
                    <View style={styles.halfInput}>
                        <TextInput
                            placeholder={translate('color')}
                            placeholderTextColor={colors.halfCedar}
                            style={[styles.input, styles.halfInput]}
                            onChangeText={(data) => {
                                onFieldChange({form: 'pet', field: 'color', data: data})
                            }}
                        />
                    </View>
                </View>


                */}
            <View style={styles.bottomLayout}>

            </View>
        </ScrollView>
    );
};

export default ProfileForm;
