import { IAPI_REGION_MODEL } from "./types";

export const API_REGION_MODEL = {
    entity: 'region',
    url: 'region',
    methods: {
        findRegion: {
            url: 'findAll'
        },

    }

} as const;
