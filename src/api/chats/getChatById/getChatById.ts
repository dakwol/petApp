import {API_CHATS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

export const getChatById = async (payload: any) => {
    const methodUrl = [API_CHATS_MODEl.url,API_CHATS_MODEl.methods.getChatById.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    if(resp && resp.data.status && resp.data.chat) {
        return resp.data.chat;
    } else {
        return [];
    }
}
