import React, {useEffect, useState} from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer, useNavigation,} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {IUser, RootStackParamList} from '../types';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import CommonNavigator from "./CommonNavigator/CommonNavigator";
import Geolocation from "@react-native-community/geolocation";
import {setDeviceToken, setGeoLocation, setUserLocation} from "../redux/GlobalRedux/actions/actionCreator";
import messaging from '@react-native-firebase/messaging';
import {addFirebaseToken} from "../api/user/addFirebaseToken/addFirebaseToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addGeo} from "../api/user/addGeo/addGeo";
import {locationGetFixed, requestLocationPermissions} from "../utils/geo";
import {SCREENS} from "./screenName";
import {navigateTo} from "../utils/navigate";
import {requestPushPermission} from "../utils/permissions";
import {getUserById} from "../api/user/getUserById/getUserById";
import {updateUserDataFull, updateUserDataLive} from "../redux/AuthRedux/actions/actionCreator";
import {getUserDataLive} from "../api/user/getUserDataLive/getUserDataLive";
import {IApiReturn} from "../types/api";
import Echo from "laravel-echo";
// @ts-ignore
import io from 'socket.io-client';

type ColorSchemeName = 'light' | 'dark' | null | undefined;

export default function AppNavigation({
                                          colorScheme = 'light',
                                      }: {
    colorScheme?: ColorSchemeName;
}) {

    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    const isLoggedIn = useSelector((state: any) => state?.session?.isLoggedIn);
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const userDataLive = useSelector((state:any) => state?.session?.userDataLive);

    const location = useSelector((state: any) => state?.global?.location)
    const geoLocation = useSelector((state: any) => state?.global?.geoLocation);
    const [currLoc, setCurrLoc] = useState<any>({
        isPosition:false,
        timestamp: 0
    });

    const [localState, setLocalState] = useState<{[x:string]: any}>({
        currentPosition: {isPosition:false, timestamp: 0},
        positionWatch: null,
        locationPermission: false,
    })

    // If you want to swipe back like iOS on Android
    const options = {
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
    };
    const optionsSlide = {
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
    };


    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect( () => {
        requestLocationPermissions().then( async (resp) => {
            await Geolocation.stopObserving();
            setLocalState({...localState, locationPermission: resp})
            if(!resp) {
                locationGetFixed().then( location => {
                    setCurrLoc(location);
                    dispatch(setGeoLocation(location))
                });
            } else {
                dispatch(setGeoLocation(undefined))
            }
        } );
        const fbaseSetBackgroundMessageHandler = messaging().setBackgroundMessageHandler(() => Promise.resolve());
        const firebaseMessageOpened = messaging().onNotificationOpenedApp(remoteMessage => {

            //@ts-ignore
            //navigation.navigate('CommonNavigator', { screen: 'EventScreen', params: {eventId: remoteMessage?.data?.object_id } } );
            firebaseNavigate(remoteMessage, 'onNotificationOpenedApp')
        });

        // Check whether an initial notification is available
        const firebaseMessageInitial = messaging().getInitialNotification().then(remoteMessage => {
            //const navigation = useNavigation();
            //@ts-ignore
            //navigation.navigate('CommonNavigator', { screen: 'EventScreen', params: {eventId: remoteMessage?.data?.object_id } } );
            firebaseNavigate(remoteMessage, 'getInitialNotification')
        });

        const firebaseOnMessages = messaging().onMessage(remoteMessage => {
            //console.log('FCM. onMessage',remoteMessage);
            //firebaseNavigate(remoteMessage, 'onMessage');
        });
    }, []);

    useEffect(() => {
        if(
            (geoLocation == undefined || location == undefined)
            || (isLoggedIn && currLoc.isPosition == true && currLoc.timestamp - location.timestamp > 3600000)) {
            dispatch(setUserLocation(currLoc));
            dispatch(setGeoLocation(currLoc));
            addGeo(currLoc.latitude,currLoc.longitude).then();
        }
    }, [currLoc]);

    useEffect(() => {
        if(localState.locationPermission) {

            Geolocation.watchPosition(
                (position) => { setCurrLoc({...position.coords, isPosition:true, timestamp: position.timestamp} ) },
                (error) => { console.log(error.code, error.message); },
                { timeout: 15000 }
            );
        }

    }, [localState.locationPermission])

    if(isLoggedIn) {
        getUserById(userInfo.id).then( (resp:IUser) => {
            dispatch(updateUserDataFull({...resp}));
            if(resp.nickname_migrate) {
                // @ts-ignore
                navigateTo(navigation, SCREENS.ProfileNickname);
            }
        })
    }

    useEffect(() => {
        if(isLoggedIn) {
            /*
            getUserById(userInfo.id).then( (resp:IUser) => {
                dispatch(updateUserDataFull({...resp}));
                if(resp.nickname_migrate) {
                    // @ts-ignore
                    navigateTo(navigation, SCREENS.ProfileNickname);
                }
            })
            */

            //get initial LiveData
            console.log('wss getlive');
            getUserDataLive([]).then( (resp:IApiReturn<any>) => {
                dispatch(updateUserDataLive({...resp.data}));
                console.log('wss initial 1', userDataLive);
            });

            //wss socket stuff
            const wss_host = 'wss://petapidev.ratsysdev.com:6001';
            const user_channel = 'petapi:private-users.' + userInfo.user_id;

            let echo = new Echo({
                broadcaster: 'socket.io',
                host: wss_host,
                client: io,
                auth: {
                    headers: {
                        'Authorization': 'Bearer ' + userInfo.token,
                    },
                }
            });

            //bind our events
            echo.connector.socket.on('connect', function(){
                console.log('wss connected', echo.socketId());
            });
            echo.connector.socket.on('disconnect', function(){
                console.log('wss disconnected');
            });
            echo.connector.socket.on('wssreconnecting', function(attemptNumber: any){
                console.log('wss reconnecting', attemptNumber);
            });

            echo.channel('petapi:test-socket')
                .listen('.App\\Events\\TestSocket', (e: any) => {
                    //console.log('wss 1');
                    //console.log(e);
                });

            echo.channel(user_channel)
                .listen('.App\\Events\\Chat\\ChatMessageCreated', (chatMessage: any) => {
                    //Handle event
                    //console.log('wss 3. Chat message');
                    //console.log('wss 3', chatMessage);
                    getUserDataLive([]).then( (resp:IApiReturn<any>) => {
                        dispatch(updateUserDataLive({...resp.data}));
                    });
                })
                .listen('.App\\Events\\Task\\TaskResponseCreated', (taskResponse: any) => {
                    //Handle event
                    //console.log('wss 4. TaskResponse');
                    //console.log('wss 4', taskResponse);
                    getUserDataLive([]).then( (resp:IApiReturn<any>) => {
                        dispatch(updateUserDataLive({...resp.data}));
                    });
                })
                .listen('.App\\Events\\Notification\\NotificationCreated', (notification: any) => {
                    //Handle event
                    console.log('wss 5. Notification');
                    console.log('wss 5', notification);
                    console.log('wss 5', notification.body);

                    switch(notification.title) {
                        case 'Новое личное сообщение': {
                            //console.log('wss new chat')

                            //TODO: вынести в отдельную функцию по получению WSS данных
                            getUserDataLive([]).then( (resp:IApiReturn<any>) => {
                                dispatch(updateUserDataLive({...resp.data}));
                            });

                            break;
                        }
                    }
                });

            AsyncStorage.getItem("showHelp").then((resp) => {
                if(resp !== "off" ) {
                    if(userInfo.service_role == 2 || userInfo.service_role == 3){
                        navigateTo(navigation, SCREENS.UserSpecializationMedia)
                    } else {
                        navigateTo(navigation, SCREENS.HelpScreen);
                    }
                }

            })

            requestPushPermission().then((resp) => {
                if(resp) {
                    messaging().getToken().then(token => {
                        addFirebaseToken(token).then(resp => {
                            if (resp.success) {
                                AsyncStorage.setItem('firebaseDeviceToken', token).then();
                                dispatch(setDeviceToken(token));
                            }
                        });
                    });

                    messaging().onTokenRefresh(token => {
                        addFirebaseToken(token).then(resp => {
                            if (resp.success) {
                                AsyncStorage.setItem('firebaseDeviceToken', token).then();
                                dispatch(setDeviceToken(token));
                            }
                        });
                    });
                }
            })

        }

    }, [isLoggedIn]);


    const firebaseNavigate = (remoteMessage:any, source:string) => {
        if(remoteMessage?.data?.route == "event") {
            //@ts-ignore
            navigation.navigate('CommonNavigator', { screen: 'EventScreen', params: {eventId: remoteMessage?.data?.object_id } } );
        }
        if(remoteMessage?.data?.route == "message") {
            //@ts-ignore
            navigation.navigate('CommonNavigator', { screen: 'ChatScreen', params: {chatId: remoteMessage?.data?.object_id } } );
        }
    }


    return (

        isLoggedIn ? (
            <>
                {/* @ts-ignore */ }
                <Stack.Navigator  screenOptions={{headerShown: false, presentation: 'card'}}>
                    <Stack.Screen
                        name="BottomTabNavigator"
                        component={BottomTabNavigator}
                    />
                    <Stack.Screen
                        name="CommonNavigator"
                        component={CommonNavigator}
                    />
                </Stack.Navigator>
            </>
        ) : (
            <>
                {/* @ts-ignore */ }
                <Stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
                    <Stack.Screen name="Root" component={AuthNavigator} />
                </Stack.Navigator>
            </>
        )

    );
}
