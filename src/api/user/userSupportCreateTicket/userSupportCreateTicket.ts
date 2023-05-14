import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

export const userSupportCreateTicket = async (topic_id: number) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userSupportCreateTicket.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, { topic_id: topic_id });

    if(resp?.data?.status == "success" && resp?.data?.ticket) {
        return {"success": true, data: resp?.data?.ticket };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}
