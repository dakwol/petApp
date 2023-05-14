import React, {FC, useEffect, useRef, useState} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import ChatMessages from "../../../components/Project/ChatMessages/ChatMessages";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ViewBottom from "../../../components/UI/ViewBottom/ViewBottom";
import InputSend from "../../../components/UI/InputSend/InputSend";
import {Icons} from "../../../constants/images";
import {sendMessage} from "../../../api/chats/sendMessage/sendMessage";
import {ScrollView, Text, View} from "react-native";
import {responseWithBadWords} from "../../../utils/response";
import {Dictionary} from "../../../locales/dictionary";
import {getUserDataLive} from "../../../api/user/getUserDataLive/getUserDataLive";
import {IApiReturn} from "../../../types/api";
import {updateUserDataLive} from "../../../redux/AuthRedux/actions/actionCreator";
import {useDispatch, useSelector} from "react-redux";
import {SET_USER_DATA_LIVE} from "../../../redux/AuthRedux/actions/actionTypes";

interface IChatScreen {
    navigation: any;
    route: any;
}

const ChatScreen:FC<IChatScreen> = ({navigation, route, ...props}) => {
    const {chatId = 0 } = route?.params;

    const [message, setMessage] = useState<string>('');
    const [needRefresh, setNeedRefresh] = useState<boolean>(false);
    const [needUpdateLive, setNeedUpdateLive] = useState<boolean>(false);

    const inputRef = useRef();
    const onMessageChange = (data:any) => {
        setMessage(data);
    }

    //const userDataLive = useSelector((state:any) => state?.session?.userDataLive);
    const dispatch = useDispatch();

    if (needUpdateLive) {
        getUserDataLive([]).then( (resp:IApiReturn<any>) => {
            dispatch(updateUserDataLive({...resp.data}));
        });
        setNeedUpdateLive(false);
    }

    /*
    useEffect( () => {
        getUserDataLive([]).then( (resp:IApiReturn<any>) => {
            dispatch(updateUserDataLive({...resp.data}));
            console.log('wss chat screen', userDataLive);
        });
    }, []);
     */

    const onMessageSend = ( ) => {
        console.log('TEST',message);
        if(chatId && message != '') {
            const payload = {
                "chat_id": chatId,
                "msg_type": 0,
                "message": message,
            }
            sendMessage(payload).then( (resp) => {
                responseWithBadWords({
                    resp: resp,
                    messageBadWords: Dictionary.errors.badWords,
                    messageError: "errors." + resp.message,
                    callBackSuccess: () => {
                        //@ts-ignore
                        inputRef?.current?.clear();
                        setMessage('');
                        setNeedRefresh(true);
                    }
                })
            })
        }
    }

    return (
        <ViewScreen keyboardVerticalOffset={25}>
            <View style={[{flexDirection:"row", alignItems: "center"}]}>
                <BackButton
                    text={translate('back')}
                    action={() => navigation.goBack()}
                />
                {/* <Text style={[{flexDirection:"row", borderColor:"red", borderWidth: 0}]}>Chat header</Text> */}
            </View>


            <ScrollView style={{paddingHorizontal:20}}>
                <ChatMessages
                    chatId={chatId}
                    needRefresh = {needRefresh}
                    setNeedRefresh = {setNeedRefresh}
                    setNeedUpdateLive = {setNeedUpdateLive}
                />
            </ScrollView>
            <ViewBottom marginBottom={0}>
                <InputSend
                    inputRef={inputRef}
                    onChange={ onMessageChange }
                    onPress = { onMessageSend }
                    rightIcon={Icons.messageSend}
                    placeHolderText={translate('chat.send')} />
            </ViewBottom>

        </ViewScreen>
    );
};

export default ChatScreen;
