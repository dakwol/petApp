export interface IAPI_USERS_MODEL {
    entity: string,
    url: string,
    methods: {
        [x: string]: {
            url: string
        }
    }
    [x: string]: any,
}


export interface IResetPasswordByEmailProps {
    "email": string,
}

export type INotifMnemo = "settings" | "msgs" | "comments" | "favevents" | "stories" | "follow" | "likes";
export type IServicesMnemo = "remote" | "hosting" | "going";
