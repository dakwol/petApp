import {API_PETS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

interface IGetPetsByUserId {
    user_id: any;
}

export const getPetsByUserId = async (payload: any) => {
    const methodUrl = [API_PETS_MODEl.url,API_PETS_MODEl.methods.getPetsByUserId.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.pets) {
        return resp.data.pets;
    } else {
        return [];
    }
}
