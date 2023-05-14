import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

export const userSupportTicketAddMessage = async (payload: { ticket_id:any, message:string }) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userSupportTicketAddMessage.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp?.data?.status == "success") {
        return {"success": true, data: resp?.data?.message };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}

