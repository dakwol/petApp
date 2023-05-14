export interface IAPI_CHATS_MODEL {
    entity: string,
    url: string,
    methods: {
        [x:string] : {
            url:string
        }
    }
    [x: string]: any,
}
