import React, {FC, useEffect, useMemo, useState} from 'react';
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
import ProfileRating from '../../Profile/ProfileRating/ProfileRating';
//@ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import {getTextReviews} from '../../../../../src/utils/text';

interface IServicesListItem {
    data: IEvent;
    onPress: (id: number) => void;
    onAddToFavourite: (id: number) => void;
    onRemoveFromFavourite: (id: number) => void;
    isLoading?: any;
};

const ServicesListItem: FC<IServicesListItem> = ({
                                                 data,
                                                 isLoading,
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


    const dataText = useMemo( () =>
            getTextReviews(data.user.reviews.length)
    ,[data.user.reviews])

    return (
        <>

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
                <TouchableOpacity onPress={() => props.onPress(data.id)} style={styles.container}>

                    <View style={styles.contentEvent}>
                    {isLoading?
                        <View style={[styles.containerPreviewImg, {backgroundColor: colors.greenWhite}]}></View>
                        :
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
                    }
                        <View>
                        {isLoading?
                            <View style={{width: '100%', height: 15, borderRadius: 5, backgroundColor: colors.greenWhite}}></View>
                            :
                            <Text style={styles.topicText}>
                                {data.user.full_name}
                            </Text>
                        }
                        {isLoading?
                            <View style={{width: 100, height: 15, borderRadius: 5, backgroundColor: colors.greenWhite, marginVertical: 5}}></View>
                            :
                            <View style={{flexDirection:"row", alignItems: 'center', marginVertical: 4}}>
                                <Icon name="star" size={15} style={[styles.starFull]}/>
                                <Text style={{fontWeight: 'bold'}}>{data.user.review_rate}</Text>
                                <Text style={{marginLeft: 10, color: colors.gray}}>{dataText}</Text>

                            </View>
                        }
                        {isLoading?
                            <View style={{width: '100%', height: 15, borderRadius: 5, backgroundColor: colors.greenWhite}}></View>
                        :
                            <Text style={styles.textBold}>{data.user.occupations.map( (item: { name: any; }) => item.name).join(', ')}</Text>
                        }
                        </View>
                        <View style={{position: 'absolute', right: 0}}>
                        {isLoading?
                            <View style={{width: '100%', height: 15, borderRadius: 5, backgroundColor: colors.greenWhite}}></View>
                        :
                           <>
                            {data.price_from != null &&
                                <Text  style={styles.topicText}>от {data.price_from} Р</Text>
                            }
                           </>
                        }
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        </>
    );
};

export default ServicesListItem;
