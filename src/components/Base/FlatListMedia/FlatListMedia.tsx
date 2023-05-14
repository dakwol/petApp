import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import styles from './styles';
// @ts-ignore
import ImageView from 'react-native-image-viewing';
import {getMediaFullSrc, getMediaPreviewSrc} from "../../../utils/common";
import {IMedia} from "../../../types";
import ModalSimple from "../../UI/ModalSimple/ModalSimple";

// @ts-ignore
import Video from 'react-native-video-controls';
import VideoPlayer from "../../UI/VideoPlayer/VideoPlayer";

import PlayButton from "../../UI/PlayButton/PlayButton";
import BlurImage from '../../UI/BlurImage/BlurImage';
import {errorMessage} from "../../../utils/showMessage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { moderation } from '../../../constants/images';
import { AntDesign } from '@expo/vector-icons';
import { SCREENS } from '../../../navigation/screenName';
import { colors } from '../../../constants/Colors';

interface IFlatListMediaProps {
    items: IMedia[];
    onItemPress?: (item: any) => void;
    onUserRole?: number ;
    activeItem?: number;
};

interface IFlatListMediaItem {
    indexForGallery: number,
    media:IMedia
}

interface IFlatListMediaState {
    isImagesViewVisible: boolean,
    isVideoVisible: boolean,
    medias: IMedia[],
    localMedias: IFlatListMediaItem[],
    images: any[],
    currentImage: number,
    currentVideo: number,
    isVideoPaused: boolean,
    mediaIndexToId: any,
}


const FlatListMedia: FC<IFlatListMediaProps> = ({onItemPress, onUserRole ,items,activeItem = 0 }) => {
    const [compState, setCompState] = useState<IFlatListMediaState>({
        isImagesViewVisible: false,
        medias: [],
        localMedias: [],
        images: [],
        currentImage: 0,
        currentVideo: 0,
        isVideoVisible: false,
        isVideoPaused: true,
        mediaIndexToId: {}
    });

    const navigation = useNavigation();

    const prepareMedia = (medias:IMedia[]) => {
        let images: typeof compState.images = [];
        let localMedias: typeof compState.localMedias = [];
        let localIndexToId:any = {};
        medias.map( item => {
            const isImageChecked = (item.is_checked && item.media_type == "image");
            if(isImageChecked) {
                images.push(getMediaFullSrc(item));
                localIndexToId[images.length - 1] = item.id;
            }

            localMedias.push({
                indexForGallery: (isImageChecked) ? images.length - 1:-1,
                media: item
            })
        })
        return {localMedias,images};
    }

    const onPress = (index:number, item:IFlatListMediaItem) => {
        if(item?.media?.id) {
            if (item.media.is_checked) {
                if (item.media.media_type == "video") {
                    setCompState({...compState, isVideoVisible: true, currentVideo: index, isVideoPaused: false});
                } else {
                    setCompState({...compState, isImagesViewVisible: true, currentImage: item.indexForGallery});
                }
            } else {
                errorMessage({message: "Файл находится на модерации"})
            }
        }
        if(onItemPress) {
            onItemPress(item);
        }
    }

    useEffect(() => {
        const preparedMedia = prepareMedia(items);
        setCompState({...compState, medias: items, localMedias: preparedMedia.localMedias, images: preparedMedia.images});
    }, [items])

    /*
    useFocusEffect(
        useCallback(() => {
            const preparedMedia = prepareMedia(items);
            console.log("MEDIA 4", preparedMedia);
            setCompState({...compState, medias: items, localMedias: preparedMedia.localMedias, images: preparedMedia.images});
        }, [items])
    )

     */

    const renderItem = ({item, index}: { item:IFlatListMediaItem, index:number }) => {
        const backgroundVideo = item.media.media_type !== undefined && item.media.media_type === "video" && styles.backVideo;
        const preview = getMediaPreviewSrc(item.media);
        const isMediaChecked = (item.media.is_checked === 0);

        return (
            <TouchableOpacity
                key={index}
                onPress={() => {onPress(index,item)}}
                style={{width: "100%",height: "100%"}}
            >
                <View style={[styles.containerPreviewImg, backgroundVideo]}>
                    <BlurImage
                        resizeMode={"contain"}
                        media={preview}
                        blur={isMediaChecked}
                        style={{width: "100%",height: "100%"}}
                        resizeMethod={undefined}
                    />
                    {item.media.media_type !== undefined && item.media.media_type === "video" &&
                        <PlayButton/>
                    }
                </View>
            </TouchableOpacity>
        );
    };


    const [eventMediaId, setEventMediaId] = useState<number>();

    /*
    useEffect(()=>{
        compState.medias.forEach((el)=>{
            setEventMediaId(el.id)
        });
    })

     */
    useEffect(() => {
        setEventMediaId(compState.mediaIndexToId?.[compState.currentImage])
    }, [compState.currentImage]);


    const navigateToModerationForm = useCallback(() => {
        //@ts-ignore
        navigation.navigate('CommonNavigator', {screen: SCREENS.EventModerationScreen, params: {event_media_id: eventMediaId, screenAction: 'modal'}})
    }, [eventMediaId]);

    const headerModerationItem=(()=>{
        return (
            <View style={(Platform.OS === 'ios')?{position: 'absolute', bottom: 10, right: 10, flexDirection: 'row', alignItems: 'center'}:{position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center'}}>
                {onUserRole == 4 &&
                    <TouchableOpacity  style={{width: 30, height:35, alignItems: 'center', justifyContent: 'center'}}
                                       onPress={()=>{navigateToModerationForm()}}>
                        <Image source={moderation} style={{resizeMode: 'contain', width: 20, height: 20}}></Image>
                    </TouchableOpacity>
                }
                {(Platform.OS === 'ios')?
                    <></>
                :
                    <TouchableOpacity  style={{width: 40, height:40, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 50}}
                                       onPress={()=>{setCompState({...compState, isImagesViewVisible: false})}}>
                        <AntDesign name="close" size={24} color="white"/>
                    </TouchableOpacity>
                }
            </View>
        )
    })


    return (
        <View style={styles.container}>
            <ModalSimple
                compState = {compState}
                isVisible={compState.isVideoVisible}
                toggleModal={() => {} }
                styleModalView={{borderWidth:1, width:"100%", height: "100%"}}
            >
                <VideoPlayer
                    media={compState.localMedias?.[compState.currentVideo]?.media}
                    onClose={ () => { setCompState({...compState, isVideoVisible: false, isVideoPaused: true}) } }
                    isVideoPaused={ compState.isVideoPaused}
                />
            </ModalSimple>

            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={compState.localMedias}
                contentContainerStyle={styles.listContainer}
                renderItem={renderItem}
            />

            {(Platform.OS === 'ios')?
                <ImageView
                    swipeToCloseEnabled
                    animationType="fade"
                    images={compState.images}
                    imageIndex={compState.currentImage}
                    visible={compState.isImagesViewVisible}
                    onImageIndexChange={ (index) => {console.log("ARTEST 11", compState.mediaIndexToId); setEventMediaId(compState.mediaIndexToId?.[index]?.id)} }
                    FooterComponent={headerModerationItem}
                    onRequestClose={() => {setCompState({...compState, isImagesViewVisible: false})}}
                />
                :
                <ImageView
                    swipeToCloseEnabled
                    animationType="fade"
                    images={compState.images}
                    imageIndex={compState.currentImage}
                    visible={compState.isImagesViewVisible}
                    onImageIndexChange={ (index) => {console.log("ARTEST 12", compState.mediaIndexToId); setEventMediaId(compState.mediaIndexToId?.[index]?.id)} }
                    HeaderComponent={headerModerationItem}
                    onRequestClose={() => {}}
                />
            }
            {/*
            <ImageView
                controls={{next:true,prev:true,close:true}}
                swipeToCloseEnabled
                images={compState.images}
                imageIndex={compState.currentImage}
                animationType="fade"
                isVisible={compState.isImagesViewVisible}
                onClose={() => setCompState({...compState, isImagesViewVisible: false}) }
            />
            */}


        </View>
    );
};

export default FlatListMedia;
