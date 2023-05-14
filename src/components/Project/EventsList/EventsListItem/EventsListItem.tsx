import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Image} from 'react-native';
import {
    activeFavouriteIcon,
    clockIcon,
    defaultEventImg,
    locationIcon,
    unActiveFavouriteIcon,
    clockIconBrown, locationIconBrown
} from '../../../../constants/images';
import {Event, IEvent} from '../../../../types';
import {datetimeConvert, getTimeFromDate} from '../../../../utils/datetime';
import styles from './styles';
import {
    getMediaFirst,
    getMediaFull,
    getMediaFullSrc,
    getMediaPreview,
    getMediaPreviewSrc
} from "../../../../utils/common";
import PlayButton from '../../../UI/PlayButton/PlayButton';
import BlurImage from '../../../UI/BlurImage/BlurImage';

import VideoPlayer from "../../../UI/VideoPlayer/VideoPlayer";
import ModalSimple from "../../../UI/ModalSimple/ModalSimple";
import ImageView from 'react-native-image-viewing';
import { errorMessage } from '../../../../utils/showMessage';

interface IEventsListItem {
    data: IEvent;
    onPress: (id: number) => void;
    onAddToFavourite: (id: number) => void;
    onRemoveFromFavourite: (id: number) => void;
};

const EventsListItem: FC<IEventsListItem> = ({
                                                 data,
                                                 ... props}) => {

    const [isFavourite, setIsFavourite] = useState<boolean>(data.isfav ? true:false);
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

    const media =  getMediaFirst(data.media) ;

    const [compState, setCompState] = useState({
        isVideoVisible: false,
        isVideoPaused: true,
    });

    const openMedia = () => {
        if(media.media_type == "video") {
                if(media.is_checked) {
                    setCompState({...compState, isVideoVisible: true, isVideoPaused: false});
                }
                else {
                    errorMessage({message:"Файл находится на модерации"})
                }
        }
    }

    return (
        <>
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
            <View
                style={styles.container}>
                <TouchableOpacity onPress = {() => (media.media_type == "video")? openMedia(): props.onPress(data.id)} style={styles.containerPreviewImg}>
                        <BlurImage
                            resizeMode={"cover"}
                            media={getMediaPreviewSrc(getMediaFirst(data.media))}
                            blur={ (media.is_checked === 0) }
                            style={styles.eventImg}
                            resizeMethod={undefined}
                        />
                    {media.media_type !== undefined && media.media_type === "video" &&
                        <PlayButton/>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.onPress(data.id)}>
                    <View style={styles.contentEvent}>
                        <View style={[styles.row, styles.topicTextContainer, {alignItems:"center"}]}>
                            <Text style={styles.topicText} numberOfLines={1}>
                                {data.evt_topic}
                            </Text>
                            <TouchableOpacity onPress={onFavouriteEventPress}>
                                <Text style={styles.topicText} numberOfLines={1}>

                                </Text>
                                <Image
                                    source={isFavourite ? activeFavouriteIcon : unActiveFavouriteIcon}
                                    style={styles.favouriteIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, styles.addressContainer]}>
                            <Image source={clockIconBrown} style={styles.iconLeft} />
                            <Text style={styles.detailText} numberOfLines={1}>
                                {datetimeConvert(data.created_at) +
                                ', ' +
                                getTimeFromDate(data.created_at)}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Image source={locationIconBrown} style={styles.iconLeft} />
                            <Text style={styles.detailText} numberOfLines={1}>
                                {data.evt_address}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default EventsListItem;
