export interface IAPI_OCCUPATION_MODEL {
    entity: string,
    url: string,
    methods: {
        [x: string]: {
            url: string
        }
    }
    [x: string]: any,
}

