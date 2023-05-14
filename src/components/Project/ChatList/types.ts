import {ImageSourcePropType} from "react-native";
import {IUser} from "../../../types";

export interface IChatListItemEvent {
    id:number;
    evt_topic: string;
    [x:string]: any;
}

export interface IChatListItemUser {
    id:number,
    avatar: number,
    first_name: string,
    last_name: string,
    [x:string]: any;
}

export interface IChatListItem {
    id:number,
    chat_messages: any[],
    userA:IUser;
    userB:IUser;
    updated_at: string;
    event: IChatListItemEvent | undefined;
    [x:string]: any;
}

export interface IChatList {
    chats: IChatListItem[];
    onChatPress: (item: IChatListItem) => void;
    unreadChats: any[]
}
