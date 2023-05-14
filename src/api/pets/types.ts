export interface IAPI_PETS_MODEL {
    entity: string,
    url: string,
    methods: {
        [x:string] : {
            url:string
        }
    }
    [x: string]: any,
}
