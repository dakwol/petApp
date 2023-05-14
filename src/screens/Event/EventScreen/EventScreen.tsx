import React, {FC, useEffect, useRef, useState} from 'react';
import {Image, Keyboard, View} from "react-native";
import EventCard from "../../../components/Project/EventCard/EventCard";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import ViewBottom from "../../../components/UI/ViewBottom/ViewBottom";
import InputSend from "../../../components/UI/InputSend/InputSend";
import {Icons, moderation} from "../../../constants/images";
import {addCommentToEvent} from "../../../api/events/addCommentToEvent/addCommentToEvent";
import {Dictionary} from "../../../locales/dictionary";
import {responseWithBadWords} from "../../../utils/response";
import {SCREENS} from "../../../navigation/screenName";
import {useIsFocused} from "@react-navigation/native";
import {navigateTo} from "../../../utils/navigate";
import { TouchableOpacity } from 'react-native-gesture-handler';


interface IEventScreen {
    eventId?: number,
    route: any,
    navigation: any,
}

const EventScreen:FC<IEventScreen> = ({
                                          navigation,
                                          route
                                      }) => {

    const [eventId, setEventId] = useState(0);
    const [comment, setComment] = useState<string>('');
    const [needCommentsRefresh, setNeedCommentsRefresh] = useState<boolean>(true);

    //TODO: EventScreen types - route and navigation

    const inputRef = useRef();

    const navigateBack = () => {
        switch(route?.params?.prevScreen) {
            case "HOME": {
                navigation.navigate({name: "HomeScreen", params:{noRefresh:true}});
                break;
            }
            case SCREENS.ProfileUserScreen: {
                navigation.navigate({name: SCREENS.ProfileUserScreen, params:{userId: route?.params?.userId}});
                break;
            }
            default: {
                navigation.goBack();
            }
        }
    }
    const onCommentChange = (data:any) => {
        setComment(data);
    }
    const onCommentAdd = ( ) => {
        if(eventId && comment != '') {
            const payload = {
                "evt_id": eventId,
                "comment": comment,
            }
            addCommentToEvent(payload).then( (resp) => {
                responseWithBadWords({
                    resp: resp,
                    messageSuccess: Dictionary.comment.addSuccess,
                    messageBadWords: Dictionary.errors.badWords,
                    messageError: "errors." + resp.message,
                    callBackSuccess: () => {

                        // @ts-ignore
                        inputRef?.current?.clear();
                        Keyboard.dismiss();
                        setComment('');
                        setNeedCommentsRefresh(true);
                    }
                })
            })
        }
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        const { id = 0, eventId =0 } = route?.params ?? {};

        setEventId( id ? id: eventId);
        setNeedCommentsRefresh(true);
    }, [isFocused]);

    const [role, setRole] = useState<number>();

    return (
        <ViewScreen keyboardVerticalOffset={25}>
            <View style={{justifyContent: 'space-between', alignItems:'center', flexDirection:'row'}}>
                <BackButton
                    text={translate('back')}
                    action={() => navigateBack()}
                />
            </View>
            <EventCard
                eventId={eventId}
                needCommentsRefresh={needCommentsRefresh}
                setNeedCommentsRefresh={setNeedCommentsRefresh}      
            />
            <ViewBottom marginBottom={0}>
                <InputSend
                    inputRef={inputRef}
                    onChange={ onCommentChange }
                    onPress = { onCommentAdd }
                    rightIcon={Icons.messageSend}
                    placeHolderText={translate('comment.add')} />
            </ViewBottom>
        </ViewScreen>
    );
};

export default EventScreen;
