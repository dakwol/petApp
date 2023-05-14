import {API_CHATS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

export const sendMessage = async (payload: any) => {
    const methodUrl = [API_CHATS_MODEl.url,API_CHATS_MODEl.methods.sendMessage.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.chat_message_id) {
        return {"success": true, data: resp.data.chat_message_id, message: '', originResp: resp};
    } else {
        return {"success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp};
    }
}
