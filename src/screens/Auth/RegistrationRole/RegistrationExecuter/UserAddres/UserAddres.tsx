import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapComponent from "../../../../../components/MapComponent/MapComponent";
import { IMapCenterPoint } from "../../../../../components/MapComponent/types";
import Button from "../../../../../components/UI/Button/Button";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { headerImage, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { translate } from "../../../../../utils/translate";
import { geocodeLocation, geocodeReverse, getGeoLocation, getLocationFromLocations, locationMap } from "../../../../../utils/geo";
import { useDispatch, useSelector } from "react-redux";
import { requestLocationPermissions } from "../../../../../utils/permissions";
import { setGeoLocation } from "../../../../../redux/GlobalRedux/actions/actionCreator";
import { errorMessage } from "../../../../../utils/showMessage";
import Geocoder from "react-native-geocoding";
import Input from "../../../../../components/UI/Input/Input";
import { FontAwesome } from '@expo/vector-icons';


const UserAddres:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const mapRef = React.useRef<any>(null);
    const dispatch = useDispatch();
    const location = useSelector((state: any) => state?.global?.location);
    const mapLocation = useSelector((state: any) => state?.global?.mapLocation);
    const geoLocation = useSelector((state: any) => state?.global?.geoLocation);
    const [initialMapLocation, setInitialMapLocation] = useState<IMapCenterPoint | undefined>();

  

    const [address, setAddress] = useState<any>()

   

    const coordinatsSend = (value:any) => {
        Geocoder.from(value).then(json => {
            
			var location = json.results[0].geometry.location;
            var coordinats = {
                latitude: location.lat,
                longitude: location.lng
            }
            setInitialMap(coordinats)
		})
		.catch(error => console.warn(error));
    }

    const setInitialMap = (region:any) => {
        getLocationFromLocations({
            prefLocation: "mapLocation",
            locations: {userLocation: region, mapLocation, geoLocation: geoLocation}
        }).then((tmpLocation) => {
            setInitialMapLocation(tmpLocation);
            if(tmpLocation) {
                geocodeLocation(tmpLocation).then((resp) => {
                    setArrInfo({...arrInfo, ur_address: resp.join(', ')})
                    mapRef.current.animateToRegion(tmpLocation);
                    setAddress(resp.join(', '))
                  })
                  .catch(err => {
                    console.log("FORM TEST: error geocodeReverse ", err);
                  });
            }
        });
      
    }

    console.log(arrInfo.ur_address)


    const [err, setErr] = useState<boolean>(false)


    const switchScreen = () => {
        if(arrInfo.ur_address != undefined || ''){
            setErr(false)
            navigation.navigate('UserWorkInfo', {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: 'Адрес не выбран',
            });
        }
       
    }


    return (
        <SafeAreaView style={[globalStyles.vwFlexOne, {justifyContent: "space-between", marginTop: 60}]}>
                 <Image source={petHelp}/>
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginVertical: 20}}>{translate('registration.ex_addres')}</Text>
                    <View style={{height: 300, width: SCREEN_WIDTH}}>
                    <MapComponent
                        mapRef={mapRef}
                        showCenter
                        forceCenter={true}
                        onPressEvent={() => {
                        }}
                        eventMarkers={[]}
                        
                        MapCenterPoint={initialMapLocation}
                        onRegionChangeComplete={(region: any) => coordinatsSend(region)}
                    />
                    <View style={{alignSelf: "center", justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
                        <Input valueText={address} onChange={(value:string)=>{setAddress(value)}} placeHolderText={""}/>
                        <TouchableOpacity onPress={()=>{coordinatsSend(address)}}>
                            <FontAwesome name="location-arrow" size={24} color={colors.greenPH} />
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
                <View style={{height: 150}}>
                    <Button 
                        text={translate('common.continue')} 
                        action={()=>{switchScreen()}} 
                    />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}



export default UserAddres;