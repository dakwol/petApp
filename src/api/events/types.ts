export interface IAPI_EVENTS_MODEL {
    entity: string,
    url: string,
    methods: {
        [x:string] : {
            url:string
        }
    }
    [x: string]: any,
}

export interface IAPI_GET_EVENTS_FAV_PROPS {
    [x: string]: any,
}

export interface IAPI_GET_EVENTS_BY_USER_PROPS {
    [x: string]: any,
}

export interface IAPI_GET_EVENTS_FAV_OUTPUT {
    [x: string]: any,
}

