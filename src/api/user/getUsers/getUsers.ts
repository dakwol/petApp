import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const getUsers = async (payload: { nickname: string | undefined }) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.getUsers.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}

export const getServiceUsers = async (payload: any, option?:number) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.getUsers.url].join('/');

    payload.is_service = 1;

    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    //console.log('wss payload', payload);
    //console.log('wss option', option);

    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data?.user };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
