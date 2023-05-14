export interface IAPI_ENTITY_MODEL {
    entity: string,
    url: string,
    methods: {
        [x:string] : {
            url:string
        }
    }
    [x: string]: any,
}
