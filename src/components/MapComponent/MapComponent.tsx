import React, {FC, useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import styles from './styles';
import MapView, {Camera, Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
//import MapView from 'react-native-map-clustering';
import {IMapComponentProps} from "./types";
import {SvgUri} from "react-native-svg";
import {getSvgUrl, getSvgXml} from "../../utils/common";
import {cat_icons, defaultSvgUri, map_markers, map_markers_emergency} from "../../constants/images";
import ButtonMapNavigate from '../Project/ButtonMapNavigate/ButtonMapNavigate';
import {getLocationFromLocations, locationMap} from "../../utils/geo";
import {useSelector} from "react-redux";

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40,
};
const ZOOM_PADDING_MODAL = {
    top: 40,
    right: 40,
    bottom: 120,
    left: 40,
}



const MapComponent:FC<IMapComponentProps> = ({
                                                 mapRef = React.useRef<any>(null),
                                                 forceCenter = false,
                                                 regionForSet,
                                                 MapCenterPoint = {
                                                     latitude: 55.75583,
                                                     longitude: 37.6177,
                                                     latitudeDelta: 0.015,
                                                     longitudeDelta: 0.0121,
                                                 },
                                                 onReady,
                                                 showCenter = false,
                                                 onRegionChangeComplete,
                                                 fitToCenter = false,
                                                 fitToMarkers = false,
                                                 ...props

                                             }) => {


    const {
        flex = 1,
        eventMarkers = [],
        clusterEnable = true,
        onPressEvent = () => {},
    } = props;
    const [region, setRegion] = React.useState({...MapCenterPoint});
    const [regionLocal, setRegionLocal] = useState<Region>({...MapCenterPoint});
    const [centerCoords, setCenterCoords] = useState({...MapCenterPoint});
    const [markers, setMarkers] = React.useState<any[]>([]);
    const location = useSelector((state: any) => state?.global?.location);
    const geoLocation = useSelector((state: any) => state?.global?.geoLocation);
    const createMarker = (lat: any, long: any) => ({
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    useEffect(() => {
        try {
            const Markers = eventMarkers.map((event: any) => ({
                ...event,
                ...createMarker(event.evt_lat, event.evt_long),
            }));
            setMarkers(Markers);
        } catch(error) {
            console.log(error)
        }
        return () => {};
    }, [eventMarkers]);


    const onMapReady = () => {
        if(fitToMarkers) {
            const markersForFit = (fitToCenter) ? [...markers, MapCenterPoint] : [...markers];
            setTimeout(() => {
                if (mapRef?.current?.fitToCoordinates) {
                    mapRef.current.fitToCoordinates(markersForFit, {
                        edgePadding: DEFAULT_PADDING,
                        animated: false,
                    });
                }
            }, 1);
        }
    }
    const onRegionChange = (regionMove:any, detailsMove:any) => {
        setCenterCoords({...centerCoords, latitude: regionMove.latitude, longitude: regionMove.longitude})
    }

    const onRegionChangeLocal = (regionMove: any, detailsMove:any) => {
        setRegionLocal(regionMove);
        if(onRegionChangeComplete) {
            onRegionChangeComplete(regionMove,detailsMove);
        }
    }

    const goToMyLocation = async () => {
        const tmpLocation = await getLocationFromLocations({
            prefLocation: "geoLocation",
            locations: {userLocation: location, geoLocation}
        });
        mapRef.current.animateToRegion(
            {
                latitude: parseFloat(tmpLocation.latitude),
                longitude: parseFloat(tmpLocation.longitude),
                latitudeDelta: regionLocal.latitudeDelta,
                longitudeDelta: regionLocal.longitudeDelta,
            },
        );
    }

    const onZoomInPress = () => {
        mapRef?.current?.getCamera().then((cam: Camera) => {
            if(cam?.zoom) {
                cam.zoom += 1;
                mapRef?.current?.animateCamera(cam);
            }
        });
    };

    const onZoomOutPress = () => {
        mapRef?.current?.getCamera().then((cam: Camera) => {
            if(cam?.zoom) {
                cam.zoom -= 1;
                mapRef?.current?.animateCamera(cam);
            }
        });
    };

    return (
        <View style={[styles.container, {flex}]}>
            <ButtonMapNavigate
                onPress={goToMyLocation}
                icon={'compass'}
                style={{top: 12}}
                size={20}
            />
            <ButtonMapNavigate
                onPress={onZoomInPress}
                icon={'plus'}
                style={{bottom: 110}}
                size={28}
            />
            <ButtonMapNavigate
                onPress={onZoomOutPress}
                icon={'minus'}
                style={{bottom: 65}}
                size={28}
            />
            {/* @ts-ignore */}
            <MapView
                ref={mapRef}
                showsUserLocation
                //radius={20}
                //clusteringEnabled={clusterEnable}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                //edgePadding={DEFAULT_PADDING}
                initialRegion={{
                    ...region,
                }}
                onRegionChange={(data, details) => { onRegionChange(data, details)} }
                onRegionChangeComplete = { onRegionChangeLocal }
                //zoomControlEnabled
                paddingAdjustmentBehavior={'automatic'}
                //onLayout={onMapReady}
                onMapReady={onMapReady}
                showsMyLocationButton={false}
                zoomControlEnabled={false}
            >

                {showCenter &&
                    /* @ts-ignore */
                    <Marker
                        key="center-marker"
                        coordinate={centerCoords}
                    />
                }
                {markers && markers.map((item: any, index: number) => {

                    let marker = createMarker(item.latitude, item.longitude);
                    //console.log(`ITEM MARKER ${item.id}`, item);
                    //const svgImage = await getSvgXml(eventTmp.categoryData.category_icon_link);
                    const svgUrl = getSvgUrl(item.category.main_category_icon_link);
                    //console.log(svgUrl);
                    //console.log(defaultSvgUri);
                    return (
                        /* @ts-ignore */
                        <Marker
                            onPress={() => {
                                onPressEvent(item.id);
                            }}
                            title={item?.evt_topic ?? 'Marker'}
                            key={index}
                            coordinate={marker}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                {item?.is_emergency
                                    ?
                                    <Image
                                        style={[styles.marker, {width:42, height:42} ]}
                                        source={map_markers_emergency[item?.evt_priority]}
                                    />
                                    :
                                    <Image
                                        style={[styles.marker, {width:42, height:42} ]}
                                        source={map_markers[item?.evt_ctgy_id]}
                                    />

                                }
                                {/*<SvgUri uri={svgUrl} style={[styles.marker, {width:42, height:42} ]} />*/}
                                {/*
                                <SvgUri uri={svgUrl} style={[styles.marker, {width:42, height:42} ]} />

                    <Image source={{uri:item.category.main_category_icon_link}} style={styles.marker} />
                    */}
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default MapComponent;
