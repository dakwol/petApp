import GeocoderGoogle from "react-native-geocoding";
//import {Geocoder as GeocoderYandex, Point} from 'react-native-yamap';
import GetLocation from "react-native-get-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Dimensions } from "react-native";
import { dataLocations } from "../constants/dataLocations";
import { mapCenterDefault } from "../screens/Event/EventFormScreen/data";
import Geolocation from "@react-native-community/geolocation";
import { Region } from "react-native-maps";
import RNLocation, { RequestPermissionOptions } from 'react-native-location';
//import * as Location from "expo-location";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const geocoder_google_api = "AIzaSyD0P5SiyDBo9Y8BcXIcTm-j6_pO8S7E3-A";
GeocoderGoogle.init(geocoder_google_api, { language: 'ru' });

export const getLocationFromLocations = async ({
    prefLocation = "userLocation",
    locations,
}: {
    prefLocation: "userLocation" | "geoLocation" | "mapLocation" | undefined,
    locations: {
        userLocation?: any,
        geoLocation?: any,
        mapLocation?: any
    }
}
) => {
    let tmpLocation = locations?.userLocation ?? mapCenterDefault;
    tmpLocation = await locationMap(tmpLocation);
    if (prefLocation && locations?.[prefLocation]) {
        return { ...tmpLocation, ...locations[prefLocation] }
    }
    if (locations?.userLocation) {
        return { ...tmpLocation, ...locations.userLocation };
    }
    if (locations?.geoLocation) {
        return { ...tmpLocation, ...locations.geoLocation };
    }

    return tmpLocation;
}

export const getGeoBox = (region: Region) => ({
    lt: { lat: region.latitude + region.latitudeDelta, lng: region.longitude - region.longitudeDelta },
    rt: { lat: region.latitude + region.latitudeDelta, lng: region.longitude + region.longitudeDelta },

    rb: { lat: region.latitude - region.latitudeDelta, lng: region.longitude + region.longitudeDelta },
    lb: { lat: region.latitude - region.latitudeDelta, lng: region.longitude - region.longitudeDelta },
    //region.longitude - region.longitudeDelta, // westLng - min lng
    //region.latitude - region.latitudeDelta, // southLat - min lat
    //region.longitude + region.longitudeDelta, // eastLng - max lng
    //region.latitude + region.latitudeDelta // northLat - max lat
})

/*
export const getGeoLocationExpo = async (location?:any) => {
    const permResponse = await requestLocationPermissions();
    let outputLocation = await locationMap(location);
    if(permResponse) {
        const tmpGeoLoc = await Location.getCurrentPositionAsync({});
        outputLocation = {...outputLocation, latitude: tmpGeoLoc.coords.latitude, longitude: tmpGeoLoc.coords.longitude};
    }
    return outputLocation;
}
*/
export const getGeoLocation = async (location: any, callback: (location: any) => void) => {
    const permResponse = await requestLocationPermissions();
    let tmpLocation = await locationMap(location);
    if (permResponse) {
        //await Location.getCurrentPositionAsync({});

        Geolocation.getCurrentPosition(
            (geoResponse) => {
                tmpLocation = {
                    ...tmpLocation,
                    latitude: geoResponse.coords.latitude,
                    longitude: geoResponse.coords.longitude,
                };
                callback(tmpLocation);
            },
            (error) => { console.log(error.code, error.message); },
            { timeout: 15000 }
        );


    } else {
        tmpLocation = await locationMap(location);
        callback(tmpLocation);
    }
    return permResponse;
}

export const requestLocationPermissions = async () => {
    try {
        const options: RequestPermissionOptions = {
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'fine' // or 'fine'
            }
        }
        const granted = await RNLocation.checkPermission(options);
        if (granted) {
            return true;
        } else {
            return await RNLocation.requestPermission(options);
        }

    } catch (err) {
        return false;
    }
};

export const locationMap = async (location?: any) => {
    let localLocation = await locationGetFixed();
    if (location?.latitude && location?.longitude) {
        localLocation = { ...localLocation, latitude: location.latitude, longitude: location.longitude }
    }
    return {
        latitude: parseFloat(localLocation.latitude),
        longitude: parseFloat(localLocation.longitude),
        latitudeDelta: 0.28,
        longitudeDelta: ASPECT_RATIO
    }
}
export const locationGetFixed = async () => {
    const locationFromStorage = await AsyncStorage.getItem('locationId');
    const locationId = (locationFromStorage && typeof locationFromStorage == "number") ? locationFromStorage : 0;
    const location = dataLocations[locationId];
    return {
        latitude: location[1].split(',')[0],
        longitude: location[1].split(',')[1],
        isPosition: true,
        timestamp: Date.now(),
        locationId: locationId,
    }
}

export const getLocation = async () => {
    return await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
};

export const geocodeReverse = async (address: string, type: string = "google") => {
    console.log('FORM TEST: geocode Reverse', address);

    let resp = { success: false, data: { latitude: mapCenterDefault.latitude, longitude: mapCenterDefault.longitude } };
    if (type == "google") {
        const googleResp = await GeocoderGoogle.from(address);
        resp.success = true;
        resp.data.latitude = googleResp?.results?.[0]?.geometry?.location?.lat;
        resp.data.longitude = googleResp?.results?.[0]?.geometry?.location?.lng;
    } else {
        //const yaResp = await GeocoderYandex.reverseGeocode(address);
    }

    return resp;
}

export const geocodeLocation = async (location: any, type: "google" | "yandex" = "google") => {
    console.log('geocode TO');
    let addr: string[] = [
        '',
        '',
        '',
        ''
    ];

    let searches = [
        { name: 'city', type: 'locality', indx: 0, field: 'long_name', isFound: false },
        { name: 'street', type: 'route', indx: 1, field: 'long_name', isFound: false },
        { name: 'home', type: 'street_number', indx: 2, field: 'long_name', isFound: false },
        { name: 'region', type: 'administrative_area_level_1', indx: 3, field: 'long_name', isFound: false }
    ];

    try {
        if (type == "google") {
            const resp = await GeocoderGoogle.from({ lat: location.latitude, lng: location.longitude });
            //const addressComponents = resp.results[0].address_components;
            //console.log('GEOCODE RESP', resp);
            resp.results[0].address_components.map(addressComponent => {
                console.log('GEO', addressComponent.types[0])
                searches = searches.map((searchItem) => {

                    if (!searchItem.isFound && addressComponent.types[0] == searchItem.type) {
                        console.log('ADD', searchItem)
                        //@ts-ignore
                        addr[searchItem.indx] = addressComponent[searchItem.field];
                        searchItem.isFound = true;
                    }
                    return searchItem;
                });


            });
        } else {
            //const coordinates:Point = {lat:location.latitude, lon:location.longitude};
            //const resp = await GeocoderYandex.geoToAddress(coordinates);
            //const addressComponents = resp?.Components ?? {};
            //console.log('ADDRESS', addressComponents);
        }
        return addr;
    }
    catch (error) {
        console.log('geocodeLocation', error)
        return addr;
    }
    /*
    const output = Geocoder.from({lat: location.latitude, lng: location.longitude})
        .then( (json) => {
          console.log('Address2', json);
          let addr = [
            '',
            '',
            ''
          ];
          let searches = [
            {name:'city',type:'administrative_area_level_2',indx: 0,field: 'long_name', isFound: false},
            {name:'street',type:'route',indx: 1,field: 'long_name', isFound: false},
            {name:'home',type:'street_number',indx: 2, field: 'long_name', isFound: false}
          ];

          json.results[0].address_components.map(addressComponent => {
            searches = searches.map( (searchItem, indx) => {
              if(!searchItem.isFound && addressComponent.types && addressComponent.types.includes(searchItem.type)) {
                //@ts-ignore
                addr[searchItem.indx] = addressComponent[searchItem.field];
                searchItem.isFound = true;
              }
              return searchItem;
            });
          });
          return addr;

        })
        .catch( (error) => console.warn(error));
    return output;

     */
}
