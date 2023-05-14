import { IAPI_OCCUPATION_MODEL } from "./types";

export const API_OCCUPATION_MODEL = {
    entity: 'occupation',
    url: 'occupation',
    methods: {
        occupationList: {
            url: 'list'
        },

    }

} as const;
