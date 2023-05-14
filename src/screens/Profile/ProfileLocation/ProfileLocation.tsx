import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";

import {IScreen} from "../../../types";
import {ScrollView, Text, View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {getTranslateMessage, translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import DropdownSelect from "../../../components/UI/DropdownSelect/DropdownSelect";

import {Dictionary} from "../../../locales/dictionary";
import {globalStyles} from "../../../constants/globalStyles";
import {setUserLocation} from "../../../redux/GlobalRedux/actions/actionCreator";
import {addGeo} from "../../../api/user/addGeo/addGeo";
import {useDispatch, useSelector} from "react-redux";
import {responseWithMessage} from "../../../utils/response";
import {dataLocations} from "../../../constants/dataLocations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileLocation:FC<PropsWithChildren<IScreen>> = ({navigation, route, ...props}) => {
    const dispatch = useDispatch();
    const location = useSelector((state: any) => state?.global?.location);
    const [selectedLoc, setSelectedLoc] = useState<number | undefined>( (location?.locationId) ? location.locationId:0);

    const locations = dataLocations.map( ( item, index) => {
        return {
            id: index,
            value: index,
            label: item[0],
            latitude: item[1].split(',')[0],
            longitude: item[1].split(',')[1],
        }
    })

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
          } else {
            saveLocation().then();
          }
    }, [selectedLoc]);

    const saveLocation = async () => {

        if(selectedLoc != undefined) {

            const currLoc = {
                latitude: locations[selectedLoc].latitude,
                longitude: locations[selectedLoc].longitude,
                isPosition:true,
                timestamp: Date.now(),
                locationId: selectedLoc,
            }

            addGeo(currLoc.latitude,currLoc.longitude).then((resp) => {
                responseWithMessage({
                    resp,
                    messageSuccess: getTranslateMessage(Dictionary.profile.newLocation,'profile.newLocation'),
                    messageError: getTranslateMessage(Dictionary.errors.section, "setGeoError")
                });
                if(resp?.success) {
                    dispatch(setUserLocation(currLoc));
                    AsyncStorage.setItem('locationId', selectedLoc.toString());
                }
            });
        }

    }
    return (
        <ViewScreen keyboardVerticalOffset={0}>
            <View style={styles.background}>

                    <View style={{position: 'absolute', left: 0, zIndex: 1000}}>
                        <BackButton
                            text={translate('back')}
                            action={() => {
                                navigation.goBack()
                            }}
                        />
                    </View>
                    <ScrollView style={{flex:1,paddingHorizontal: 20, marginTop: 30}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={globalStyles.bodySectionTitle}>{translate(Dictionary.profile.chooseLocation)}</Text>
                        </View>
                        <View>
                            <DropdownSelect
                                data={locations}
                                //defaultValue={ (selectedLoc) ?  selectedLoc : 0 }
                                defaultValueByIndex={(selectedLoc) ?  selectedLoc : 0 }
                                //defaultValue={10}
                                onSelect={ (selectedItem) => { setSelectedLoc(selectedItem.value)} }
                                placeholder={translate(Dictionary.profile.chooseLocation)} />
                        </View>
                    </ScrollView>

            </View>
        </ViewScreen>
    );
};

export default ProfileLocation;
