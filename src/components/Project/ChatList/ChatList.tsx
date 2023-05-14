import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {IChatList, IChatListItem} from "./types";
import {datetimeConvert, getFullDate} from "../../../utils/datetime";
import {getAvatar, getImageByUrl, getMediaPreviewSrc} from "../../../utils/common";
import {IUser} from "../../../types";
import {useSelector} from "react-redux";
import {Badge} from "react-native-elements";

//TODO: Протестить перевод на FlatList
const ChatList:FC<IChatList> = ({
                                    chats,
                                    onChatPress = (item) => { console.log(item) },
                                    unreadChats,
                                    ...props}) => {
    const onPress = (item:IChatListItem) => {
        onChatPress(item);
    }

    //TODO: подумать над логикой передачи данных по непрочитанным чатам

    return (
        <View style={styles.messagesContainer}>
            {chats.map( (chat) => {

                    //let chatUserAvatar:string = getMediaPreviewSrc(chat?.userB?.avatar_media);
                    //let chatUser:IUser = getMediaPreviewSrc(chat?.userB?.avatar_media);
                    //let chatImage:string = getAvatar('');
                    let hasEvent = false;
                    let chatMessage = '';

                    if(chat.chat_messages && chat.chat_messages.length > 0) {
                        chatMessage = chat.chat_messages[chat.chat_messages.length - 1]?.message;
                    }

                    //if(chat.userB.avatar) {
                        //chatUser = chat.userB.avatar;
                    //}

                    if(chat.event){
                        hasEvent = true;
                    }

                    return(
                        <TouchableOpacity key={chat.id} onPress={() => onPress(chat)} style={styles.messageObject}>
                            <View style={styles.messageImage}>
                                <Image resizeMode={"contain"} style={styles.messageImageIcon} source={getMediaPreviewSrc(chat?.userB?.avatar_media)}/>
                            </View>
                            <View style={styles.messageObjectText}>
                                <View>
                                    <Text numberOfLines={1} style={{fontSize: 14}}>{chat.userB.first_name} {chat.userB.last_name}</Text>
                                    {unreadChats.includes(chat.id) && (
                                        <Badge
                                            status="error"
                                            containerStyle={{ position: "absolute", top: 4, right: -12}}
                                        />
                                    )}
                                </View>
                                <Text numberOfLines={1} style={{
                                    fontWeight: "bold",
                                    color: "#8AC43A",
                                    fontSize: 12,
                                    lineHeight: 15
                                }}>{chat.event?.evt_topic}</Text>
                                <Text numberOfLines={1} style={{
                                    color: "#392413",
                                    fontSize: 12,
                                    opacity: 0.6
                                }}>{chatMessage}</Text>
                            </View>
                            <View style={styles.userImage}>
                                {hasEvent && false &&
                                <Image resizeMode={"cover"} style={styles.messageImageUser} source={getMediaPreviewSrc(chat?.event?.media)}/>
                                }
                            </View>
                            <View style={styles.dateContainer}>
                                <Text numberOfLines={1} style={{color: "#392413", opacity: 0.6}}>{getFullDate(chat.updated_at)}</Text>
                            </View>
                        </TouchableOpacity>

                    )
                }
            )}
        </View>
    );
};

export default ChatList;
