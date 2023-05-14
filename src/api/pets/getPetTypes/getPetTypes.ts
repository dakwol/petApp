import {API_PETS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

export const getPetTypes = async () => {
    const methodUrl = [API_PETS_MODEl.url,API_PETS_MODEl.methods.getPetTypes.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);

    if(resp && resp.data.status && resp.data.types) {
        return resp.data.types;
    } else {
        return [];
    }
}
