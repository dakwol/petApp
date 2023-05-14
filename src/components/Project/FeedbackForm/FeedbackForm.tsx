import React, {FC, useState} from 'react';
import {ScrollView, Text, TextInput, View} from "react-native";
import {useSelector} from "react-redux";
import {showMessage} from "react-native-flash-message";
import {getTranslateMessage, translate} from "../../../utils/translate";
import styles from "./styles";
import {Dictionary} from "../../../locales/dictionary";
import DropdownSelect from "../../UI/DropdownSelect/DropdownSelect";
import {colors} from "../../../constants/Colors";
import ButtonSaveEvent from "../ButtonSaveEvent/ButtonSaveEvent";
import {responseWithBadWords} from "../../../utils/response";
import {getFormData} from "../../../utils/formData";
import {userSupportCreateTicket} from "../../../api/user/userSupportCreateTicket/userSupportCreateTicket";
import {userSupportTicketAddMessage} from "../../../api/user/userSupportTicketAddMessage/userSupportTicketAddMessage";
import {useNavigation} from "@react-navigation/native";
import {errorMessage} from "../../../utils/showMessage";
import TextArea from '../../UI/TextArea/TextArea';

interface IFormData {
    topic_id: number,
    message: string
}

interface IFieldChangeProps {
    form:string,
    field:string,
    data:any
}

interface IFeedbackFormProps {
    defaultTopicId?:number
    defaultText?:string
    buttonText?: string
    isDeleteAccount?: boolean
}

const FeedbackForm:FC<IFeedbackFormProps> = ({
                                                defaultTopicId= 0,
                                                defaultText = null,
                                                buttonText = null,
                                                isDeleteAccount= false,
                                             }) => {
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const user_id = userInfo.user_id;

    const [formData, setFormData] = useState<IFormData>({
        topic_id: defaultTopicId ? defaultTopicId : 0,
        message: defaultText ? defaultText : '',
    })

    const [ticketId, setTicketId] = useState<number>(0);

    const topics = [
        {
            id:1,
            value: 1,
            label: 'Вопрос по приложению'
        },
        {
            id:2,
            value: 2,
            label: 'Другое'
        },
        {
            id:3,
            value: 3,
            label: 'Удаление аккаунта'
        }
    ];


    const onFieldChange = ({form = 'pet', field, data}: IFieldChangeProps) => {
        let tmpFieldsData = {...formData};
        //@ts-ignore
        tmpFieldsData[field] = data;
        setFormData(tmpFieldsData)
        console.log(tmpFieldsData);
    }


    const navigation = useNavigation();

    /*
    useEffect(() => {
        getUserById(user_id).then((userResp) => {
            console.log('userRespSource', userResp);
            setCompState({...compState, userData: userResp, oldMedias:userResp.media})
        });
    }, [])
     */

    const saveTicket = async () => {
        const formDataSave = getFormData({
            topic_id:formData.topic_id
        });
        try {
            const resp = await userSupportCreateTicket(formData.topic_id);

            if(resp.success) {
                return resp.data;
            } else {
                errorMessage({
                    message: getTranslateMessage(Dictionary.errors.section, resp.message),
                });
                return false;
            }

        } catch (error: any) {
            errorMessage({
                message: translate(Dictionary.errors.unknownError),
            });
            return false
        }
    }
    const saveMessage = async (ticket_id: any) => {
        const formDataSave = getFormData({
            ticket_id: ticket_id,
            message:formData.message
        });
        try {
            const resp = await userSupportTicketAddMessage({
                ticket_id: ticket_id,
                message:formData.message
            });

            responseWithBadWords({
                resp: resp,
                messageSuccess: Dictionary.profile.ticketsend,
                messageBadWords: Dictionary.errors.badWords,
                messageError: "errors." + resp.message,
                callBackBadWords: () => {

                },
                callBackError: () => {

                },
                callBackSuccess: () => {
                    navigation.goBack();
                },
            })


        } catch (error: any) {
            errorMessage({
                message: translate(Dictionary.errors.unknownError),
            });
            return false
        }
    }

    const onSubmit = async(  ) => {
        let ticket_id = ticketId;
        console.log('TICKET ID', ticket_id, ticket_id);
        if(ticketId == 0) {
            const resp = await saveTicket();
            if(resp != false) {
                setTicketId(resp.id);
            } else {
                return false;
            }
            ticket_id = resp.id;
        }

        await saveMessage(ticket_id);
    }

    return (
        <ScrollView style={[styles.container]}>
            <View style={[styles.formLayout]}>
                <View style={styles.centerLayout}>

                    <View style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 18,
                            color: "#392413",
                            lineHeight: 22.5,
                            fontWeight: "500"
                        }}>{isDeleteAccount ? 'Заявка на удаление аккаунта' : translate(Dictionary.profile.sendfeedback)}</Text>
                    </View>

                    {isDeleteAccount ?
                        <View style={{marginTop:25, marginBottom: 15}}>
                        <Text>Заявки на удаления аккаунта обрабатываеются в течении 24х часов. После удаления аккаунта, Вы получите письмо подтверждающее его удаление</Text>
                        </View>
                        :
                        <></>

                    }

                    <DropdownSelect
                        data={topics} //Add sample data
                        defaultValue={ (defaultTopicId ? defaultTopicId : formData.topic_id) }
                        onSelect={ (item:any) => {
                            onFieldChange({form: 'feedback', field: 'topic_id', data: item.value})
                        }}
                        placeholder={translate(Dictionary.profile.selectfeedbacktheme)}
                    />
                    <Text style={{marginTop:10}}>
                    </Text>
                    <TextArea
                        value={defaultText ? defaultText : formData.message}
                            placeholder={ defaultText ? defaultText : translate(Dictionary.profile.enterquestion)}
                            onChangeText={(data) => {
                                onFieldChange({form: 'feedback', field: 'message', data: data})
                            }}
                        />
                    <ButtonSaveEvent
                        onPress={onSubmit}
                        buttonText={buttonText ? buttonText : translate(Dictionary.profile.sendquestion)}
                        style={styles.submitButton}
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

export default FeedbackForm;
