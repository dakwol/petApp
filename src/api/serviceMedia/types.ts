export interface IAPI_SERVICE_MEDIA_MODEL {
    entity: string,
    url: string,
    methods: {
        [x: string]: {
            url: string
        }
    }
    [x: string]: any,
}

