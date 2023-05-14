import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";
import {translate} from "../../../utils/translate";

export const addFirebaseToken = async (firebaseToken:string) => {
    const methodUrl = [API_USERS_MODEL.url,API_USERS_MODEL.methods.addFirebaseToken.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, {firebase_token:firebaseToken});

    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {}, message: ''};
    } else {
        return {"success": false, data: {}, message: ''};
    }

}
