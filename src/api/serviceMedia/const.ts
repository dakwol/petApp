import { IAPI_SERVICE_MEDIA_MODEL } from "./types";

export const API_SERVICE_MEDIA_MODEL = {
    entity: 'user/service_media',
    url: 'user/service_media',
    methods: {
        serviceMedia: {
            url: 'add'
        },
        getServicesMedia: {
            url: 'get'
        },
        deleteServicesMedia: {
            url: 'delete'
        },

    }

} as const;
