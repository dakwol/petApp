import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";
import {translate} from "../../../utils/translate";

export const getReviewsByUserId = async (payload: any) => {
    /*
    const methodUrl = [API_USERS_MODEL.url,API_USERS_MODEL.methods.getReviewsByUserId.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: resp.data.reviews, message: translate('user.getReviewsByUserIdSuccess')};
    } else {
        return {"success": false, data: [], message: [translate('user.getReviewsByUserIdError'),resp.data.message].join('. ')};
    }

     */
}
