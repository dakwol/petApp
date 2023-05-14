
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import MapComponent from '../../components/MapComponent/MapComponent';
import ButtonSaveEvent from '../../components/Project/ButtonSaveEvent/ButtonSaveEvent';
import CategoriesList from '../../components/Project/CategoriesList/CategoriesList';
import EventsList from '../../components/Project/EventsList/EventsList';
import BackButton from '../../components/UI/BackButton/BackButton';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import {setEvents, setGeoLocation, setMapLocation} from '../../redux/GlobalRedux/actions/actionCreator';
import {CategoryItem, IEvent} from '../../types';
import {translate} from '../../utils/translate';
import styles from './styles';
import ViewScreen from "../../components/Project/ViewScreen/ViewScreen";
import GetLocation from "react-native-get-location";
import {IMapCenterPoint} from "../../components/MapComponent/types";
import {getSubCategories} from "../../api/categories/getSubCategories/getSubCutegories";
import SubCategoriesList from "../../components/Project/SubCategoriesList/SubCategoriesList";
import {closeIcon} from "../../constants/images";
import {FORM_TYPE_EMERGENCY} from "../../components/Project/EventForm/data";

import {
    geocodeLocation,
    getGeoBox,
    getGeoLocation,
    getLocation,
    getLocationFromLocations,
    locationGetFixed,
    locationMap, requestLocationPermissions
} from "../../utils/geo";
import {getEvents} from "../../api/events/getEvents/getEvents";
import {useDebouncedCallback} from "use-debounce";
import {useIsFocused} from "@react-navigation/native";
import {Region} from "react-native-maps";
import {SCREEN_WIDTH} from "../../constants/globalStyles";

const {width, height} = Dimensions.get('window');

const Map = (props: any) => {
    const dispatch = useDispatch();
    const focused = useIsFocused()
    const events = useSelector((state: any) => state?.global?.events);
    const location = useSelector((state: any) => state?.global?.location);
    const mapLocation = useSelector((state: any) => state?.global?.mapLocation);
    const geoLocation = useSelector((state: any) => state?.global?.geoLocation);
    const categories = useSelector((state: any) => state?.global?.categories);

    const [showEventList, setShowEventList] = useState(false);
    const [initialMapLocation, setInitialMapLocation] = useState<IMapCenterPoint | undefined>();
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [isMapRefreshingControl, setIsMapRefreshingControl] = useState(false); //Refresh control
    const [isMapRefreshing, setIsMapRefreshing] = useState(false);

    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [activeSubCategory, setActiveSubCategory] = useState<number>(0);
    const [showSubCategories, setShowSubCategories] = useState<boolean>(false);

    const [screenState, setScreenState] = useState({
        searchString: '',
    })

    const onRegionChange = (region:Region, details?:any) => {
        dispatch(setMapLocation(region));
    }

    const onMapRefresh = () => {
        setIsMapRefreshingControl(true);
        getEventsList().then(() => {
            setIsMapRefreshingControl(false);
        });
    }
/*
    const getInitialLocation = async (localLocation?:Region) => {

        let tmpLocation: any;
        if(localLocation == undefined) {
            locationMap(location).then(tmpLocation => {
                getGeoLocation(tmpLocation, (callbackLocation) => {
                    dispatch(setGeoLocation(callbackLocation));
                }).then();
                return;
            })
        }
    }

    const setLocation = async () => {
        await getInitialLocation();
        const tmpLocation = await getLocationFromLocations({
            prefLocation: "mapLocation",
            locations: {userLocation: location, mapLocation, geoLocation}
        });
        //setUserMapLocation(tmpLocation);
        //setGetLocationState(true);
    }
*/

    const onCategoryItemPress = (item: CategoryItem) => {
        getEventsList().then();
        setActiveSubCategory(0);
        if(item.id == activeCategory) {
            setActiveCategory(0);
        } else {
            setActiveCategory(item.id)
        }
    };

    const getEventsList = async () => {
        let payload: {[key: string]: any} = {
            type: 1,
        };
        const evt_ctgy_id = (activeCategory != 0) ? activeSubCategory != 0 ? activeSubCategory:activeCategory:0;
        if(evt_ctgy_id != 0) { payload.evt_ctgy_id = evt_ctgy_id; }
        if(searchString != '') { payload.keyword = searchString; }
        const tmpLocation = await getLocationFromLocations({
            prefLocation: "mapLocation",
            locations: {userLocation: location, mapLocation, geoLocation}
        });

        const geoBox = getGeoBox(tmpLocation);
        payload = {
            ...payload,
            lt_long: geoBox.lt.lng,
            lt_lat: geoBox.lt.lat,
            rb_long: geoBox.rb.lng,
            rb_lat: geoBox.rb.lat,
            limit: 1000,
        }
        const data = await getEvents(payload);
        return data;
    };

    const setInitialMap = (geoLocationLocal: any = geoLocation) => {
        getLocationFromLocations({
            prefLocation: "mapLocation",
            locations: {userLocation: location, mapLocation, geoLocation: geoLocationLocal}
        }).then((tmpLocation) => {
            setInitialMapLocation(tmpLocation);
            getEventsList().then();
        });
    }

    useEffect(() => {
        if(initialMapLocation) {
            getEventsList().then();
        }
        else {
            if(geoLocation) {
                setInitialMap();
            }
            else {
                requestLocationPermissions().then(permResponse => {
                    if (permResponse) {
                        getGeoLocation(mapLocation, (callbackLocation) => {
                            setInitialMap(callbackLocation);
                            dispatch(setGeoLocation(callbackLocation));
                        }).then();
                    }
                    else {
                        setInitialMap();
                    }
                })
            }

        }
    }, [focused]);

    useEffect(() => {
        if(activeCategory != 0 ) {
            setShowSubCategories(true);
        } else {
            setShowSubCategories(false);
        }
    }, [activeCategory])


    // when event is pressed
    const onEventPress = (id: number) => {
        navigation.navigate('CommonNavigator', {screen: 'EventScreen', params: {eventId: id}});
    };

    const {navigation} = props;

    useEffect(() =>{
        setIsMapRefreshing(true);
        getEventsList().then( resp => {
            dispatch(setEvents(resp))
            setIsMapRefreshing(false);
        })
    }, [mapLocation])

    useEffect( () => {
        setIsMapRefreshing(true);
        getEventsList().then( resp => {
            dispatch(setEvents(resp))
            setIsMapRefreshing(false);
        })
    }, [activeCategory, activeSubCategory])


    const [searchString, setSearchString] = useState<string>('');
    const onSearch = async (text:string) => {
        setSearchString(text);
        if(text.length >= 3 || text == '') {
            debounced(text);
        }
    }
    const debounced = useDebouncedCallback(
        (value) => {
            setIsMapRefreshing(true);
            getEventsList().then( resp => {
                dispatch(setEvents(resp))
                setIsMapRefreshing(false);
            })
        },
        10,
        // The maximum time func is allowed to be delayed before it's invoked:
        { maxWait: 15 }
    );
    useEffect(
        () => () => {
            debounced.flush();
        },
        [debounced]
    );

    return (
        <ViewScreen>
            <View style={styles.header}>
                <View style={styles.searchInput}>
                    <SearchInput
                        placeholderText={translate('placeHolderSearchHome')}
                        onSearchPress={ onSearch }
                    />
                </View>
                {/* back button container */}
                {showEventList && (
                    <BackButton
                        text={translate('back')}
                        action={() => {
                            setShowEventList(false);
                        }}
                    />
                )}
                {!showEventList && (
                    <View style={styles.categoriesList}>
                        <CategoriesList
                            onItemPress={onCategoryItemPress}
                            categories={categories}
                            activeCategory={activeCategory}
                        />
                    </View>
                )}
                {showSubCategories && (
                    <SubCategoriesList
                        category_id={activeCategory}
                        subcategory_id={activeSubCategory}
                        setActiveSubCategory={setActiveSubCategory}
                        setShowSubCategories={setShowSubCategories}
                    />
                )}
            </View>
            {initialMapLocation//getLocationState && userMapLocation?.latitude && userMapLocation?.longitude
                ?
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isMapRefreshingControl}
                            onRefresh={onMapRefresh}
                        />
                    }
                    contentContainerStyle={StyleSheet.absoluteFillObject}
                >
                    {isMapRefreshing &&
                        <View style={{position: "absolute", zIndex: 9999, top: 30, left: SCREEN_WIDTH / 2 - 24}}>
                            <ActivityIndicator size={48}/>
                        </View>
                    }
                    <MapComponent
                        forceCenter={true}
                        onPressEvent={onEventPress}
                        eventMarkers={events}
                        MapCenterPoint={initialMapLocation}
                        onRegionChangeComplete={onRegionChange}
                    />
                </ScrollView>
                :
                <View style={{flex: 1, justifyContent: "center"}}>
                    <ActivityIndicator size={48}/>
                </View>
            }
            {!showEventList && (
                <View style={styles.bottomButtonContainer}>
                    <ButtonSaveEvent
                        buttonText={translate('event.showList')}
                        onPress={() => {
                            setShowEventList(true);
                        }}
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                    />

                    <ButtonSaveEvent
                        buttonText={translate('event.addEventMap')}
                        onPress={() => {
                            navigation.navigate('CommonNavigator', {screen:'EventFormScreen', params:{
                                'formTypeProp': FORM_TYPE_EMERGENCY,
                                'location': mapLocation,
                            }})
                        }}
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                    />

                </View>
            )}
            {showEventList && (
                <View style={styles.bottomContainer}>
                    {events.length > 0 && (
                        <EventsList
                            data={events}
                            horizontal={true}
                            onEventPress={onEventPress}
                        />
                    )}
                </View>
            )}
        </ViewScreen>
    );
};

export default Map;
