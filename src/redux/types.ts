import {Region} from "react-native-maps";

export interface IGlobalState {
    categories: any[],
    pets: any[],
    events: any[],
    location: any, //Location
    mapLocation: Region | undefined, //Last map location
    geoLocation: any, //Location from geoposition
    deviceToken: string,
}
