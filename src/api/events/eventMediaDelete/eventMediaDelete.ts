import { IMedia } from "../../../types";
import {API_BASE_URL, apiCall} from "../../api";
import {API_EVENTS_MODEL} from "../const";

const LOCAL_MODEL = API_EVENTS_MODEL;
export const eventMediaDelete = async (id: IMedia['id']) => {
    const methodUrl = [LOCAL_MODEL.url, LOCAL_MODEL.methods.eventMediaDelete.url, id].join('/');
    const resp = await apiCall(LOCAL_MODEL.methods.eventMediaDelete.method, API_BASE_URL + methodUrl, { mediaId:id });
    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {} };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}
