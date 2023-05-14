import { IAPI_SYSTEM_MODEL } from "./types";

export const API_SYSTEM_MODEL = {
    entity: 'system',
    url: 'system',
    methods: {
        getVersion: {
            url: 'get-version'
        }

    }

} as const;
