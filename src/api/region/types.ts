export interface IAPI_REGION_MODEL {
    entity: string,
    url: string,
    methods: {
        [x: string]: {
            url: string
        }
    }
    [x: string]: any,
}

