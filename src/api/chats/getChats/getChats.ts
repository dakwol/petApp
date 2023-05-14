import {API_CHATS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

export const getChats = async (payload: any) => {
    const methodUrl = [API_CHATS_MODEl.url,API_CHATS_MODEl.methods.getChats.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    console.log(resp);
    if(resp && resp.data.status && resp.data.chats) {
        return resp.data.chats;
    } else {
        return [];
    }
}
