import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../constants/Colors";
import {translate} from "../../../utils/translate";
import {IMedia} from "../../../types";
import Video from 'react-native-video';
// @ts-ignore
//import Video from "react-native-video-controls";
import {getMediaFullSrc} from "../../../utils/common";
import {capitalizeFirstLetter} from "../../../utils/text";

interface IVideoPlayer {
    media:IMedia,
    onClose: () => any,
    isVideoPaused: boolean,
}

const VideoPlayer:FC<IVideoPlayer> = ({media, onClose, isVideoPaused, ...props}) => {
    const video = React.useRef(null);
    const uriObject = getMediaFullSrc(media);
    uriObject.overrideFileExtensionAndroid = 'mp4';
    return (
        <View style={{flex: 1,
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.black}}
        >
            <TouchableOpacity
                onPress={ onClose }
                style={{marginTop: 40, marginBottom: 20 }}
            >
                <Text style={{color: colors.white}}>{capitalizeFirstLetter(translate('common.close'))}</Text>
            </TouchableOpacity>
              {/*<Video
                ref={video}
                source={uriObject}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{
                    aspectRatio: 1,
                    width: "100%"
                }}
                //onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            */}
            <Video
                ref={video}
                source={uriObject}
                controls={true}
                resizeMode="contain"
                
                style={{
                    aspectRatio: 1,
                    width: "100%",
                }}
            />
        </View>
    );
};

export default VideoPlayer;
