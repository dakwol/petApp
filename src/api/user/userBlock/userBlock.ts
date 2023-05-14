
import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const userBlock = async (id: number | undefined) => {
    console.log('-=-==--', id)
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userBlock.url, id].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, { user_id: id });
    if (resp.status == 202) {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, message: resp?.data?.message ?? 'unknownError' };
    }

}
