import {Dimensions, ImageSourcePropType} from "react-native";
import {defaultImage300, defaultImageUri, defaultSvgUri} from "../constants/images";
import {IMedia} from "../types";
export const getAspectRatio = () => {
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    return ASPECT_RATIO;
}

export const getMediaFirst = (medias:any[] = []) => {
    if(medias != undefined && medias[0] != undefined) {
        return medias[0];
    } else {
        return {};
    }

}

export const getMediaPreviewSrc = (media:IMedia | null | undefined) => {
    let output = defaultImage300;
    if(media?.preview != undefined && isValidURL(media.preview)) {
        return {uri:media.preview};
    }
    return output;
}

export const getMediaFullSrc = (media:any) => {
    let output = defaultImage300;
    if(media != undefined && media.full != undefined && isValidURL(media.full)) {
        return {uri:media.full};
    }
    return output;
}

export const getMediaPreview = (media:any) => {
    let output = defaultImageUri;
    if(media != undefined && media.preview != undefined) {
        return media.preview;
    }
    return output;
}

export const getMediaFull = (media:any) => {
    let output = defaultImageUri;
    if(media != undefined && media.full != undefined) {
        return media.full;
    }
    return output;
}

export const getSvgUrl = (url:any) => {

    if(url != undefined && isValidURL(url)) {
        return url;
        return defaultSvgUri;
    } else {
        return defaultSvgUri;
    }


    //export const defaultSvgUri = "https://petapi.ratsysdev.com/petapi/storage/icons/pets.svg";
}

export const getSvgXml = async (url:any) => {
    let fetchUrl = defaultSvgUri;
    if(url != undefined && isValidURL(url)) {
        fetchUrl = url;
    }
    const xml = await (await fetch(fetchUrl)).text();
    return xml;

    //const url = await getURL();

};

export const getAvatar = (url:string) => {
    let output = defaultImageUri;
    if(url != undefined && isValidURL(url)) {
        return url;
    }
    return output;
    //return 'https://via.placeholder.com/30';
}

export const getImageUri = (url:string) => {

    if(url != undefined && isValidURL(url)) {
        return url;
    }
    return defaultImageUri;
}


export const getImageByUrl = (url:string) => {
    if(url != undefined && isValidURL(url)) {
        return {url:url};
    }
    return defaultImage300;
}

export const getStarsFromRate = (rate: number | string | null) => {
    let stars = [];
    //@ts-ignore
    const realRate = (rate != null) ? Math.round(parseFloat(rate)) : 0;
    for (let i = 1; i < 6; i++) {
        stars.push((realRate >= i) ? 1 : 0);
    }
    return stars
}

function isValidURL(string:string) {
    if(typeof(string) == 'string') {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    } else {
        return false;
    }
};

