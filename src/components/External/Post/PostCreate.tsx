/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, {FC, useEffect, useState} from 'react';
import {
    LogBox, Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet, View,
} from 'react-native';

import Loading from "../Post/components/Loading";

import NavigationBar from "../Post/components/navigationbar";
import ImagePicker from "../Post/components/picker/ImagePicker";
import { STATUS_BAR_HEIGHT } from "./constants/dimensions";
import { useCreatorActions } from "./hooks/useCreatorActions";
import { ProcessedImage } from "./types";
import { onHandleGalleryPermission } from "./utils/permissions";
import { wait } from "./utils/utils";
import {getTranslateMessage, translate} from "../../../utils/translate";
import BackButton from "../../UI/BackButton/BackButton";
import {IPostFormProps} from "../../Project/PostForm/types";
import { addServiceMedia } from '../../../api/serviceMedia/addServiceMedia/addServiceMedia';

// @ts-ignore
import * as mime from 'react-native-mime-types';
import { errorMessage } from '../../../utils/showMessage';
import { capitalizeFirstLetter } from '../../../utils/text';

LogBox.ignoreLogs(['LogBox.js:154 Easing was renamed to EasingNode in Reanimated 2. Please use EasingNode instead']);
LogBox.ignoreAllLogs();

interface IPostCreateProps {
    mode?: "post" | "stories" | "service",
    navigation: any,
    route?: any,
}

const PostCreate:FC<IPostCreateProps> = ({mode = "post", navigation, route}) => {
    const [isGalleryVisible, setIsGalleryVisible] = useState<boolean>(false);
    const [willGoToNextStep, setWillGoToNextStep] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { uploadPost } = useCreatorActions(mode);

    useEffect(() => {
        checkPermission();
    }, []);

    useEffect(() => {
        if (processedImages.length > 0) {
            onStartUpload(processedImages, description);
        }
    }, [processedImages]);

    const checkPermission = async () => {
        await onHandleGalleryPermission(setIsGalleryVisible)
    }

    const onPressPublish = () => {
        setWillGoToNextStep(true);
    }

    const onStartUpload = async (postImages: ProcessedImage[], details: string) => {
        setLoading(true);
        //await wait(2000);

            await uploadPost(postImages, details);
        setLoading(false);
        setWillGoToNextStep(false);
        navigation.goBack();
    }
    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>
                {
                    loading && <Loading />
                }
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                <View style={{position: 'absolute', left: 0, zIndex: 998, marginTop: (Platform.OS === "ios" ? 6 : 0)}}>
                    <BackButton
                        text={translate('back')}
                        action={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
                <NavigationBar rightTitle={translate('common.publish')} rightCallback={onPressPublish} />
                {
                    //bug on iOs => blank screen if uncomment, add only for Android?
                    isGalleryVisible && (
                        <ImagePicker
                            willGoToNextStep={willGoToNextStep}
                            onProcessImages={setProcessedImages}
                            description={description}
                            onChangeDescription={setDescription}
                            videoCompressConfig={{
                                endTime: 60,
                                quality: "high",
                            }}
                            mode={mode=="stories"?"stories":"post"}
                        />
                    )
                }
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUS_BAR_HEIGHT,
        backgroundColor: 'white'
    }
});

export default PostCreate;
