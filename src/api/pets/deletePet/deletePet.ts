import { API_PETS_MODEl } from "../const";
import { API_BASE_URL, apiCall } from "../../api";
import { translate } from "../../../utils/translate";

export const deletePet = async (id: any) => {
    const methodUrl = [API_PETS_MODEl.url, API_PETS_MODEl.methods.deletePet.url, id].join('/');
    const resp = await apiCall('delete', API_BASE_URL + methodUrl);
    //@ts-ignore
    if (resp && resp?.status == 202) {
        return { "success": true, data: resp.data.pet_id, message: 'pet.deletePetSuccess', originResp: resp };
    } else {
        return { "success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp };
    }
}
