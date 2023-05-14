import {API_BASE_URL, API_CATEGORIES_URL, apiCall} from '../api';

export const getCategories = async () => {
  const resp = await apiCall('get', API_BASE_URL + API_CATEGORIES_URL);
  let newCategor = new Array(); //переменная для нового массива категорий
  if (resp.data.status === 'success') {
    newCategor = resp.data.categories.filter((item) => item.id != 999);//удаление последнего элемента
    return newCategor;
  } else {
    return [];
  }
};
