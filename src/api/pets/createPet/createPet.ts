import {API_PETS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";
import {translate} from "../../../utils/translate";

export const createPet = async (payload: any) => {
    const methodUrl = [API_PETS_MODEl.url,API_PETS_MODEl.methods.createPet.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.status == "success" && resp.data.pet_id) {
        return {"success": true, data: resp.data.pet_id, message: 'pet.addPetSuccess', originResp: resp};
    } else {
        return {"success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp};
    }
}
