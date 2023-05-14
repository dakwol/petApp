import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";
import {capitalizeFirstLetter} from "../../../utils/text";
import {INotifMnemo} from "../types";



export const updateNotifSettings = async (data: 1 | 0, mnemo:INotifMnemo = "settings") => {
    //const data = (notification === true) ? 1:0;
    const methodName:any = 'updateNotif' + capitalizeFirstLetter(mnemo);
    // @ts-ignore
    const methodSubUrl:any = API_USERS_MODEL.methods[methodName].url;
    const methodUrl = [API_USERS_MODEL.url, methodSubUrl].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, {notification:data});
    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {}, message: ''};
    } else {
        return {"success": false, data: {}, message: ''};
    }

}
