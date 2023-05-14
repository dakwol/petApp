import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const moderateStories = async (id: number, reason: string) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.moderateStories.url, id].join('/');
    const resp = await apiCall('delete', API_BASE_URL + methodUrl, { story_id: id, reason: reason });
    //@ts-ignore
    if (resp && resp?.status == 202) {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
