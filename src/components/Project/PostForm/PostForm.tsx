import React, {FC, useEffect, useState} from 'react';
import {ScrollView, Text, View} from "react-native";
import {IPostFormProps} from "./types";
import {styles as profileStyles} from "../Profile/styles";
import {getTranslateMessage, translate} from "../../../utils/translate";

import {colors} from "../../../constants/Colors";
import styles from "./styles";
import {IEventOnFieldChange} from "../EventForm/types";
import MediaAddList from "../../UI/MediaAddList/MediaAddList";
import {showMessage} from "react-native-flash-message";
import {createEvent} from "../../../api/events/createEvent/createEvent";
import {getFormData, getMediaForm} from "../../../utils/formData";
import {addEventMediaMultiply} from "../../../api/events/addEventMediaMultiply/addEventMediaMultiply";
import ButtonSaveEvent from "../ButtonSaveEvent/ButtonSaveEvent";
import {responseWithBadWords} from "../../../utils/response";
import {Dictionary} from "../../../locales/dictionary";
import {errorMessage} from "../../../utils/showMessage";
import {isCardInText, isEmailInText, isPhoneInText, isUrlInText} from "../../../utils/validation";
import TextArea from '../../UI/TextArea/TextArea';
import {IEvent, IMedia} from "../../../types";
import {eventMediaDelete} from "../../../api/events/eventMediaDelete/eventMediaDelete";
import {capitalizeFirstLetter} from "../../../utils/text";
import {getEvents} from "../../../api/events/getEvents/getEvents";
import {updateEvent} from "../../../api/events/updateEvent/updateEvent";
import TextInp from '../../UI/TextInp/TextInp';
import {useIsFocused} from "@react-navigation/native";

const PostForm:FC<IPostFormProps> = ({post_id, navigation, route, ...props}) => {
    const isFocused = useIsFocused();
    const [isLoaded, setIsLoaded] = useState<any>(false);
    const [isUploading, setIsUploading] = useState(false);

    const [fieldsData, setFieldsData] = useState({
        evt_topic: '',
        description: '',
        type: 2,
        evt_ctgy_id: 999,
        evt_address: 'a',
        evt_lat: 1,
        evt_long: 1,
        evt_images: [],
        evt_priority: 1,
        is_emergency: 0,
        evt_status: 1,

    });

    //--- Update functions
    const [formDataId, setFormDataId] = useState(post_id);
    const [formDataFromApi, setFormDataFromApi] = useState<any>();
    const [compState, setCompState] = useState<{medias:IMedia[],oldMedias:IMedia[], isFormLoading: boolean}>({
        medias:[],
        oldMedias: [],
        isFormLoading: (formDataId == 0) ? false: true
    })


    //Получаем данные из API
    const getFormDataFromApi= async ( {id = 0, onlyMedia = false}) => {
        if(formDataId && formDataId != 0) {
            const response = await getEvents({evt_id: formDataId});
            const data: IEvent = response?.[0];
            const resp = {success: true, data: data, onlyMedia: onlyMedia};

            setFormDataFromApi(resp);
        }
    }

    const onChangeMedias = (data:IMedia[]) => {
        setCompState({...compState, medias: data});
    }

    const onOldMediaDelete = async (id:IMedia['id']) => {
        try {
            const response = await eventMediaDelete(id);
            if(response.success) {
                showMessage({
                    message: capitalizeFirstLetter(translate(Dictionary.media.deleteSuccess)),
                    type: "success"
                });
                await getFormDataFromApi({onlyMedia:true});
            } else {
                errorMessage({
                    message: capitalizeFirstLetter(getTranslateMessage('errors', response.message)),
                });
            }
        } catch (err) {
            errorMessage({
                message: capitalizeFirstLetter(getTranslateMessage('errors', 'unknownError')),
            });
        }
    }

    //Reaction of Api Data update
    useEffect(() => {
        if(formDataFromApi) {
            let tmpFieldsData = {...fieldsData};
            for (let index in fieldsData) {
                if (formDataFromApi?.data?.[index]) {
                    // @ts-ignore
                    tmpFieldsData[index] = formDataFromApi.data[index]
                }
            }
            if (!formDataFromApi.onlyMedia) { setFieldsData(tmpFieldsData) }
            setCompState({...compState, oldMedias: formDataFromApi?.data?.media ?? [], isFormLoading: false});
        }

    }, [formDataFromApi])

    //Реагируем на изменение ID
    useEffect(() => {
        if(formDataId != 0) {
            setCompState({...compState, isFormLoading: true});
            getFormDataFromApi({}).then();
        }
    }, [formDataId]);

    //Добавляем медиа
    const addMedias = async (id: any, fieldName: "event_id" | "pet_id" ) => {
        if(compState.medias.length > 0) {
            let mediaForm = new FormData();
            mediaForm.append(fieldName, id);
            mediaForm = getMediaForm(mediaForm, compState.medias);
            const response = await addEventMediaMultiply(mediaForm);
            return response;
        } else {
            return {success: true, data:id, message:""}
        }
    }

    //--- End of update functions


    useEffect(() => {
        if(isFocused) {
            setIsLoaded(true);
        }
    }, [isFocused]);


    const onFieldChange = ({form = 'event', field, data}:IEventOnFieldChange) => {
        let tmpFieldsData = {...fieldsData};
        //@ts-ignore
        tmpFieldsData[field] = data;
        setFieldsData(tmpFieldsData);
    }

    const [err, setErr] = useState<any>([]);

    const onSubmitForm = async () => {
        setIsUploading(true);
        if (isPhoneInText(fieldsData['description']) || isUrlInText(fieldsData['description']) || isEmailInText(fieldsData['description']) || isCardInText(fieldsData['description'])){
            errorMessage({
                message: "Если вы хотите добавить номер карты, телефон, емейл или сайт в описание поста - воспользуйтесь разделом объявления",});
            setIsUploading(false);
            return false;
        }

        try {

            const parentResp = (formDataId && formDataId != 0)
                ? await updateEvent(getFormData(fieldsData, "object"), formDataId)
                : await createEvent(getFormData(fieldsData));

            responseWithBadWords({
                resp: parentResp,
                messageBadWords: Dictionary.errors.badWords,
                messageError: "errors." + parentResp.message,
                callBackBadWords: () => { setIsUploading(false) },
                callBackError: () => {
                    setErr(parentResp?.originResp?.data?.fields ?? []);
                    setIsUploading(false);
                },
                callBackSuccess: () => {
                    addMedias(parentResp.data, "event_id").then((mediaResp) => {
                        if(mediaResp.success) {
                            showMessage({
                                message: translate(Dictionary.event.saveSuccess),
                                type: "success"
                            });
                            setIsUploading(false);
                            navigation.goBack();
                        } else {
                            setFormDataId(parentResp.data);
                            errorMessage({message: getTranslateMessage(Dictionary.errors.section, mediaResp.message)});
                            setIsUploading(false);
                            //navigation.goBack();
                        }
                    });
                },

            })

        } catch (error: any) {
            errorMessage({
                message: translate(Dictionary.errors.unknownError),
            });
            setIsUploading(false);
        }

    }

    return (
        <ScrollView style={{width:"100%"}}>
            {isLoaded &&
                <View style={profileStyles.profile}>
                    <View style={profileStyles.profileHeader}>
                        <View style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 18,
                                color: "#392413",
                                lineHeight: 22.5,
                                fontWeight: "500"
                            }}>{ post_id ? translate('post.updatePost') : translate('post.addPost')}</Text>
                        </View>

                        <View style={profileStyles.profileSettingsContainer}>
                            <TextInp
                                value={fieldsData.evt_topic}
                                placeholder={translate('event.topic')}
                                placeTextColor={colors.halfCedar}
                                style={[styles.input]}
                                onChangeText={(data) => {
                                    onFieldChange({field: 'evt_topic', data: data})
                                }}
                                err={err.includes('evt_topic')? true : false}
                            />
                            <TextArea
                                value={fieldsData.description}
                                placeholder={translate('description')}
                                onChangeText={(data) => {
                                    onFieldChange({field: 'description', data: data})
                                }}

                                err={err.includes('description')? true : false}
                            />

                            <MediaAddList
                                medias={compState.medias}
                                onChangeMedias={onChangeMedias}
                                oldMedias={compState.oldMedias}
                                onOldMediaDelete={onOldMediaDelete}
                            />

                            <View style={styles.submitButton}>
                                <ButtonSaveEvent
                                    onPress={onSubmitForm}
                                    buttonText={translate(
                                        (formDataId && formDataId != 0)
                                            ? Dictionary.common.buttonUpdate
                                            : Dictionary.common.buttonAdd
                                    ).toUpperCase()}
                                    style={styles.submitButton}
                                    loading={isUploading}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            }
        </ScrollView>
    );
};

export default PostForm;
