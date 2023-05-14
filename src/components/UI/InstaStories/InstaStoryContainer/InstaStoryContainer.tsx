import React, {useState, useEffect, FC} from "react";
import {
    ActivityIndicator,
    Dimensions,
    NativeTouchEvent,
    StyleSheet,
    View,
    TouchableOpacity, Pressable, Text,
} from "react-native";

import { WebView } from "react-native-webview";
import Modal from "react-native-modalbox";
import GestureRecognizer from "react-native-swipe-gestures";
import Story from "./Story";
import ProgressArray from "./ProgressArray";
import { StoriesType, StoryType } from "../types";
import {AntDesign} from "@expo/vector-icons";
import {colors} from "../../../../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { getUsers } from "../../../../api/user/getUsers/getUsers";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../../navigation/screenName";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
    dataStories: StoriesType;
    onStoryNext: (action:boolean) => void;
    onStoryPrevious: (action: boolean) => void;
    onClose: () => void;
    isNewStory: boolean;
};

const InstaStoryContainer: FC<Props> = (props: Props) => {
    const { dataStories } = props;
    const { stories = [] } = dataStories || {};
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModelOpen, setModel] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [duration, setDuration] = useState(3);
    const story = stories.length ? stories[currentIndex] : {};
    const { isReadMore }: StoryType = story || {};
    const navigation = useNavigation();

    const changeStory = (evt: NativeTouchEvent) => {
        if (evt.locationX > SCREEN_WIDTH / 2) {
            nextStory();
        } else {
            prevStory();
        }
    };

    const nextStory = () => {
        if (stories.length - 1 > currentIndex) {
            setCurrentIndex(currentIndex + 1);
            setLoaded(false);
            setDuration(3);
        } else {
            setCurrentIndex(0);
            props.onStoryNext(false);
        }
    };

    const prevStory = () => {
        if (currentIndex > 0 && stories.length) {
            setCurrentIndex(currentIndex - 1);
            setLoaded(false);
            setDuration(3);
        } else {
            setCurrentIndex(0);
            props.onStoryPrevious(false);
        }
    };

    const onImageLoaded = () => {
        setLoaded(true);
    };

    const onVideoLoaded = (length:any) => {
        setLoaded(true);
        setDuration(length.duration);
    };

    const onPause = (result:any) => {
        setIsPause(result);
    };

    const loading = () => {
        if (!isLoaded) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size={48} color="white" />
                </View>
            );
        }
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const onSwipeDown = () => {
        if (!isModelOpen) {
            props.onClose();
        } else {
            setModel(false);
        }
    };

    const onSwipeUp = () => {
        if (!isModelOpen && isReadMore) {
            setModel(true);
        }
    };

    const renderDescItem = ({item}:any) =>{

        const payload = {
            nickname: item,
        }

        let userId: any;
        

        getUsers(payload).then(resp=>{
            userId = resp?.data?.user[0].id
        })

        return(
            <>
                {item[0]?
                    <TouchableOpacity 
                        onPress={()=>{ 
                            // @ts-ignore
                            navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId: userId}})
                        }} 
                        style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5, 
                            backgroundColor: 'rgba(255, 255, 255, .5);', 
                            borderRadius: 20, 
                            marginTop:5
                        }}>
                        <Text style={{textAlign: "center"}}>{item}</Text>
                    </TouchableOpacity>
                :
                        <View></View>
                }
            </>
        )
    }


    return (
        <GestureRecognizer
            onSwipeDown={onSwipeDown}
            onSwipeUp={onSwipeUp}
            config={config}
            style={styles.container}
        >

            <TouchableOpacity
                activeOpacity={1}
                delayLongPress={500}
                onPress={(e) => changeStory(e.nativeEvent)}
                onLongPress={() => onPause(true)}
                onPressOut={() => onPause(false)}
                style={styles.container}
            >
                <View style={styles.container}>
                    <Story
                        onImageLoaded={onImageLoaded}
                        pause={isPause}
                        isNewStory={false}
                        onVideoLoaded={onVideoLoaded}
                        story={story}
                    />
                    {!isLoaded &&
                        <View style={[styles.loading, {position: "absolute"}]}>
                            <ActivityIndicator size={48} color="white" />
                        </View>
                    }
                    <ProgressArray
                        next={nextStory}
                        isLoaded={isLoaded}
                        duration={duration}
                        pause={isPause}
                        isNewStory={props.isNewStory}
                        stories={stories}
                        currentIndex={currentIndex}
                        currentStory={stories[currentIndex]}
                        length={stories.map((item:any, i:number) => i)}
                        progress={{ id: currentIndex }}
                    />
                    <View style={{position: 'absolute', top: 10, right: 10}}>
                        <Pressable onPress={onSwipeDown} >
                            <AntDesign name="close" size={24} color={colors.white} />
                        </Pressable>
                    </View>
                    <View style={{position: 'absolute', bottom: 10, right: 10}}>
                        <FlatList 
                            data={story.description.split("@")} 
                            renderItem={renderDescItem}
                            style={{flexDirection: "column-reverse"}}                          
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        // paddingTop: 30,
    },
    progressBarArray: {
        flexDirection: "row",
        position: "absolute",
        top: 30,
        width: "98%",
        height: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    userView: {
        flexDirection: "row",
        position: "absolute",
        top: 55,
        width: "98%",
        alignItems: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
        marginLeft: 12,
        color: "white",
    },
    time: {
        fontSize: 12,
        fontWeight: "400",
        marginTop: 3,
        marginLeft: 12,
        color: "white",
    },
    content: { width: "100%", height: "100%" },
    loading: {
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        width: "100%",
        height: "90%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bar: {
        width: 50,
        height: 8,
        backgroundColor: "gray",
        alignSelf: "center",
        borderRadius: 4,
        marginTop: 8,
    },
});

export default InstaStoryContainer;
