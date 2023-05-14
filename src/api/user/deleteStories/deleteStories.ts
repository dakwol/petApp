import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const deleteStories = async (id: number) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.deleteStories.url, id].join('/');
    const resp = await apiCall('delete', API_BASE_URL + methodUrl, { story_id: id });
    if (resp && resp.data.status && resp.data.status == "success") {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
