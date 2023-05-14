import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {cat_icons, cat_icons_emergency, clockIconBrown, locationIconBrown, moderation} from '../../../constants/images';
import { AntDesign } from '@expo/vector-icons';
import {Event, IEvent, IMedia} from '../../../types';
import {datetimeConvert, getTimeFromDate} from '../../../utils/datetime';
import {getFormData} from '../../../utils/formData';
import styles from './styles';
import {getMediaFirst, getMediaFull, getMediaFullSrc, getMediaPreviewSrc, getSvgXml} from "../../../utils/common";
import {SCREENS} from "../../../navigation/screenName";

import {getTranslateMessage, translate} from "../../../utils/translate";
import {addChat} from "../../../api/chats/addChat/addChat";
import {useSelector} from "react-redux";
import FlatListMedia from "../../Base/FlatListMedia/FlatListMedia";
import {getEvents} from '../../../api/events/getEvents/getEvents';

import {Dictionary} from "../../../locales/dictionary";
import {errorMessage} from "../../../utils/showMessage";
import EventMapModal from '../EventMapModal/EventMapModal';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import ProfileRating from "../Profile/ProfileRating/ProfileRating";
import Button from "../../UI/Button/Button";
import {colors} from "../../../constants/Colors";
import CommentsList from "../CommentList/CommentsList";
import ModalDialog from '../../UI/ModalDialog/ModalDialog';

import {Entypo} from '@expo/vector-icons';
import {capitalizeFirstLetter} from "../../../utils/text";
import {EVENT_TYPES} from "../../../constants/project";
import {archiveEvent} from "../../../api/events/archiveEvent/archiveEvent";
import {unArchiveEvent} from "../../../api/events/unArchiveEvent/unArchiveEvent";
import {showMessage} from "react-native-flash-message";
import EventPostLike from '../../UI/EventPostLike/EventPostLIke';
import { likePost } from '../../../api/user/likePost/likePost';
import { unLikePost } from '../../../api/user/unLikePost/unLikePost';
import {err} from "react-native-svg/lib/typescript/xml";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants/globalStyles";
import { Video } from 'expo-av';
import FlatListCarouser from '../../UI/FlatListCarousel/FlatListCarousel';
import ModalSimple from '../../UI/ModalSimple/ModalSimple';
import VideoPlayer from '../../UI/VideoPlayer/VideoPlayer';
import RekvList from '../RekvList/RekvList';



type Props = {
  eventId: number;
  needCommentsRefresh:boolean;
  setNeedCommentsRefresh: any;
};

interface ICompState {
  isChatLoading: boolean,
  event: IEvent | undefined,
  isEventLoading: boolean,
  media: IMedia[]
}
const EventCard: FC<Props> = ({eventId, needCommentsRefresh, setNeedCommentsRefresh, ...props}) => {

  const [compState, setCompState] = useState<ICompState>({
    isChatLoading: false,
    event: undefined,
    isEventLoading: true,
    media: []
  })
  const navigation = useNavigation();
  const userInfo = useSelector((state: any) => state?.session?.userData);
  const isFocused = useIsFocused();
  const [modalDialog, setModalDialog] = useState(false);

  const toggleModalDialog = (force?: any) => {
    if (force != undefined) {
      setModalDialog(force);
      return;
    }
    setModalDialog(!modalDialog);
  }

  const onAddChat = async () => {
    setCompState({...compState, isChatLoading: true});
    if (compState.event) {
      const response = await addChat({
        chat_user: compState.event.user_id,
        event_id: compState.event.id,
        chat_initiator: userInfo.user_id
      })
      if (response.success) {
        // @ts-ignore
        navigation.navigate('CommonNavigator', {screen: 'ChatScreen', params: {chatId: response.data}});
      } else {
        errorMessage({
          message: response.message,
        });
      }
    } else {
      errorMessage({
        message: translate(Dictionary.errors.unknownError)
      });
      setCompState({...compState, isChatLoading: false});
    }
  }

  const onAddClaim = async () => {
    setCompState({...compState, isChatLoading: true});
    if (compState.event) {
      // @ts-ignore
      navigation.navigate('CommonNavigator', {screen: SCREENS.ClaimScreen, params: {eventId: compState.event.id}});
    } else {
      errorMessage({
        message: translate(Dictionary.errors.unknownError)
      });
      setCompState({...compState, isChatLoading: false});
    }
  }

  useEffect(() => {
    setModalDialog(false);
  }, [isFocused])

  useEffect(() => {
    if(eventId != 0) {
      getEventDetail().then();
    }
  }, [eventId]);
/*
  useEffect(() => {
    getEventDetail().then();
  }, []);
*/
  const getEventDetail = async () => {
    const payload = {
      evt_id: eventId,
    };
    try {
      const response = await getEvents(getFormData(payload));
      let eventTmp = response[0];
      if (eventTmp.media.length == 0) {
        eventTmp.media.push('');
      }

      eventTmp.categoryData = (compState.event?.category?.sub_category)
          ? {
            category: eventTmp.category?.sub_category,
            category_icon_link: eventTmp.category?.sub_category_icon_link,
            category_id: eventTmp.category?.sub_category_id,
          }
          : {
            category: eventTmp.category?.main_category,
            category_icon_link: eventTmp.category?.main_category_icon_link,
            category_id: eventTmp.category?.main_category_id,
          }
      ;

      eventTmp.categoryIconXml = await getSvgXml(eventTmp.categoryData.category_icon_link);
      //console.log('ICON',eventTmp.categoryData.category_icon_link)
      //console.log('ICON2 ' ,eventTmp.categoryIconXml)
      if (eventTmp.is_emergency) {
        /*eventTmp.priorityColor = priorityToColor[eventTmp.evt_priority];
        let tmpIconXml = await getSvgXml(compState.event?.category?.main_category_icon_link);
        eventTmp.categoryIconXml = tmpIconXml.toString()
            .replace(/fill="#[0-9a-f]{6}"/g, `fill="${eventTmp.priorityColor}"`)
            .replace(/stroke="#[0-9a-f]{6}"/g, `stroke="${eventTmp.priorityColor}"`)

         */
      }
      setCompState({...compState, event: eventTmp, media: eventTmp.media, isEventLoading: false})

    } catch (error) {
    }
  };

  const navigateToUser = (id: any) => {
    if (userInfo.user_id == id) {
      // @ts-ignore
      navigation.navigate('BottomTabNavigator', {screen: SCREENS.Profile});
    } else {
      // @ts-ignore
      navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId: id}})
    }
  }

  const scrollViewRef = useRef(null);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (!needCommentsRefresh && !firstRender) {
      // @ts-ignore
      scrollViewRef.current?.scrollToEnd()
    }
    if (!needCommentsRefresh && firstRender) {
      setFirstRender(false)
    }
  }, [needCommentsRefresh]);

  const [fullView, setFullView] = useState(false);
  const toggleModal = (value: boolean | undefined = undefined) => {
    if (value == undefined) {
      setFullView((pre) => !pre);
    } else {
      setFullView(value);
    }
  }

  const toggleArchiveEvent = async () => {
    console.log("ARCHIVE TEST", compState.event);
    const response = compState?.event?.is_archive ? await unArchiveEvent(compState?.event?.id): await archiveEvent(compState?.event?.id);
    if (response.success && compState?.event) {
      const newEvent: IEvent = {...compState.event, is_archive: !compState?.event?.is_archive};
      setCompState({...compState, event: newEvent});
      showMessage({
        message: translate(response.message),
        type: "success"
      });
    } else {
      errorMessage({message: getTranslateMessage(Dictionary.errors.section, response.message)})
      toggleModalDialog(false);
    }
  }
  const navigateToEventForm = useCallback(() => {
    const screenName = (compState?.event?.type == EVENT_TYPES.POST) ? SCREENS.PostFormScreen : SCREENS.EventFormScreen;
    // @ts-ignore
    navigation.navigate('CommonNavigator', {screen: screenName, params: {id: compState?.event?.id}});
  }, [compState.event?.id]);

  const navigateToModerationForm = useCallback(() => {
    // @ts-ignore
    navigation.navigate('CommonNavigator', {screen: SCREENS.EventModerationScreen, params:{eventId: compState?.event?.id, screenAction: 'eventCard'}})
  }, [compState.event?.id]);

  const modalDialogItems = useMemo(() => [
    {text:capitalizeFirstLetter(translate('modalButton.redact')), icon:"post", action: navigateToEventForm},
    {text:capitalizeFirstLetter(translate(compState.event?.is_archive? 'modalButton.removeArchive': 'modalButton.addArchive')), icon: "card-text", action: () => {toggleArchiveEvent()}},
    {text:capitalizeFirstLetter(translate('common.close')), icon: "close", action: () => { toggleModalDialog(false) } }
  ], [navigateToEventForm, compState.event]);

  const onLikeUnlikePost = async (id: number | undefined, action: boolean) => {
    if(compState.event == undefined || id == undefined) {
      return;
    }
    const likeResponse = (action) ? await likePost(id): await unLikePost(id);
    if(likeResponse.success) {
      setCompState({...compState, event: {...compState.event, user_like: action}});
      return;
    }
    errorMessage({
      message: getTranslateMessage(Dictionary.errors.section, likeResponse.message)
    });
  }


  const [imagesSlider, setImagesSlider] = useState<any>();
  const [mediaImage] = useState<IMedia>(getMediaFirst(compState.media));
  const images = imagesSlider == undefined || ''? [getMediaPreviewSrc(mediaImage)] : imagesSlider;


  
  useEffect(()=>{
    let localImages: any[] = [];
    compState.media.forEach(item => {
        if (item.is_checked && item.media_type == "image") {
            localImages.push(getMediaFullSrc(item));
            setImagesSlider(localImages)
        }
    });

  },[compState.media])

  const userServices = compState?.event?.user;


  console.log(userServices?.service_role)
  

  return (
      <>
        <EventMapModal event={compState.event} isVisible={fullView} toggleModal={toggleModal}/>
        <ModalDialog
            isVisible={modalDialog}
            toggleModal={toggleModalDialog}
            items={modalDialogItems}
        />
        <View style={styles.container}>
          {compState.isEventLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator size={'large'} />
              </View>
          ) : (
              <View style={{flex: 1}}>
                <ScrollView ref={scrollViewRef} >
                  <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", alignItems: "center", justifyContent: "center",
                                height: SCREEN_HEIGHT * 0.55}}>
                    {compState.media && 
                      //<FlatListMedia items={compState.media} onUserRole={userInfo.role}/>
                      <FlatListCarouser data={images} openMedia={()=>{}} screenWidth={true}></FlatListCarouser>
                    }
                  </View>
                  <View style={{position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center'}}>
                      {userInfo.role == 4 &&
                          <TouchableOpacity  style={{width: 30, height:35, alignItems: 'center', justifyContent: 'center'}} onPress={()=>{navigateToModerationForm()}}>
                              <Image source={moderation} style={{resizeMode: 'contain', width: 20, height: 20}}></Image>
                          </TouchableOpacity>
                      }
                      {compState?.event?.user_id == userInfo.user_id &&
                        <TouchableOpacity onPress={() => setModalDialog(true)}>
                          <Entypo name="dots-three-horizontal" size={24} color="grey" />
                        </TouchableOpacity>
                      }
                    </View>

                        {compState.event && compState.event.type != EVENT_TYPES.POST &&
                            <View style={[{marginBottom: 10, marginTop: 5, position: 'relative'}]}>
                              <Text style={{fontWeight: 'bold', fontSize:20, color: colors.greenPH, marginTop: 5}}>
                                {compState.event?.evt_topic}
                              </Text>
                              <View style={styles.detailRow}>
                                {/* (compState.event?.categoryData.category_icon_link.includes(".svg") === true) && <SvgUri uri={getSvgUrl(compState.event?.categoryData.category_icon_link)} style={styles.icon}/> */}

                                {compState.event?.is_emergency
                                    ?
                                    <Image
                                        style={{marginRight: 10}}
                                        source={cat_icons_emergency[compState.event?.evt_priority]}
                                    ></Image>
                                    :
                                    <Image
                                        style={{marginRight: 10}}
                                        source={cat_icons[compState.event?.evt_ctgy_id]}
                                    ></Image>
                                }

                                <Text style={styles.detailText}>
                                  {compState.event?.is_emergency
                                      ?
                                      <Text>Экстренное событие:&nbsp;
                                      </Text>
                                      :
                                      <></>
                                  }
                                  {compState.event?.categoryData.category}
                                </Text>
                                <View style={[styles.detailRow, {position: 'absolute', right: 10}]}>
                                  <AntDesign name="eye" size={24} color={colors.greenPH} style={{marginRight:10}} />
                                  <Text>{compState.event.views? compState.event.views : 0}</Text>
                                </View>
                              </View>

                            </View>
                        }
                  <View>
                  <View>
                    <View style={styles.detailRow}>
                      <Image source={clockIconBrown} style={styles.icon} />
                      <Text style={styles.detailText}>
                        {datetimeConvert(compState.event?.created_at!) +
                            ', ' +
                            getTimeFromDate(compState.event?.created_at!)}
                      </Text>
                    </View>

                      {compState.event && compState.event.type != EVENT_TYPES.POST &&
                          <TouchableOpacity style={styles.detailRow} onPress={ () => { toggleModal(true)} }  >
                            <Image source={locationIconBrown} style={styles.icon}/>
                            <Text style={styles.detailText}>{compState.event?.evt_address}</Text>
                          </TouchableOpacity>
                      }
                      <View style={styles.detailRow}>
                        <Text style={styles.detailText}>{compState.event?.description}</Text>
                      </View>

                      {(userServices?.service_role == 4 || userServices?.service_role == 5 || userServices?.service_role == 6) && 
                        <View style={{marginVertical: 10}}>
                          <Text style={{color: colors.black, fontSize: 15, marginBottom: 5}}>{capitalizeFirstLetter(translate('registration.ur_rekv'))}</Text>
                          <RekvList rekv={userServices?.ur_rekv}/>
                        </View>
                      }
                  </View>

                  {/*compState?.event && compState.event.type == EVENT_TYPES.POST &&
                    <View style={{justifyContent: "flex-end"}}>
                      <EventPostLike
                            isLiked={compState?.event?.user_like}
                            onLike={ () => { onLikeUnlikePost(compState.event?.id, true).then() } }
                            onUnLike={ () => { onLikeUnlikePost(compState.event?.id, false).then() } }
                      />
                  </View>
                  */}
                  </View>
                  {compState.event?.user_id &&
                      <View style={[styles.detailRow]}>
                        <ProfileRating
                            profileId={compState.event.user_id}
                            showAvatar
                            avatarPosition="right"
                            showName={false}
                            showNick={false}
                            showNickFIO={true}
                            namePosition="top"
                            showCountText={false}
                            onRatingsProps={navigateToUser}
                            //onPress={  navigateToUser }
                        />
                      </View>
                  }
                  <View style={{marginTop:10, flex:1, alignItems:"center"}}>
                    <Button text={translate("chat.send")}
                            action={ onAddChat }
                            styleContainer={{backgroundColor: colors.white, borderWidth:1, borderColor: colors.greenPH}}
                            styleText={{color:colors.greenPH}}
                    />
                  </View>
                  <View style={[styles.detailRow,{flex:1,flexDirection: "row", borderWidth:1, borderColor: "#FFF"}]}>
                    <CommentsList
                        eventId={eventId}
                        eventDetail={compState.event}
                        needCommentsRefresh={needCommentsRefresh}
                        setNeedCommentsRefresh={setNeedCommentsRefresh}
                        navigateToUser = { navigateToUser }
                    />
                  </View>
                  <View style={{marginTop:50, flex:1, alignItems:"center"}}>
                    <Button text={"Пожаловаться на объявление"}
                            action={ onAddClaim }
                            styleContainer={{backgroundColor: '#F4F4F4'}}
                            styleText={{color:'#5B5B5B', fontSize: 14}}
                    />
                  </View>
                </ScrollView>
              </View>
          )}
        </View>
      </>
  );
};

export default EventCard;
