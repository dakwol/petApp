import { IUser } from "../../../types";
import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";
import {IApiReturn} from "../../../types/api";

export const getUserStories = async (id: IUser['id']):Promise<IApiReturn<any[]>> => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.getUserStories.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, { user_id: id, is_active: true });
    //@ts-ignore
    if (resp?.data?.status == "success") {
        return { "success": true, data: resp.data.stories };
    } else {
        return { "success": false, data: [], message: resp?.data?.message ?? 'unknownError' };
    }

}
