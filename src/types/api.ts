export interface IApiReturn<T> {
    success: boolean,
    data: T,
    message?:string,
    originResp?: any

}
