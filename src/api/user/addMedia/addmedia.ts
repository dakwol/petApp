import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

interface IAddStories {
    media_file: any[];
    descriptions: string[];
    //"media_files[1]": any;
    //"descriptions[1]": string;
}

export const addMedia = async (payload: any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.addMedia.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    //@ts-ignore
    if (resp) {
        return { "success": true, data: {} };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}
