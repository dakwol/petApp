import { API_BASE_URL, apiCall } from "../../api";
import { API_EVENTS_MODEL } from "../const";

export const archiveEvent = async (event_id: any) => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.archiveEvent.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, {event_id});

    console.log('event id:', event_id)
    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data?.message,  message: 'event.addToArchiveSuccess' };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}

