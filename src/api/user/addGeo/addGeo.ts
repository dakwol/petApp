import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";
import {translate} from "../../../utils/translate";

export const addGeo = async (lat:any, long:any) => {
    const methodUrl = [API_USERS_MODEL.url,API_USERS_MODEL.methods.addGeo.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, {lat:lat, long:long});
    if(resp?.data?.status == "success") {
        return {"success": true, data: {}, message: ''};
    } else {
        return {"success": false, data: {}, message: ''};
    }

}
