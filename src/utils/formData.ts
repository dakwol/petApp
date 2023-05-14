import {extensionFromUrl, filenameFromUrl} from "./text";
import {Platform} from "react-native";
// @ts-ignore
import * as mime from 'react-native-mime-types';

export const getFormData = (object: any, type: "form" | "object" = "form") => {
  switch(type) {
    case "form": {
      const formData = new FormData();
      Object.keys(object).forEach(key => {
        if (typeof object[key] !== 'object') formData.append(key, object[key]);
        else formData.append(key, JSON.stringify(object[key]));
      });
      return formData;
    }
    case "object": {
      let formData = {...object};
      Object.keys(object).forEach(key => {
        if (typeof object[key] === 'object') { formData[key] = JSON.stringify(object[key]); }
      });
      return formData;
    }
  }

};

export const getMediaForm = (mediaForm:any, medias:any[]) => {
  console.log('MEDIA TO UPLOAD', medias);
  medias.map( async (item, index) => {
    mediaForm.append(`media_files[${index}]`,{
      name: filenameFromUrl(item.uri),//image.name,
      //type: [item.type, extensionFromUrl(item.uri)].join('/'),
      //type: item.type,
      type: mime.lookup(item.uri),
      uri: Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri,
      //uri: item.uri.replace('file://', '')
      //uri:  "file:///" + imageUri.split("file:/").join("");
    });
  });
  console.log('MEDIA FORM TO UPLOAD', mediaForm);
  return mediaForm;
}


export const prepareForSelect = (data: any[] = [], valueField: string = "id", labelField: string = "label") => {
  let selectData: {value:any, label: any}[] = [];
  data.map(item => {
    if(item?.[valueField] && item?.[labelField]) {
      selectData.push({value: item?.[valueField], label: item?.[labelField]})
    }
  });
  return selectData;
}
