import {IAPI_ENTITY_MODEL} from "../types";

export const API_CATEGORIES_MODEl:IAPI_ENTITY_MODEL = {
    entity: 'category',
    url: 'category',
    methods: {
        getSubCategories: {
            url: 'get-sub-categories'
        },
    }

} as const;
