import {API_BASE_URL, apiCall} from "../../api";
import {API_CATEGORIES_MODEl} from "../const";
import {translate} from "../../../utils/translate";
interface IGetSubCategories {
    category_id: number;
}
export const getSubCategories = async (payload: IGetSubCategories) => {
    const methodUrl = [API_CATEGORIES_MODEl.url,API_CATEGORIES_MODEl.methods.getSubCategories.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp?.data?.status == "success") {
        return {"success": true, data: resp.data.categories, message: translate('categories.getSubCategoriesSuccess')};
    } else {
        return {"success": false, data: [], message: [translate('categories.getSubCategoriesError'),resp.data.message].join('. ')};
    }
    /*
    if(resp && resp.data.status && resp.data.pets) {
        return resp.data.pets;
    } else {
        return [];
    }

     */
}
