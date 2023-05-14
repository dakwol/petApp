import { IMedia } from "../../../types";
import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

export const userDeleteMedia = async (id: IMedia['id']) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userMedia.url, id].join('/');
    const resp = await apiCall('delete', API_BASE_URL + methodUrl, { mediaId:id });
    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {} };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}
