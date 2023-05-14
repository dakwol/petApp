import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {
    activeFavouriteIcon,
    activeLikePostIcon,
    clockIcon,
    Icons,
    locationIcon,
    unActiveFavouriteIcon,
    unActiveLikePostIcon,
} from '../../../../constants/images';
import {IEvent, IMedia} from '../../../../types';
import {datetimeConvert, getTimeFromDate} from '../../../../utils/datetime';
import styles from './styles';
import {getMediaFirst, getMediaPreview, getMediaPreviewSrc} from "../../../../utils/common";
import {addChat} from "../../../../api/chats/addChat/addChat";
import {showMessage} from "react-native-flash-message";
import {useSelector} from "react-redux";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {colors} from "../../../../constants/Colors";
import CommentsList from "../../CommentList/CommentsList";
import {SCREENS} from "../../../../navigation/screenName";
import InputSend from "../../../UI/InputSend/InputSend";
import {getTranslateMessage, translate} from "../../../../utils/translate";
import {errorMessage} from "../../../../utils/showMessage";

import PlayButton from "../../../UI/PlayButton/PlayButton";
import BlurImage from '../../../UI/BlurImage/BlurImage';

import VideoPlayer from "../../../UI/VideoPlayer/VideoPlayer";
import ModalSimple from "../../../UI/ModalSimple/ModalSimple";
import ImageView from 'react-native-image-viewing';
import {getMediaFullSrc} from "../../../../utils/common";
import {EVENT_TYPES} from "../../../../constants/project";
import EventPostLike from '../../../UI/EventPostLike/EventPostLIke';
import { likePost } from '../../../../api/user/likePost/likePost';
import { unLikePost } from '../../../../api/user/unLikePost/unLikePost';
import {Dictionary} from "../../../../locales/dictionary";
import {Entypo} from '@expo/vector-icons';
import ModalDialog from '../../../UI/ModalDialog/ModalDialog';
import { capitalizeFirstLetter } from '../../../../utils/text';
import { userBlock } from '../../../../api/user/userBlock/userBlock';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/globalStyles';
import { FlatList } from 'react-native-gesture-handler';
import FlatListCarouser from '../../../UI/FlatListCarousel/FlatListCarousel';

interface IEventsListItem {
    data: IEvent;
    onPress: (id: number) => void;
    onAddToFavourite: (id: number) => void;
    onRemoveFromFavourite: (id: number) => void;
    onChangeDataItem?: (item:any) => void;
    touchCansel:(item:any) => void;
};

const PostsListItem: FC<IEventsListItem> = ({
                                                data,
                                                onPress,
                                                onChangeDataItem = (item) => {},
                                                touchCansel,
                                                ... props}) => {

    const [imagesSlider, setImagesSlider] = useState<any>();
    const [media] = useState<IMedia>(getMediaFirst(data.media));
    const backgroundVideo = media.media_type !== undefined && media.media_type === "video" && styles.backVideo;
    const images = imagesSlider == undefined || ''? [getMediaPreviewSrc(media)] : imagesSlider;
//console.log("ARTEST", media);
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState<boolean>(data.isfav ? true:false);
    const [isLike, setIsLike] = useState<boolean>(data.user_like ? true:false);
    const handleAddToFavourite = () => {
        setIsFavourite(true);
        props.onAddToFavourite(data.id);
    };
    const handleRemoveFavourite = () => {
        setIsFavourite(false);
        props.onRemoveFromFavourite(data.id);
    };
    const onFavouriteEventPress = () => {
        if (isFavourite) {
            handleRemoveFavourite();
        } else {
            handleAddToFavourite();
        }
    };
    const onSendComments = async (id:any) => {
        onPress(id)
    }

    const onSendMessage = async () => {
            const response = await addChat({
                chat_user: data.user_id,
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
    }

    const [needCommentsRefresh, setNeedCommentsRefresh] = useState(true);
    const navigateToUser = (id:any) => {
        if(userInfo.user_id == id) {
            // @ts-ignore
            navigation.navigate('BottomTabNavigator', {screen: SCREENS.Profile});
        } else {
            // @ts-ignore
            navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId: id}})
        }
    }


    const [compState, setCompState] = useState<{
        isVideoVisible: boolean,
        isVideoPaused: boolean,
        isImagesViewVisible: boolean,
        images: any[],
    }>({
        isVideoVisible: false,
        isVideoPaused: true,
        isImagesViewVisible: false,
        images: [],
    });

    const openMedia = () => {
        if(media?.id) {
            if (media.is_checked) {
                if (media.media_type == "video") {
                    setCompState({...compState, isVideoVisible: true, isVideoPaused: false});
                } else {
                    let localImages: any[] = [];
                    data.media.forEach(item => {
                        if (item.is_checked && item.media_type == "image") {
                            localImages.push(getMediaFullSrc(item));
                        }
                    });
                    setCompState({...compState, isImagesViewVisible: true, images: localImages});
                }
            } else {
                errorMessage({message: "Файл находится на модерации"})
            }
        }
    }
    useEffect(()=>{
        let localImages: any[] = [];
        data.media.forEach(item => {
            if (item.is_checked && item.media_type == "image") {
                localImages.push(getMediaFullSrc(item));
                setImagesSlider(localImages)
            }

        });

    },[])
    const onLikeUnlikePost = async (id: number | undefined, action: boolean) => {
        const likeResponse = (action) ? await likePost(id): await unLikePost(id);
        if(likeResponse.success) {
            onChangeDataItem({...data, user_like: action});
            return;
        }
        errorMessage({
            message: getTranslateMessage(Dictionary.errors.section, likeResponse.message)
        });
    }

    const userLike = () => {
        return(
            data.last_tree_likes.map((item:any)=>{
                return (
                    <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={()=>{navigateToUser(item.user.id)}}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{width: 55,color:colors.black, fontWeight:'bold', marginLeft: 5}}>{item.user.nickname}</Text>
                        <Text style={{color:colors.black, fontWeight:'bold'}}>,</Text>
                    </TouchableOpacity>
                )
            })
        )
    }

    const [modalDialog, setModalDialog] = useState(false);

    const toggleModalDialog = (force?: any) => {
        if (force != undefined) {
          setModalDialog(force);
          return;
        }
        setModalDialog(!modalDialog);
      }
      const isFocused = useIsFocused();

      useEffect(() => {
        setModalDialog(false);
      }, [isFocused])

      const blockUser = async (id: number, userNickname: any) => {
        const userBlocked = await userBlock(id);
        if(userBlocked.success){
            errorMessage({
                message: translate("user.userBlocked") + " " + userNickname,
            });
            setModalDialog(false)
        } else {
            errorMessage({
                message: userBlocked.message,
            });
            setModalDialog(false)
        }
      }

      const modalDialogItems = useMemo(() => [
        {text:capitalizeFirstLetter(translate('modalButton.claimEvent')),icon:'', action:() => //@ts-ignore
        navigation.navigate('CommonNavigator', {screen: SCREENS.ClaimScreen, params: {eventId: data.id}})},
        {text:capitalizeFirstLetter(translate('modalButton.blockUser')),icon:'', action:() => {blockUser(data.user_id, data.user.nickname)}},
        {text:capitalizeFirstLetter(translate('common.close')), icon: "close", action: () => { toggleModalDialog(false) } }
      ], []);

    return (
        <View
            style={[styles.container, {borderWidth:1}]}>
            <ModalSimple
                compState = {compState}
                isVisible={compState.isVideoVisible}
                toggleModal={() => {} }
                styleModalView={{borderWidth:1, width:"100%", height: "100%"}}
            >
                <VideoPlayer
                media={media}
                onClose={ () => { setCompState({...compState, isVideoVisible: false, isVideoPaused: true}) } }
                isVideoPaused={compState.isVideoPaused}
                />
            </ModalSimple>

            <ModalDialog
                isVisible={modalDialog}
                toggleModal={toggleModalDialog}
                items={modalDialogItems}
            />

            <ImageView
                swipeToCloseEnabled
                animationType="fade"
                images={compState.images}
                imageIndex={0}
                visible={compState.isImagesViewVisible}
                onRequestClose={() => setCompState({...compState, isImagesViewVisible: false})}
            />

        {images.length <= 1?
            <Pressable onPress = {() => openMedia()} onTouchStart={()=>{touchCansel(true)}}>
                <View style={[styles.containerPreviewImg, backgroundVideo]}>
                        <BlurImage
                            resizeMode={"cover"}
                            resizeMethod={"resize"}
                            media={getMediaPreviewSrc(media)}
                            blur={ (media.is_checked === 0) }
                            style={styles.eventImg}
                        />
                    {media.media_type !== undefined && media.media_type === "video" &&
                        <PlayButton/>
                    }
                </View>
            </Pressable>
            :
            <Pressable onTouchStart={()=>touchCansel(false)}>
                <FlatListCarouser
                    data={images}
                    openMedia={()=>openMedia()}
                />
            </Pressable>
        }
            <Pressable onPress = {() => onPress(data.id)}>
                <View style={styles.contentEvent}>
                    <View style={[styles.row, {alignItems:"center", justifyContent:"space-between", marginBottom:5}]}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>

                            {data.type == EVENT_TYPES.POST &&
                                <View style={{justifyContent: "flex-end", marginRight: 10}}>
                                    <EventPostLike
                                        isLiked={data.user_like}
                                        onLike={ () => { onLikeUnlikePost(data.id, true).then() } }
                                        onUnLike={ () => { onLikeUnlikePost(data.id, false).then() } }
                                    />
                                </View>
                            }

                            <TouchableOpacity onPress={() => onSendComments(data.id)}>
                                <Image
                                    source={Icons.postComment}
                                    style={{height:15, width:21}}
                                    resizeMode={"contain"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onSendMessage} style={{marginLeft:10}}>
                                <Image
                                    source={Icons.postMessage}
                                    style={{height:15, width:20}}
                                    resizeMode={"contain"}
                                />
                            </TouchableOpacity>
                        </View>
                        {data.type != EVENT_TYPES.POST?
                            <View style={{justifyContent: "flex-end"}}>
                                <TouchableOpacity onPress={onFavouriteEventPress}>
                                    <Image
                                        source={isFavourite ? activeFavouriteIcon : unActiveFavouriteIcon}
                                        style={styles.favouriteIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => setModalDialog(true)}>
                                <Entypo name="dots-three-horizontal" size={24} color="grey" />
                            </TouchableOpacity>
                        }
                    </View>


                     <View style={[styles.row,{marginBottom:5}]}>
                         <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                             // @ts-ignore
                             navigation.navigate('CommonNavigator', {screen: SCREENS.EventListLikes, params: {eventId: data.id}})
                         }}>
                            <Text style={{color:colors.black, fontWeight: 'bold', marginRight:3}}>
                                Нравится:
                            </Text>

                            <Text style={{color:colors.black, fontWeight: 'bold'}}>{data.like}</Text>
                        </TouchableOpacity>
                    </View>
                    {/*
                        <View style={styles.row}>
                            <Text style={{color:colors.black, fontWeight: 'bold'}}>
                                Нравится:
                            </Text>
                            {userLike()}
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                                // @ts-ignore
                                navigation.navigate('CommonNavigator', {screen: SCREENS.EventListLikes, params: {eventId: data.id}})
                            }}>
                                <Text style={{color:colors.black, fontWeight: 'bold', marginRight: 5}}> ещё</Text>
                                <Text style={{color:colors.black, fontWeight: 'bold'}}>{data.like}</Text>
                            </TouchableOpacity>
                        </View>
                    */}
                    <View style={styles.row}>
                        <Text numberOfLines={2} style={{color:colors.black}}>
                            <Text style={{fontWeight:"bold"}}>{data.user.nickname}</Text>
                            {' '}{data.description}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <CommentsList
                            eventId={data.id}
                            eventDetail={data}
                            needCommentsRefresh={needCommentsRefresh}
                            setNeedCommentsRefresh={setNeedCommentsRefresh}
                            navigateToUser = { navigateToUser }
                            onlyLast={2}
                            showAllText
                            showAddText
                            showTitle={false}
                            navigateToEvent={ () => onPress(data.id) }
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:colors.gray}}>

                        </Text>
                    </View>

                    {/*
                    <View style={[styles.row, styles.topicTextContainer, {alignItems:"center"}]}>
                        <Text style={styles.topicText} numberOfLines={1}>
                            {data.evt_topic}
                        </Text>
                    </View>

                    <View style={[styles.row, styles.addressContainer]}>
                        <Image source={clockIcon} style={styles.iconLeft} />
                        <Text style={styles.detailText} numberOfLines={1}>
                            {datetimeConvert(data.created_at) +
                            ', ' +
                            getTimeFromDate(data.created_at)}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Image source={locationIcon} style={styles.iconLeft} />
                        <Text style={styles.detailText} numberOfLines={1}>
                            {data.evt_address}
                        </Text>
                    </View>
                    */}
                </View>
            </Pressable>
        </View>

    );
};

export default PostsListItem;
