import { API_BASE_URL, apiCall } from "../../api";
import { API_EVENTS_MODEL } from "../const";

export const getEventLikes = async (event_id: any) => {
  const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.getEventLikes.url].join('/');
  const resp = await apiCall('post', API_BASE_URL + methodUrl, { event_id });
  if (resp.status == 200) {
    return { "success": true, data: resp.data.data };
  } else {
    return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
  }

}

