import {IAPI_CHATS_MODEL} from "./types";
import {sendMessage} from "./sendMessage/sendMessage";


export const API_CHATS_MODEl:IAPI_CHATS_MODEL = {
    entity: 'chat',
    url: 'chat',
    methods: {
        getChats: {
            url: 'get-chats'
        },
        getChatById: {
            url: 'get-chat-by-id'
        },
        sendMessage: {
            url: 'add-message'
        },
        addChat: {
            url: 'add-chat'
        },
        getChatMessages: {
            url:'messages'
        }

    }

} as const;
