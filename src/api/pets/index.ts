import {apiCall, API_BASE_URL, API_USER_PET_LIST_URL} from '../api';

export const getUserPets = async (data: any, token?: string) => {
  try {
    const resp = await apiCall(
      'post',
      API_BASE_URL + API_USER_PET_LIST_URL,
      data,
      token,
    );

    if (resp.data.status === 'success') {
      return resp?.data?.pets??[];
    } else {
      return [];
    }
  } catch {
    return [];
  }
};
