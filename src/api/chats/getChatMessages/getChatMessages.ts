import {API_CHATS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

interface IGetChatMessages {
    chat_id: number
}

export const getChatMessages = async (payload: IGetChatMessages) => {
    const methodUrl = API_CHATS_MODEl.methods.getChatMessages.url.replace('{chat_id}',payload.chat_id.toString())
    const url = [API_CHATS_MODEl.url,methodUrl].join('/');
    const resp = await apiCall('post', API_BASE_URL + url, payload);


    // @ts-ignore
    if(resp && resp.status && resp.status == 200) {
        return {"success": true, data: resp.data.data};
    } else {
        return {"success": false, data: {}, message: resp?.data?.message?? 'errors.unknownError'};
    }
}
