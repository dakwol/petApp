import React, {FC, useEffect, useRef, useState} from "react";
import {IScreen} from "../../types";
import ViewScreen from "../../components/Project/ViewScreen/ViewScreen";
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import ButtonSaveEvent from "../../components/Project/ButtonSaveEvent/ButtonSaveEvent";

const DebugScreen:FC<IScreen> = ({ navigation, route }) => {
    const video = useRef<any>(null);
    const [status, setStatus] = useState<any>(undefined);
    const loadVideo = () => {
        if(video?.current) {
            try {
                //video.current.replayAsync()
                 video?.current?.loadAsync({
                     uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                 });
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    useEffect(() => {
        console.log("ARTEST", video.current);
        video.current.unloadAsync();
    }, [])
    return (
        <ViewScreen>
            <ButtonSaveEvent onPress={ () => {loadVideo()} } buttonText={'Load Video'}/>
            <View style={styles.container}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                />
                <View style={styles.buttons}>
                    <Button
                        title={status?.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                            status?.isPlaying ? video?.current?.pauseAsync() : video?.current?.playAsync()
                        }
                    />
                </View>
            </View>
        </ViewScreen>
    );
};

export default DebugScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
