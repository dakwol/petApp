import { IAPI_USERS_MODEL } from "./types";

export const API_USERS_MODEL = {
    entity: 'user',
    url: 'user',
    methods: {
        getUserById: {
            url: 'get-user'
        },
        getUsers: {
            url: 'get-users'
        },
        addFirebaseToken: {
            url: 'add-firebase-token'
        },
        addGeo: {
            url: 'add-geo'
        },
        updateNotifSettings: {
            url: 'update-notif-settings'
        },
        updatePassword: {
            url: 'update-password'
        },
        resetPasswordByEmail: {
            url: "reset-request-by-email"
        },
        updateNotifMsgs: {
            url: 'update-notif-msgs'
        },
        updateNotifComments: {
            url: 'update-notif-comments'
        },
        updateNotifFavevents: {
            url: 'update-notif-favevents'
        },
        updateNotifStories: {
            url: 'update-notif-stories'
        },
        updateNotifFollow: {
            url: 'update-notif-follow'
        },
        updateNotifLikes: {
            url: 'update-notif-likes'
        },
        addMediaMultiply: {
            url: 'add-media-multiply'
        },
        userMedia: {
            url: 'media'
        },
        userUpdateAvatar: {
            url: 'update-avatar'
        },
        userCheckFreeEmail: {
            url: 'check-free-email'
        },
        userCheckFreePhone: {
            url: 'check-free-phone'
        },
        userSupportCreateTicket: {
            url: 'support-create-ticket'
        },
        userSupportTicketAddMessage: {
            url: 'support-ticket-add-message'
        },
        userCheckFreeNickname: {
            url: 'check-free-nickname'
        },
        migrateNickname: {
            url: 'migrate_nickname'
        },
        subscribeFeed: {
            url: 'subscribe/feed'
        },
        unSubscribeFeed: {
            url: 'unsubscribe/feed'
        },
        subscribeBlog: {
            url: 'subscribe/blog'
        },
        unSubscribeBlog: {
            url: 'unsubscribe/blog'
        },
        addStories: {
            url: 'stories/add'
        },
        getUserStories: {
            url: 'stories/get-user-stories'
        },
        getMyStories: {
            url: 'stories/get-my-stories'
        },
        getStories: {
            url: 'stories/get-stories'
        },
        deleteStories: {
            url: 'stories/delete'
        },
        moderateStories: {
            url: 'stories/moderate'
        },
        userNotification: {
            url: 'notifications'
        },
        userNotificationsMarkAll: {
            url: 'notifications/mark-all-as-read'
        },
        userFollowers: {
            url: 'followers'
        },
        userSubscribes: {
            url: 'subscribers'
        },
        userBlock: {
            url: 'block'
        },
        addMedia: {
            url: 'add-media'
        },
        userRequestCall: {
            url: 'request-call'
        },
        getUserDataLive: {
            url: 'get-user-data'
        },
        userRequestCode: {
            url: 'request-code'
        }

    }

} as const;
