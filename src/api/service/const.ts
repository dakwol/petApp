import { IAPI_SERVICES_MODEL } from "./types";

export const API_SERVICES_MODEL = {
    entity: 'service',
    url: 'service',
    methods: {
        getServices: {
            url: 'find'
        },
        findByOccupation: {
            url: 'find-by-occupation-ids'
        }

    }

} as const;
