import { IAPI_EVENTS_MODEL } from "./types";
import { createEvent } from "./createEvent/createEvent";

export const API_EVENTS_MODEL = {
    entity: 'event',
    url: 'event',
    methods: {
        getEvents: {
            url: 'get-events'
        },
        getEventsFav: {
            url: 'get-user-fav-events'
        },
        getEventsByUser: {
            url: 'get-events-by-user'
        },
        getEventComments: {
            url: 'get-comments'
        },
        addCommentToEvent: {
            url: 'add-comment-to-event'
        },
        addEventImage: {
            url: 'add-event-image'
        },
        addEventMediaMultiply: {
            url: 'add-media-multiply'
        },
        createEvent: {
            url: 'events'
        },
        getEventsByUniSearch: {
            url: 'get-events-by-uni-search'
        },
        eventMediaDelete: {
            method: "delete",
            url: "media",
        },
        updateEvent: {
            method: "put",
            url: "events"
        },
        eventClaimTopics: {
            url: 'claim/topics'
        },
        eventClaimClaims: {
            url: 'claim/claims'
        },
        eventClaimCreate: {
            url: 'claim/create'
        },
        eventClaimUpdate: {
            url: 'claim/update'
        },
        eventLike: {
            url: 'like'
        },
        eventUnLike: {
            url: 'unlike'
        },
        archiveEvent: {
            url: 'archive'
        },
        unArchiveEvent: {
            url: 'unarchive'
        },
        eventModerate: {
            url: 'moderate'
        },
        eventModerateMedia: {
            url: 'moderate_media'
        },
        getEventLikes: {
            url: 'get-event-likes'
        }
    }

} as const;
