import {API_PETS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

export const addPetMediaMultiply = async (payload:any) => {
    const methodUrl = [API_PETS_MODEl.url,API_PETS_MODEl.methods.addPetMediaMultiply.url].join('/');
    const resp = await apiCall(
        'post',
        API_BASE_URL + methodUrl,
        payload
    );

    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: resp.data, message: resp.data.message};
    } else {
        return {"success": false, data: resp.data, message: resp.data.message};
    }
};
