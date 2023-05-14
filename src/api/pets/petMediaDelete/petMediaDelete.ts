import { IMedia } from "../../../types";
import {API_BASE_URL, apiCall} from "../../api";
import {API_PETS_MODEl} from "../const";

export const petMediaDelete = async (id: IMedia['id']) => {
    const methodUrl = [API_PETS_MODEl.url, API_PETS_MODEl.methods.petMediaDelete.url, id].join('/');
    const resp = await apiCall(API_PETS_MODEl.methods.petMediaDelete.method, API_BASE_URL + methodUrl, { mediaId:id });
    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {} };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}
