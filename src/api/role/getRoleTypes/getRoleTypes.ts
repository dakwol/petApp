import {API_BASE_URL, apiCall} from "../../api";
import {API_ROLE_MODEl} from "../const";
import {translate} from "../../../utils/translate";

export const getRoleTypes = async () => {
    const methodUrl = [API_ROLE_MODEl.url,API_ROLE_MODEl.methods.getRoleTypes.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);

    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: resp.data.types, message: translate('role.getRoleTypesSuccess')};
    } else {
        return {"success": false, data: [], message: [translate('role.getRoleTypesError'),resp.data.message].join('. ')};
    }

}
