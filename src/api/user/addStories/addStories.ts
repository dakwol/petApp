import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

interface IAddStories {
    media_files: any[];
    descriptions: string[];
    //"media_files[1]": any;
    //"descriptions[1]": string;
}

export const addStories = async (payload: any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.addStories.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    //@ts-ignore
    if (resp?.data?.status == "success") {
        return { "success": true, data: {} };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
