import React, {FC, useEffect, useRef, useState} from 'react';
import {Modal, TouchableOpacity, View} from "react-native";
import {IModalProps} from "../../../types";
import {styles} from "./styles";
// @ts-ignore
import MapComponent from '../../MapComponent/MapComponent';
import {IMapCenterPoint} from '../../MapComponent/types';
import {useDispatch, useSelector} from 'react-redux';
import {getGeoLocation, getLocationFromLocations, locationMap} from '../../../utils/geo';
import {Ionicons} from '@expo/vector-icons';
import {colors} from "../../../constants/Colors";
import { Modalize } from 'react-native-modalize';
import {Region} from "react-native-maps";
import {setGeoLocation} from "../../../redux/GlobalRedux/actions/actionCreator";

interface IEventMapModalProps extends IModalProps {
    event?:any
    open?:boolean;
}

const EventMapModal:FC<IEventMapModalProps> = ({isVisible, toggleModal, event, open}) => {

    const mapRef = useRef<any>(null);
    const [userMapLocation, setUserMapLocation] = useState<IMapCenterPoint | undefined>(undefined);
    const location = useSelector((state: any) => state?.global?.location);
    const mapLocation = useSelector((state: any) => state?.global?.mapLocation);
    const geoLocation = useSelector((state: any) => state?.global?.geoLocation);

    const [getLocationState, setGetLocationState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!getLocationState) {
            setLocation().then();
        }
    }, [getLocationState])
    const getInitialLocation = async (localLocation?:Region) => {
        let tmpLocation: any;
        if (localLocation == undefined) {
            localLocation = await locationMap();
            await getGeoLocation(localLocation, (callbackLocation) => {
                dispatch(setGeoLocation(callbackLocation));
                getInitialLocation(callbackLocation).then();
            });
            return;
        }
        tmpLocation = await getLocationFromLocations({
            prefLocation: "geoLocation",
            locations: {userLocation: location, mapLocation, geoLocation}
        });
        return tmpLocation;
    }
    const setLocation = async () => {
        //const tmpLocation = await locationMap(location);
        const tmpLocation = await getInitialLocation();
        setUserMapLocation(tmpLocation);
        setGetLocationState(true);
    }

    const modalizeRef = useRef<Modalize>(null);
    useEffect(() =>{
        {isVisible?
            modalizeRef.current?.open() : modalizeRef.current?.close()
        }
    },[isVisible]);


    return (
            <Modalize
                ref={modalizeRef}
                modalHeight={500}
                onClosed={() => {toggleModal(false)}}
            >
                <View style={{paddingTop:25, alignItems:"center", justifyContent: "center", width:"100%", height:500}}>
                    <MapComponent
                        mapRef={mapRef}
                        forceCenter={false}
                        eventMarkers={[event]}
                        MapCenterPoint={userMapLocation}
                        fitToCenter
                        fitToMarkers
                    />
                    <View style={{borderTopLeftRadius: 10,borderTopRightRadius: 10, backgroundColor: colors.greenPH,position:"absolute", top:0, left:0, width:"100%",alignItems:"flex-end", paddingHorizontal:5}}>
                        <TouchableOpacity onPress={ () => { toggleModal(false)} }>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
    );
};

export default EventMapModal;
