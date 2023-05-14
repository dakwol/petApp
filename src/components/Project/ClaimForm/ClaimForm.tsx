import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from "react-native";
import {translate} from "../../../utils/translate";
import styles from "./styles";
import {Dictionary} from "../../../locales/dictionary";
import ButtonSaveEvent from "../ButtonSaveEvent/ButtonSaveEvent";
import TextArea from '../../UI/TextArea/TextArea';
import {getEventClaimTopics} from '../../../api/claim/getEventsClaimTopics/getEventsClaimTopics';
import DropdownSelect from '../../UI/DropdownSelect/DropdownSelect';
import {responseWithBadWords} from '../../../utils/response';
import {errorMessage} from '../../../utils/showMessage';
import {createClaimClaims} from '../../../api/claim/createClaimClaims/createClaimClaims';
import {useNavigation} from "@react-navigation/native";
import {capitalizeFirstLetter} from "../../../utils/text";

type Props = {
    eventId: any,
};


interface ICompState {
    topics: any[],
    isClaimLoading: boolean,
    event: Event | null,
    isEventLoading: boolean,
}

const ClaimForm:FC<Props> = ({eventId, ...props}) => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        topic_id:0,
        text: '',
    })
    const [compState, setCompState] = useState<ICompState>({
        topics: [],
        isClaimLoading: false,
        event: null,
        isEventLoading: true
    })
    const [claimsTopics, setClaimsTopics] = useState<{ value: number, label: string }[]>([]);



    const saveClaimEvent = async () => {
        setCompState({...compState, isClaimLoading: true});
        try {
            let resp = await createClaimClaims({
                event_id: eventId,
                topic_id: formData.topic_id,
                text: formData.text,
            });

            await responseWithBadWords({
                resp: resp,
                messageBadWords: Dictionary.errors.badWords,
                messageError: "errors." + resp.message,
                messageSuccess: "profile.FeedbackAddSuccess",
                callBackBadWords: () => {
                    setCompState({...compState, isClaimLoading: false});
                },
                callBackError: () => {
                    setCompState({...compState, isClaimLoading: false});
                },
                callBackSuccess: () => {
                    navigation.goBack();
                }
            })

        } catch (error: any) {
            errorMessage({
                message: translate(Dictionary.errors.unknownError),
            });
            setCompState({...compState, isClaimLoading: false});
            return false
        }
    }

    const onSubmit = async () => {
        await saveClaimEvent();
    }

    useEffect(() => {
        getEventClaimTopics().then(resp => {
            let tmpHash: any = {};
            let tmpList: any[] = [];
            resp.topics.map((topics: any) => {
                tmpHash[topics.id] = topics;
                tmpList.push({
                    label: topics.name,
                    value: topics.id
                });
            });
            setClaimsTopics(tmpList);
        });
    }, []);


    return (
        <ScrollView style={[styles.container]}>
            <View style={[styles.formLayout]}>
                <View style={styles.centerLayout}>

                    {claimsTopics.length == 0
                        ?
                        <ActivityIndicator size={48}/>
                        :
                        <>
                            <DropdownSelect
                                defaultValue={formData.topic_id}
                                data={claimsTopics}
                                onSelect={value => {
                                    setFormData((pre) => ({...pre, topic_id: value.value}))
                                }}
                                placeholder={'Выберите причину жалобы'}
                            />
                            <TextArea
                                value={formData.text}
                                placeholder={translate(Dictionary.profile.enterquestion)}
                                onChangeText={value => {
                                    setFormData((pre) => ({...pre, text: value}))
                                }}
                            />
                            <ButtonSaveEvent
                                onPress={onSubmit}
                                buttonText={capitalizeFirstLetter(translate(Dictionary.common.send))}
                                style={styles.submitButton}
                                loading={compState.isClaimLoading}
                            />
                        </>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
export default ClaimForm;
