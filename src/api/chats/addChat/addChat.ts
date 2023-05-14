import {API_CHATS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

interface IAddChatProps {
    event_id?: number,
    chat_initiator: number,
    chat_user: number
}

export const addChat = async (payload: IAddChatProps) => {
    const methodUrl = [API_CHATS_MODEl.url,API_CHATS_MODEl.methods.addChat.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.status == "success" && resp.data.chat_id) {
        return {"success": true, data: resp.data.chat_id, message: 'chat.addChatSuccess'};
    } else {
        return {"success": false, data: {}, message: resp?.data?.message?? 'errors.unknownError'};
    }
}
