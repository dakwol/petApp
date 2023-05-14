import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import Stories from "../../../components/UI/Stories/Stories";
import {ActivityIndicator, Animated, Image, Platform} from "react-native";
import {navigateTo, navigateToHome} from "../../../utils/navigate";
import {SCREENS} from "../../../navigation/screenName";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HelpScreen:FC = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const storyMedias = (Platform.OS == 'ios')
        ? [
            'https://petapidev.ratsysdev.com/storage/other_media/i_1.jpg'
        ]
        : [
            'https://petapidev.ratsysdev.com/storage/other_media/a_1.jpg'

        ];

        const preloadTasks = async () => {
            //await AsyncStorage.setItem("showHelp", "on");
            let urlOfImages = storyMedias;
            let preFetchTasks: any[] = [];

            urlOfImages.forEach((p)=>{
                preFetchTasks.push(Image.prefetch(p));
            });

            const resp = await Promise.all(preFetchTasks).then();
            console.log('PREFETCH', resp);

        }

        useEffect(() => {
            preloadTasks().then( () => {
                setIsLoading(false);
            });
        }, [])
    /*
    const storyMediasTest = [
        "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
        "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
        "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
        "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
        "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
    ];
*/
    const onClose = async () => {
        await AsyncStorage.setItem("showHelp", "off");
        navigateTo(navigation, SCREENS.HomeScreen);
    }
    return (
        <ViewScreen keyboardVerticalOffset={0}>
            {isLoading
            ?
                <ActivityIndicator size={48} />
            :
                <Stories
                    visible={true}
                    images={storyMedias}
                    duration={160}
                    onComplete = { onClose }
                />
            }

        </ViewScreen>

    );
};

export default HelpScreen;
