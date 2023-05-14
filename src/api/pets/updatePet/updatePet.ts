import {API_PETS_MODEl} from "../const";
import {API_BASE_URL, apiCall} from "../../api";
import {translate} from "../../../utils/translate";
import {Dictionary} from "../../../locales/dictionary";

export const updatePet = async (payload: any, petId: any) => {
    const methodUrl = [API_PETS_MODEl.url,API_PETS_MODEl.methods.updatePet.url,petId].join('/');
    console.log('API DATA', payload);
    const resp = await apiCall(API_PETS_MODEl.methods.updatePet.method, API_BASE_URL + methodUrl, payload);

    if(resp?.data?.status == "success") {
        return {"success": true, data: petId, message: Dictionary.pet.saveSuccess, originResp: resp};
    } else {
        return {"success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp};
    }
}
