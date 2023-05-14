import React, {createRef, FC, useEffect, useRef, useState} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {styles} from "./styles";
import {getChatById} from "../../../api/chats/getChatById/getChatById";
import {translate} from "../../../utils/translate";
import {getFullDateTime, getTimeFromDate} from "../../../utils/datetime";
import {IChatListItemUser} from "../ChatList/types";
import {getChatMessages} from "../../../api/chats/getChatMessages/getChatMessages";
import {showMessage} from "react-native-flash-message";
import {getImageByUrl, getMediaFirst, getMediaFullSrc, getMediaPreviewSrc} from "../../../utils/common";
import {IEvent, IUser} from "../../../types";
import {errorMessage} from "../../../utils/showMessage";
import ChatBubble from "../../UI/ChatBubble/ChatBubble";

interface IChatMessagesComponent {
    chatId: number;
    needRefresh:boolean;
    setNeedRefresh: any;
    setNeedUpdateLive?: any;
}

interface IChatMessage {
    message: string;
    created_at: any;
    user_id:any;
    [x:string]: any;
}

interface IChat {
    chat_messages?: IChatMessage[];
    chat_initiator_user: IUser,
    chat_user: IUser,
    userA: IUser;
    userB: IUser;
    event: IEvent;
    [x:string]: any;
}

const ChatMessages:FC<IChatMessagesComponent> = ({chatId, needRefresh, setNeedRefresh, setNeedUpdateLive, ...props}) => {

    const [chat, setChat] = useState<IChat | undefined>(undefined);
    const [chatInfo, setChatInfo] = useState<any>({});
    const [message, setMessage] = useState<string>('');


    const [compState, setCompState] = useState({
        messages: [],
        lastRefresh: 0,
        isChatInfoLoaded: false,
        refreshTimeout: null
    })

    useEffect( () => {
        if( chat == undefined) {
            getChatById({chat_id: chatId}).then((data: IChat) => {
                let chatUser = data?.event?.user_id == data.userA.id ? data.userA : data.userB;
                let tmpInfo = {
                    chatUser: chatUser,
                    chatImage: getMediaFullSrc(getMediaFirst(data?.event?.media)),
                    chatHeader: [chatUser.first_name, chatUser.last_name].join(' '),
                    chatSubHeader: data && data?.event?.evt_topic ? data.event.evt_topic : '',
                }
                setChatInfo(tmpInfo);
                setChat(data);
                setNeedUpdateLive(true);
            })
        }
        refreshMessages().then();
    }, []);

    useEffect(() =>{
        if(needRefresh) {
            refreshMessages().then(resp => {
                setNeedRefresh(false);
            });
        }
    }, [needRefresh])

    const refreshMessages = async () => {
        if(compState.refreshTimeout != null) {
            // @ts-ignore
            clearTimeout(compState.refreshTimeout);
        }
        getChatMessages({chat_id: chatId}).then(resp => {
            //console.log(resp);
            if (resp.success) {
                //setCompState({...compState, messages: resp.data.reverse()})

                setCompState({...compState,
                    lastRefresh: Date.now(),
                    messages: resp.data.reverse(),
                    // @ts-ignore
                    //refreshTimeout: setTimeout(() => { refreshMessages() } , 10000)
                })
            } else {
                errorMessage({
                    message: translate(resp.message)
                })
            }

        })
    }

    return (

            <ScrollView
                style={[styles.messageViewer]}>
                {chat &&
                <View style={styles.messageHeader}>
                    <View style={{justifyContent: 'flex-start'}}>
                        <Text style={{
                            color: "#392413",
                            fontSize: 14,
                            lineHeight: 17,
                            fontWeight: "400"
                        }}>{chatInfo.chatHeader}</Text>
                        <Text style={{
                            marginTop: 5,
                            color: "#8AC43A",
                            fontSize: 14,
                            lineHeight: 17,
                            fontWeight: "700"
                        }}>{chatInfo.chatSubHeader}</Text>
                    </View>
                    <View style={{justifyContent: 'flex-start'}}>
                        <Text style={{
                            color: "#392413",
                            fontSize: 10,
                            lineHeight: 12,
                            opacity: 0.6,
                            fontWeight: "400"
                        }}></Text>
                    </View>

                    <View style={{justifyContent: 'flex-start'}}>
                        <Image resizeMode={"cover"} style={styles.messageImageIcon}
                               source={getMediaFullSrc(getMediaFirst(chat?.event?.media ?? chat?.userB?.avatar_media ))}/>
                    </View>

                </View>
                }
                {chat && compState.messages &&
                <View style={styles.messageBody}>
                    {compState.messages?.map((message: IChatMessage) =>
                        message.user_id == chat?.userA?.id
                            ?
                            <ChatBubble
                                key={message.id}
                                mine={true}
                                text={message.message }
                                dt_added={getTimeFromDate(message.created_at)}
                            />
                            /* <View  key={message.id} style={[styles.messageSender]}>
                                <Image resizeMode={"cover"} style={styles.messageImageUser} source={getMediaPreviewSrc(chat?.userA?.avatar_media)}/>
                                <Text style={styles.messageText}>{message.message}</Text>
                                <Text style={styles.messageTime}>{getFullDateTime(message.created_at)}</Text>
                            </View>
                            */
                            :
                            <ChatBubble
                                key={message.id}
                                mine={false}
                                text={message.message}
                                dt_added={getTimeFromDate(message.created_at)}
                            />
                            /*
                            <View  key={message.id} style={styles.messageReceiver}>
                                <Text style={styles.messageTime}>{getFullDateTime(message.created_at)}</Text>
                                <Text style={styles.messageText}>{message.message}</Text>
                                <Image resizeMode={"cover"} style={styles.messageImageUser} source={getMediaPreviewSrc(chat?.userB?.avatar_media)}/>
                            </View>

                             */
                    )}
                    <View style={[{marginTop:105}]}></View>
                </View>

                }
            </ScrollView>
    )
}

export default ChatMessages


