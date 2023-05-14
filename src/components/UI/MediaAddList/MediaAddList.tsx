import React, {FC} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import {capitalizeFirstLetter} from "../../../utils/text";
import {translate} from "../../../utils/translate";

import {BorderlessButton} from "react-native-gesture-handler";
import {addMediaBig} from "../../../constants/images";
import {IMedia} from "../../../types";
import {getMediaPreviewSrc} from "../../../utils/common";
import {globalStyles} from "../../../constants/globalStyles";
import {Dictionary} from "../../../locales/dictionary";
import Button from "../Button/Button";
import {styles} from "./styles";
import * as MediaPicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import {errorMessage} from "../../../utils/showMessage";
import {ImagePickerOptions} from "expo-image-picker/src/ImagePicker.types";


interface IButtonAction {
    text: string,
    action: any
}

interface IMediaAddListProps {
    medias: any[],
    onChangeMedias: any,
    onUploadMedias?: () => void,
    oldMedias?: IMedia[],
    //onOldMediaDelete?: (id:number) => Promise<{success:boolean, message: string}>,
    onOldMediaDelete?: (id:IMedia['id']) => void
    buttonRemove?: boolean,
    buttonUpload?: boolean

    buttonAvatar?: boolean
    buttonAvatarAction?: (id:IMedia['id'], indx?: number) => void
    isUploading?: boolean
}

const MediaAddList:FC<IMediaAddListProps> = ({
                                                 medias,
                                                 onChangeMedias,
                                                 onUploadMedias,
                                                 oldMedias= [],
                                                 onOldMediaDelete,
                                                 buttonRemove= true,
                                                 buttonUpload = false,
                                                 buttonAvatar= false,
                                                 buttonAvatarAction,
                                                 isUploading = false,
                                             }) => {
    const onNewDelete = (indx: number) => {
        let tmpData = [...medias];
        tmpData.splice(indx, 1);
        onChangeMedias(tmpData);
    }

    const onNewUpload = () => {
        if(medias.length == 0) {
            errorMessage({
                message: capitalizeFirstLetter(translate(Dictionary.media.noNewMediaForUpload)),
            });
            return;
        }
        if(onUploadMedias) {
            onUploadMedias();
            return;
        }
    }

    const onOldDelete = (id: IMedia['id']) => {
        if(onOldMediaDelete) {
            onOldMediaDelete(id);
        }
    }

    const onItemPress = () => {

    }

    const onChoose = async () => {
        try {
            let perms = MediaPicker.PermissionStatus;
            if(perms.GRANTED != "granted") {
                await MediaPicker.requestMediaLibraryPermissionsAsync();
                perms = MediaPicker.PermissionStatus;
            }
            if(perms.GRANTED != "granted") {
                return false;
            }
            try {
                let mediaPickerOptions:ImagePickerOptions = {
                    mediaTypes: MediaPicker.MediaTypeOptions.All,
                }
                if(Platform.OS == "ios") {
                    mediaPickerOptions.quality = 0;
                }
                let result = await MediaPicker.launchImageLibraryAsync(mediaPickerOptions);
                if(result?.cancelled) {

                }
                else if(result?.type == 'image'){
                    let newMedia:any = {...result, preview: result.uri}
                    onChangeMedias(medias.concat(newMedia));
                }
                else if(result?.duration && result?.duration >= 5000 && result?.type == 'video') {
                    let newMedia:any = {...result, preview: result.uri}
                    if(result?.type == "video") {
                        const { uri } = await VideoThumbnails.getThumbnailAsync(
                            result.uri,
                            {
                                time: result?.duration/2,
                            }
                        );
                        newMedia.preview = uri;
                    }
                    onChangeMedias(medias.concat(newMedia));
                } else {
                    errorMessage({message: translate(Dictionary.errors.mediaTooShort) })
                }
            } catch (err) {
                errorMessage({message: translate(Dictionary.errors.mediaBroken) })
            }
        } catch (err) {
            errorMessage({message: translate(Dictionary.errors.unknownError) })
        }
    }
    return (
        <>
            <View style={{alignContent: "center", alignItems:"center", justifyContent: "center",}}>
                <View>
                    <Text style={globalStyles.bodySectionTitle}>{capitalizeFirstLetter(translate(Dictionary.common.addMedias))}</Text>
                </View>
                <View style={styles.galleryContainer}>
                    <View key={-1} style={{justifyContent: 'center'}}>
                        <TouchableOpacity onPress={onChoose} style={{marginBottom:20}}>
                            <Image style={{ height: 85, width:105, resizeMode:"contain"}} source={addMediaBig} />
                        </TouchableOpacity>
                    </View>
                    {medias && medias.map( (image:any, indx:number) =>
                        <View key={indx} style={{justifyContent: 'center', width:110, height:105}}>
                            <Image style={[styles.image]} source={{uri:image.preview}}/>
                            <BorderlessButton style={{paddingLeft:25}} onPress={ () => { onNewDelete(indx)} }>
                                <Text>{capitalizeFirstLetter(translate("common.delete"))}</Text>
                            </BorderlessButton>
                        </View>
                    )}
                </View>
                {buttonUpload &&
                    <View>
                        <Button loading={isUploading} text={capitalizeFirstLetter(translate(Dictionary.common.upload))} action={onNewUpload}/>
                    </View>
                }

            </View>
            {oldMedias && oldMedias.length > 0 &&
                <View>
                    <View>
                        <Text style={globalStyles.bodySectionTitle}>{capitalizeFirstLetter(translate(Dictionary.profile.medias))}</Text>
                    </View>
                    <View style={styles.galleryContainer}>
                        {oldMedias && oldMedias.length > 0 && oldMedias.map((media: IMedia, indx: number) =>
                            <View key={indx} style={{justifyContent: 'center', width: 110, height: 100}}>
                                <Image style={[styles.image]} resizeMode={"cover"} source={getMediaPreviewSrc(media)}/>
                                <View style={{width: 106, flexDirection: "row", justifyContent: "space-between"}}>
                                    {buttonAvatar && buttonAvatarAction && media.media_type == "image" &&
                                        <BorderlessButton style={{}} onPress={() => {
                                            buttonAvatarAction(media.id, indx)
                                        }}>
                                            <Text>Аватар</Text>
                                        </BorderlessButton>
                                    }
                                    {buttonRemove &&
                                        <BorderlessButton onPress={() => {
                                            onOldDelete(media.id)
                                        }}>
                                            <Text>{capitalizeFirstLetter(translate("common.delete"))}</Text>
                                        </BorderlessButton>
                                    }
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            }
        </>
    );
};

export default MediaAddList;
