import { IMedia } from "../../../types";
import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

export const userUpdateAvatar = async (id: IMedia['id']) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userUpdateAvatar.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, { user_media_id: id });
    //@ts-ignore
    if(resp?.data?.status == "success") {
        return {"success": true, data: {} };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}
