import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

interface IUpdateNicknameProps {
    "nickname": string,
    "info_redactNick": string,
}

export const updateNickname = async (nickname: string) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.migrateNickname.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, { nickname });

    if (resp?.data?.status == "success") {
        return { "success": true, data: {}, message: resp?.data?.message ?? '' };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
