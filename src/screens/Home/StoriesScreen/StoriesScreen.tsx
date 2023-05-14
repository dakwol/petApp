import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";

import {ActivityIndicator, Animated, Image, Platform} from "react-native";
import {navigateTo, navigateToHome} from "../../../utils/navigate";
import {SCREENS} from "../../../navigation/screenName";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserStories } from '../../../api/user/getUserStories/getUserStories';
import {IMedia, IScreen} from "../../../types";
import Stories from "react-native-stories-media";
import InstaStory from "../../../components/UI/InstaStories/InstaStory";


const StoriesScreen:FC<IScreen> = (
    {

        route
    }
) => {

    const [isLoading, setIsLoading] = useState(true);
    const [stories, setStories] = useState<any>([])
    const [storyId, setStoryId] = useState(0);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        const {id = 0} = route?.params ?? {};
        setStoryId(id);
        getStories(id).then();
    }, [isFocused]);

    const getStories = async (id:number) => {
        getUserStories(id).then((storiesResp) => {

            let newStories: any[] = [];
            //const tmpStory = storiesResp?.data?.find(item => item.id == id);
            console.log("ARTEST stories", storiesResp);
            storiesResp.data.map(itemStory =>
                itemStory?.medias?.map((storyMedia: IMedia) => {
                    const tmpStory = {
                        id: storyMedia.id,
                        url: storyMedia.full,
                        type: storyMedia.media_type,
                        duration: 20,
                        isReadMore: false,
                        description:storyMedia.description
                    }
                    newStories.push(tmpStory);
                })
            )

            setStories(newStories);
            setIsLoading(false);
        });
    }


    const onClose = async () => {
        navigation.goBack();
    }
    return (
        <ViewScreen keyboardVerticalOffset={0}>
            {isLoading
            ?
                <ActivityIndicator size={48} />
            :
                <InstaStory
                    isModalOpen = {true}
                    title = {""}
                    stories={stories}
                    onClose={ onClose }
                />
                /*
                <Stories
                    visible={true}
                    images={infoStories}
                    duration={20}
                    onComplete = { onClose }
                />

                 */
            }
        </ViewScreen>

    );
};

export default StoriesScreen;
