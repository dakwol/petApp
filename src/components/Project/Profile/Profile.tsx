import React, {FC, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native'
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../../api/user/getUserById/getUserById";
import {getTranslateMessage, translate} from "../../../utils/translate";
import {getFullDate} from "../../../utils/datetime";
import {capitalizeFirstLetter} from "../../../utils/text";
import {getAvatar, getMediaFirst, getMediaPreview, getMediaPreviewSrc} from "../../../utils/common";

import ProfileRating from "./ProfileRating/ProfileRating";

import PetsList from "../PetsList/PetsList";
import {SCREENS} from "../../../navigation/screenName";
import FeedAddModal from "../FeedAddModal/FeedAddModal";
import FeedList from "../FeedList/FeedList";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import {getEvents} from "../../../api/events/getEvents";
import {Dictionary} from '../../../locales/dictionary';
import {IEvent} from '../../../types';
import {colors} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';
import {useIsFocused} from "@react-navigation/native";

import {Entypo, FontAwesome5 } from '@expo/vector-icons';

import {addChat} from "../../../api/chats/addChat/addChat";
import {errorMessage} from "../../../utils/showMessage";
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import { subscribeFeed } from '../../../api/user/subscribeFeed/subscribeFeed';
import { unSubscribeFeed } from '../../../api/user/unSubscribeFeed/unSubscribeFeed';
import { subscribeBlog } from '../../../api/user/subscribeBlog/subscribeBlog';
import { unSubscribeBlog } from '../../../api/user/unSubscribeBlog/unSubscribeBlog';
import Loading from '../../External/Post/components/Loading';

import {addIcon, moderation, notifications} from "../../../constants/images";

import ModalDialog from '../../UI/ModalDialog/ModalDialog';
import { userBlock } from '../../../api/user/userBlock/userBlock';
import StarsRating from "../../UI/StarsRating/StarsRating";
import { navigateTo } from '../../../utils/navigate';
import { getServiceMedia } from '../../../api/serviceMedia/getServiceMedia/getServiceMedia';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import { deleteServiceMedia } from '../../../api/serviceMedia/deleteServiceMedia/deleteServiceMedia';


interface IProfileComponent {
    user_id?: number | undefined;
    initialSection?: 'profile' | 'reviews' | 'settings';
    navigation: any
}

const FEED_TYPE_EVENTS = 1;
const FEED_TYPE_POSTS = 2;
const FEED_TYPE_ARCHIVE = 3;

interface IScreenState {
    feedType: 0 | 1 | 2 | 3 | number,
    isEventsLoading: boolean,
    swipeStart: any,
    swipeEnd: any,
    swipeSens: number
}

/*
interface IReview {
    review_rate: any; reviewer_user: any; review_text:string; review_id: number}
}*/

const Profile:FC<IProfileComponent> = ({
                                           user_id,
                                           initialSection= 'profile',
                                           navigation
                                       }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state?.session?.userData);
    //console.log('wss ui', userInfo);
    //TODO: классификаторы
    const exe_user = [2,3];
    const vol_user = [4,5];


    const userDataLive = useSelector((state:any) => state?.session?.userDataLive);
    //console.log('wss pr', userDataLive);

    const [screenState, setScreenState] = useState<IScreenState>({
        feedType: 1,
        isEventsLoading: true,
        swipeStart: 0,
        swipeEnd: 0,
        swipeSens: SCREEN_WIDTH * 0.25,
    })

    const onSwipeLeft = () => {
        if(screenState.feedType > FEED_TYPE_EVENTS) {
            setScreenState({...screenState, feedType: (screenState.feedType - 1) })
        }
    }

    const onSwipeRight = () => {
        if(screenState.feedType < FEED_TYPE_ARCHIVE) {
            setScreenState({...screenState, feedType: (screenState.feedType + 1) })
        }
    }

    const [modalFeedVisible, setModalFeedVisible] = useState(false);
    const [profileInfo, setProfileInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<any>(false);
    const [pets, setPets] = useState<any[]>([]);
    const [profileUserId, setProfileUserId] = useState<number | undefined>((user_id) ? user_id: userInfo.user_id )
    const [displaySection, setDisplaySection] = useState(initialSection);
    const [regionValue, setRegionValue] = useState("");
    const [screenEvents, setScreenEvents] = useState<IEvent[]>([]);
    const [servicesArr, setServicesArr] = useState<any[]>([]);

    const navigateToEventForm = (type: "post" | "event", id?: any) => {
        //GOTO Form
        if(profileUserId === userInfo.user_id) {
            const screenName = (type && type == "post") ? SCREENS.PostFormScreen : SCREENS.EventFormScreen;
            if (id && id != 0) {
                navigation.navigate('CommonNavigator', {screen: screenName, params: {id: id}});
            } else {
                navigation.navigate('CommonNavigator', {screen: screenName, params: {category_id: 0, type: "profile"}});
            }
        } else {
            navigation.push('CommonNavigator', {screen: SCREENS.EventScreen, params: {id: id}});
            /*
            navigation.navigate('CommonNavigator', {screen: SCREENS.EventScreen, params: {
                    eventId: id,
                    prevScreen: SCREENS.ProfileUserScreen,
                    userId:profileUserId
                }});

             */
        }
    }

    const navigateToEvent = (id?: any) => {

        //if(profileUserId === userInfo.user_id) {
            if (id && id != 0) {
                navigation.push('CommonNavigator', {screen: SCREENS.EventScreen, params: {id: id}});
            }
        //}
    }
    const navigateToPetForm = (id?: number) => {
        if(profileUserId === userInfo.user_id) {
            if (id) {
                navigation.navigate('CommonNavigator', {screen: SCREENS.ProfilePetForm, params: {id: id}})
            } else {
                navigation.navigate('CommonNavigator', {screen: SCREENS.ProfilePetForm, params: {type: 'profile'}})
            }
        } else {
            //TODO:: переход на просмотр питомца
        }
    }

    const getEventsList = async (type = undefined) => {
        let payload: { [key: string]: any } = {};
        if(screenState.feedType == 3) {
            payload.is_archive=1;
            payload.user_id = profileUserId;
            payload.limit = 1000;
        } else {
            payload.type = screenState.feedType;
            payload.user_id = profileUserId;
            payload.limit = 1000;
        }

        const data = await getEvents(payload);
        return data;
    };

    useEffect(() => {

        if (isFocused) {
            getUserById({user_id: user_id}).then((dataUser) => {
                setProfileInfo(dataUser);
                setPets(dataUser.pets);

                //set service media
                setServicesArr(dataUser.service_media);

                setRegionValue("Москва");
                setIsLoaded(true);
            });

            getEventsList().then(resp => {
                setScreenEvents(resp);
                setScreenState({...screenState, isEventsLoading: false})
            });

            //console.log('wss puid', profileInfo);

            if(userInfo.service_role == 2 || userInfo.service_role == 3){
                getServiceMedia(user_id).then(resp => {
                    setServicesArr(resp.data.files)
                })
            }

        }
    }, [isFocused]);


    useEffect(() => {
        setScreenState({...screenState, isEventsLoading: true})
        getEventsList().then(resp => {
            setScreenEvents(resp);
            setScreenState({...screenState, isEventsLoading: false})
            //dispatch(setEvents(resp))
        });
    }, [screenState.feedType])

    const toggleFeedModal = () => {
        setModalFeedVisible(!modalFeedVisible);
    }

    const onAddChat = async () => {
        if(profileUserId) {
            const response = await addChat({
                chat_user: profileUserId,
                chat_initiator: userInfo?.user_id
            })
            if (response.success) {
                navigation.navigate('CommonNavigator', {screen: 'ChatScreen', params: {chatId: response.data}});
            } else {
                errorMessage({
                    message: response.message,
                });
            }
        }
    }

    const [loading, setLoading] = useState(false);

    const onSubscribeUnSubscribePost = async (id: number | undefined, action: boolean) => {
        setLoading(true);
        const feedResponse = (action) ? await subscribeFeed(id): await unSubscribeFeed(id);
        const blogResponse = (action) ? await subscribeBlog(id): await unSubscribeBlog(id);
        if(feedResponse.success && blogResponse.success) {
                setProfileInfo({...profileInfo, is_subscribed_feed: action, is_subscribed_blog: action});
                setLoading(false);
            return;
        }
        errorMessage({
            message: getTranslateMessage(Dictionary.errors.section, feedResponse.message || blogResponse.message)
        });
    }

    const [modalDialog, setModalDialog] = useState(false);

    const toggleModalDialog = (force?: any) => {
      if (force != undefined) {
        setModalDialog(force);
        return;
      }
      setModalDialog(!modalDialog);
    }

    const blockUser = async (id: number | undefined) => {

        const userBlocked = await userBlock(id);
        if(userBlocked.success){
            errorMessage({
                message: translate("user.userBlocked") + " " + profileInfo.nickname,
            });
            setModalDialog(false)
        } else {
            errorMessage({
                message: userBlocked.message,
            });
            setModalDialog(false)
        }
      }

    useEffect(() => {
        setModalDialog(false);
      }, [isFocused])

    const[blockDots, setBlockDots] = useState<boolean>(false)

    const modalDialogItems = useMemo(() => [
        {text:capitalizeFirstLetter(translate('modalButton.addStories')), icon: "card-text", action: () => { navigation.navigate('CommonNavigator', {screen: SCREENS.StoriesFormScreen})}},
        {text:capitalizeFirstLetter(translate('modalButton.addEvent')), icon:"post", action: ()=>{{ navigateToEventForm("event") } }},
        {text:capitalizeFirstLetter(translate('modalButton.addPost')), icon: "card-text", action: () => {navigateToEventForm("post")}},
        {text:capitalizeFirstLetter(translate('common.close')), icon: "close", action: () => { toggleModalDialog(false) } },
    ], []);

    const modalDialogBlockItems = useMemo(() => [
        {text:capitalizeFirstLetter(translate('modalButton.blockUser')),icon:'', action:() => {blockUser(user_id)}},
        {text:capitalizeFirstLetter(translate('modalButton.claimUser')),icon:'', action:() => //@ts-ignore
            navigation.navigate('CommonNavigator', {screen: SCREENS.ClaimScreen, params: {eventId: profileInfo.events[0].id}})},
        {text:capitalizeFirstLetter(translate('common.close')), icon: "close", action: () => { toggleModalDialog(false) } }

    ], []);

    const deleteServicesMedia = async(service_id: number) => {
        deleteServiceMedia({id: service_id}).then(data=>{
            getServiceMedia(userInfo.user_id).then(resp => {
                setServicesArr(resp.data.files)
            })
        })

    }

    //console.log('wss sa', servicesArr);

    return (
        <View style={[styles.background]}>
            <FeedAddModal isVisible={modalFeedVisible} toggleModal={toggleFeedModal}/>
            <ModalDialog
                isVisible={modalDialog}
                toggleModal={toggleModalDialog}
                items={blockDots? modalDialogBlockItems : modalDialogItems}
            />
            {isLoaded && displaySection == "profile" &&
                <View style={styles.profile}>
                    {/*TODO:: Вынести хидер в отдельный компонент*/}
                    <View style={styles.profileHeader}>
                        <View style={profileUserId && profileUserId === userInfo?.user_id? {width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}: {width: "100%",justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>

                            {profileInfo.role == 1 || (profileInfo.role == 4 || profileInfo.role == 5)
                                ?
                                    <>
                                        <View style={{overflow: 'hidden', width: '70%'}}>
                                            <Text numberOfLines={1} style={[styles.bodySectionTitle, {overflow:'hidden'} ]}>{profileInfo.nickname} ({profileInfo.first_name} {profileInfo.last_name})</Text>
                                        </View>
                                        {profileUserId && profileUserId !== userInfo?.user_id &&
                                                <TouchableOpacity onPress={() => {[setModalDialog(true), setBlockDots(true)]}}>
                                                    <Entypo name="dots-three-horizontal" size={24} color="grey" />
                                                </TouchableOpacity>
                                        }
                                    </>
                                :
                                <>
                                    <Text style={styles.bodySectionTitle}>{profileInfo.ur_name}</Text>
                                    <Text>{profileInfo.ur_legalname}</Text>

                                </>
                            }
                            {/*{profileUserId && profileUserId === userInfo?.user_id &&
                                <Text numberOfLines={1} style={{
                                    fontSize: 16,
                                    color: "#392413",
                                    lineHeight: 22.5,
                                    fontWeight: "500",
                                    width: 150
                                }}>{profileInfo.full_name}</Text>
                                }*/}

                            {profileUserId && profileUserId === userInfo?.user_id &&
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: 'space-between',
                                    alignItems: "center"
                                }}>
                                     {(profileInfo.role == 4 || profileInfo.role == 5) &&
                                     <>
                                            <TouchableOpacity style={{width: 20, height:25, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                            navigation.navigate('CommonNavigator', {screen: SCREENS.StoriesModerationScreen, params:{user_id: profileUserId}})
                                            }}>
                                                <Image source={moderation} style={{resizeMode: 'contain', width: 15, height: 14}}></Image>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{width: 20, height:25, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileClaim, params:{user_id: profileUserId}})
                                            }}>
                                                <Image source={moderation} style={{resizeMode: 'contain', width: 15, height: 14}}></Image>
                                            </TouchableOpacity>
                                        </>
                                     }
                                    <ButtonAdd buttonSize={25} onPress={() =>{setModalDialog(true)}}/>
                                    <TouchableOpacity
                                        style={{width: 20, height:25, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                        navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileNotificationsList})
                                    }}>
                                        <Image source={notifications} style={{resizeMode: 'contain', width: 15, height: 14}}></Image>
                                        {userDataLive.unread_notifications > 0 && (
                                        <Badge
                                            status="error"
                                            containerStyle={{ position: "absolute", top: 2, right: 1}}
                                        />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        //@ts-ignore
                                        navigation.navigate('ProfileSettings');
                                    }}>
                                        <Entypo name="menu" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={[styles.profileInfoContainer, {flex: 1}]}>
                            <View>
                                <TouchableOpacity  onPress={() =>{ }}>
                                    {/*onPress={()=> {navigation.navigate('CommonNavigator', {screen: 'StoriesEditScreen'})}} */}
                                    <Image style={[styles.profileImage,{resizeMode: profileInfo?.avatar_media == null? "contain" : "cover"}]}
                                        source={{uri: getAvatar(profileInfo?.avatar_media?.preview)}}
                                        //source={{uri: profileInfo.avatar_media.preview}}
                                    />
                                </TouchableOpacity>
                                {/* {profileUserId && profileUserId === userInfo?.user_id &&
                                    <View style={{position: 'absolute', bottom:-11, right: -13}}>
                                        <ButtonAdd buttonSize={32} onPress={ () => {} }/>
                                    </View>
                                } */}
                            </View>
                            <View style={{flex: 1, marginLeft: 10}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 10}}>
                                    <View style={styles.publishItem}>
                                        <Text style={{fontWeight: 'bold'}}>{profileInfo.events.length}</Text>
                                        <Text style={{fontSize: 12}}>Публикации</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileSubscribers, params:{user_id:profileUserId, screen: 'followers'}})}} style={styles.publishItem}>
                                        <Text style={{fontWeight: 'bold'}}>{profileInfo.followers}</Text>
                                        <Text style={{fontSize: 12}}>Подписчиков</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileSubscribers, params:{user_id:profileUserId, screen: 'subscribers'}})}} style={styles.publishItem}>
                                        <Text style={{fontWeight: 'bold'}}>{profileInfo.subscribers}</Text>
                                        <Text style={{fontSize: 12}}>Подписки</Text>
                                    </TouchableOpacity>

                                </View>
                                {profileInfo.service_role == 1
                                    ?
                                    <View style={styles.alignProfileInfo}>
                                        <Text
                                            style={styles.profileRegisterInfo}>{translate(`profile.services_role_${profileInfo.service_role}`)},</Text>
                                        <Text
                                            style={styles.profileRegisterInfo}>{translate('profile.created_at')} {getFullDate(profileInfo.created_at)}</Text>
                                    </View>
                                    :
                                    <>
                                        <Text
                                            style={styles.profileRegisterInfo}>{translate(`profile.services_role_${profileInfo.service_role}`)}, {translate('profile.created_at')} {getFullDate(profileInfo.created_at)}</Text>
                                    </>
                                }
                                <ProfileRating profileId={profileInfo.id} profileInfoProp={profileInfo} containerStyle={null} />
                            </View>
                        </View>
                        <View>
                            { profileUserId && profileUserId === userInfo?.user_id?
                                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={[styles.redactButton, {marginVertical: 10}]} onPress={()=> {navigation.navigate('CommonNavigator', {screen: 'ProfileFormScreen'})}}>
                                        <Text style={{color: 'white', fontWeight: 'bold',  textTransform: 'uppercase', fontSize: 12}}>{translate("profile.profileEdit")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.redactButton, {marginVertical: 10, width: '35%'}]} onPress={()=> {navigation.navigate('CommonNavigator', {screen: 'StoriesEditScreen'})}}>
                                        <Text style={{color: 'white', fontWeight: 'bold',  textTransform: 'uppercase', fontSize: 12}}>{translate("profile.myStories")}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{flexDirection: 'row', width: '70%'}}>
                                    <SubscribeButton
                                        isLoading={loading}
                                        isSubscribe={(profileInfo.is_subscribed_feed && profileInfo.is_subscribed_blog)? true : false}
                                        onSubscribe={() => {onSubscribeUnSubscribePost(profileInfo.id, true).then()}}
                                        onUnSubscribe={() => {onSubscribeUnSubscribePost(profileInfo.id, false).then()}}
                                        textButton={(profileInfo.is_subscribed_feed && profileInfo.is_subscribed_blog)? translate("subscribeButton.unSubscribe") : translate("subscribeButton.subscribe")}
                                    />
                                    <TouchableOpacity style={[styles.redactButton, {marginVertical: 10, width: '50%'}]} onPress={onAddChat}>
                                        <Text style={{color: 'white', fontWeight: 'bold',  textTransform: 'uppercase'}}>{translate("profile.userMessage")}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>

                    <View style={styles.profileBody}>
                        {profileInfo.service_role != 1 &&
                            <View>
                                <Text style={styles.profileRegisterInfo}>
                                    {profileInfo.description}
                                </Text>
                                <View style={styles.alignProfileInfoNoRow}>
                                    <Text style={styles.profileRegisterInfo}>Телефон {profileInfo.phone}</Text>
                                </View>
                                <View style={styles.alignProfileInfo}>
                                    <Text style={styles.profileRegisterInfo}>Веб-сайт {profileInfo.website}</Text>
                                </View>
                                <View style={styles.alignProfileInfo}>
                                    <Text style={styles.profileRegisterInfo}>Адрес {profileInfo.ur_address}</Text>
                                </View>
                            </View>
                        }
                        <View>

                            {profileInfo && vol_user.includes(profileInfo.service_role) &&
                                <View>
                                    <Text
                                        style={styles.bodySectionTitle}>{capitalizeFirstLetter(translate('registration.ur_rekv'))}
                                    </Text>
                                    <Text>
                                        {profileInfo.ur_rekv}
                                    </Text>
                                </View>
                            }

                            {profileInfo && exe_user.includes(profileInfo.service_role) &&

                                    <View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text
                                                style={styles.bodySectionTitle}>{capitalizeFirstLetter(translate('services.examples'))}
                                            </Text>
                                            {profileUserId && profileUserId === userInfo?.user_id &&
                                                <ButtonAdd buttonSize={32} onPress={ () => { navigateTo(navigation, SCREENS.UserSpecializationMedia)} } />
                                            }
                                        </View>
                                        {servicesArr && servicesArr.length > 0 ?
                                            <ScrollView horizontal style={{flexDirection:'row'}}>
                                               {servicesArr.map((item:any)=>{
                                                return (
                                                    <View style={{marginRight: 10, marginTop: 10}}>
                                                        <TouchableOpacity>
                                                            <Image style={{width: 60, height: 60, borderRadius: 5, resizeMode: 'cover'}}
                                                                    source={{uri: item.preview}}
                                                            />
                                                        </TouchableOpacity>
                                                        {profileUserId && profileUserId === userInfo?.user_id &&
                                                        <View style={{position: 'absolute', right: -5, top: -5}}>
                                                            <ButtonDelete buttonSize={13} onPress={() => {
                                                                deleteServicesMedia(item.id)
                                                            }}/>
                                                        </View>
                                                        }
                                                    </View>
                                                )
                                               })}
                                            </ScrollView>
                                            :
                                            <View>
                                                <Text style={{textAlign: 'center'}}>Работ не добавлено</Text>
                                                {console.log(profileInfo)}
                                            </View>
                                        }

                                        {profileInfo.services.length > 0 ?
                                            <View>
                                                <Text
                                                    style={styles.bodySectionTitle}>{capitalizeFirstLetter(translate('profile.services'))}
                                                </Text>
                                                <View>
                                                    {
                                                        profileInfo.services.map((item: { name: any; price: any; }) => {
                                                            return <Text>{item.name} от {item.price} Р</Text>
                                                        })
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <Text style={{textAlign: 'center'}}>Услуг не добавлено</Text>
                                            </View>
                                        }
                                    </View>

                            }

                            {profileInfo && (exe_user.includes(profileInfo.service_role || vol_user.includes(profileInfo.service_role))) &&
                                <View>
                                    <Text
                                        style={styles.bodySectionTitle}>{capitalizeFirstLetter(translate('profile.reviews'))}
                                    </Text>
                                    {profileInfo.reviews.length > 0 ?
                                        <View>
                                            {
                                                profileInfo.reviews.map((review: any) =>
                                                     <View style={{flexDirection: 'row'}}>
                                                        <View style={{alignItems: 'center', marginRight: 20}}>
                                                            <Image style={{width: 60, height: 50, borderRadius: 5, resizeMode: 'contain'}}
                                                                   source={{uri: getAvatar(review.reviewer_user.avatar_media)}}
                                                            />
                                                            <Text style={{fontWeight: 'bold', color: colors.black}}>{review.reviewer_user.first_name}</Text>
                                                        </View>
                                                        <View>
                                                            <StarsRating stars={review.stars} starSize={15}/>
                                                            <Text style={{fontWeight: 'bold', color: colors.black}}>{review.review_text}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    :
                                        <View>
                                            <Text style={{textAlign: 'center'}}>Пока нет отзывов</Text>
                                        </View>
                                    }
                                </View>
                            }

                            {profileInfo && !exe_user.includes(profileInfo.service_role) && //exclude pets for exe
                                <View>
                                    <View style={{flexDirection: 'row', alignItems: "center"}}>

                                        {profileUserId && profileUserId === userInfo?.user_id &&
                                            <ButtonAdd buttonSize={32} onPress={() => { navigateToPetForm() } }/>
                                        }
                                        <View>
                                            <Text
                                                style={styles.bodySectionTitle}>{capitalizeFirstLetter(translate('pet.pets'))}
                                            </Text>
                                        </View>

                                        <View style={{justifyContent: "flex-end"}}>

                                        </View>

                                    </View>
                                    {pets.length > 0 ?
                                        <PetsList
                                            onPetPress={ navigateToPetForm }
                                            nestedScrollEnabled
                                            pets={profileInfo.pets}
                                        />
                                        :
                                        <View>
                                            <Text style={{textAlign: 'center'}}>Нет питомцев</Text>
                                        </View>
                                    }
                                </View>
                            }

                            {profileInfo &&
                                <>
                                    <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row',}}>
                                        <View style={{flexDirection: 'row', alignItems: "center"}}>

                                            {profileUserId && profileUserId === userInfo?.user_id &&
                                                <ButtonAdd buttonSize={32} onPress={ () => { navigateToEventForm("event") } }/>
                                            }
                                            <TouchableOpacity onPress={() => setScreenState({...screenState, feedType: FEED_TYPE_EVENTS})}>
                                                <Text style={[styles.bodySectionTitle, {
                                                    marginLeft: 5,
                                                    borderColor: colors.brown,
                                                    paddingHorizontal: 10,
                                                }, screenState.feedType == FEED_TYPE_EVENTS && {
                                                    borderWidth: 1,
                                                    borderRadius: 5
                                                }]}>{capitalizeFirstLetter(translate('event.feed'))}</Text>
                                            </TouchableOpacity>
                                            {profileUserId && profileUserId === userInfo?.user_id &&
                                                <View style={{justifyContent: "flex-end"}}>

                                                </View>
                                            }
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: "center"}}>
                                            {profileUserId && profileUserId === userInfo?.user_id &&
                                                <ButtonAdd buttonSize={32} onPress={ () => { navigateToEventForm("post") } } />
                                            }
                                            <TouchableOpacity onPress={() => setScreenState({...screenState, feedType: FEED_TYPE_POSTS})}>
                                                <Text style={[styles.bodySectionTitle, {
                                                    marginLeft: 5,
                                                    borderColor: colors.brown,
                                                    paddingHorizontal: 10,
                                                }, screenState.feedType == FEED_TYPE_POSTS && {
                                                    borderWidth: 1,
                                                    borderRadius: 5
                                                }]}>{capitalizeFirstLetter(translate(Dictionary.post.blog))}</Text>
                                            </TouchableOpacity>
                                            {profileUserId && profileUserId === userInfo?.user_id &&
                                                <View style={{justifyContent: "flex-end"}}>

                                                </View>
                                            }
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: "center"}}>
                                            <TouchableOpacity onPress={() => setScreenState({...screenState, feedType: FEED_TYPE_ARCHIVE})}>
                                                <Text style={[styles.bodySectionTitle, {
                                                    marginLeft: 5,
                                                    borderColor: colors.brown,
                                                    paddingHorizontal: 10,
                                                }, screenState.feedType == FEED_TYPE_ARCHIVE && {
                                                    borderWidth: 1,
                                                    borderRadius: 5
                                                }]}>{capitalizeFirstLetter(translate(Dictionary.common.archive))}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View>
                                        {screenState.isEventsLoading !== false && (
                                            <ActivityIndicator size={48}/>
                                        )}
                                        {(screenState.isEventsLoading === false && screenState.feedType == FEED_TYPE_EVENTS) &&
                                            (screenEvents.length > 0 ?
                                                    <FeedList
                                                        nestedScrollEnabled
                                                        data={screenEvents}
                                                        onItemPress={(id) => { navigateToEvent(id) }}
                                                    />
                                                    :
                                                    <View>
                                                        <Text style={{textAlign: 'center'}}>
                                                            {capitalizeFirstLetter(translate(Dictionary.event.noEvents))}
                                                        </Text>
                                                    </View>
                                            )
                                        }

                                        {(screenState.isEventsLoading === false && screenState.feedType == FEED_TYPE_POSTS) &&
                                            (screenEvents.length > 0 ?
                                                    <FeedList
                                                        nestedScrollEnabled
                                                        data={screenEvents}
                                                        onItemPress={(id) => { navigateToEvent(id) }}
                                                    />
                                                    :
                                                    <View>
                                                        <Text style={{textAlign: 'center'}}>
                                                            {capitalizeFirstLetter(translate(Dictionary.event.noPosts))}
                                                        </Text>
                                                    </View>
                                            )
                                        }

                                        {(screenState.isEventsLoading === false && screenState.feedType == FEED_TYPE_ARCHIVE) &&
                                            (screenEvents.length > 0 ?
                                                    <FeedList
                                                        nestedScrollEnabled
                                                        data={screenEvents}
                                                        onItemPress={(id) => { navigateToEvent(id) }}
                                                    />
                                                    :
                                                    <View>
                                                        <Text style={{textAlign: 'center'}}>
                                                            {capitalizeFirstLetter(translate(Dictionary.event.noArchive))}
                                                        </Text>
                                                    </View>
                                            )
                                        }

                                    </View>
                                </>
                            }
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}
export default Profile


