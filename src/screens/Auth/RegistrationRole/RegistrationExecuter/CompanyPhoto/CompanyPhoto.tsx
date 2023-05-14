import React, { FC, useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addMedia } from "../../../../../api/user/addMedia/addmedia";
import { getUserById } from "../../../../../api/user/getUserById/getUserById";
import Button from "../../../../../components/UI/Button/Button";
import { colors } from "../../../../../constants/Colors";
import { globalStyles} from "../../../../../constants/globalStyles";
import { addMediaBig, headerImage, petHelp } from "../../../../../constants/images";
import { IMedia, IScreen, IUser } from "../../../../../types";
import { getMediaPreviewSrc } from "../../../../../utils/common";
import { errorMessage } from "../../../../../utils/showMessage";
import * as ImagePicker from 'expo-image-picker';

// @ts-ignore
import * as mime from 'react-native-mime-types';
import { filenameFromUrl } from "../../../../../utils/text";
import { translate } from "../../../../../utils/translate";
import { addEventImage } from "../../../../../api/events/addEeventImage/addEventImage";
import { addEventMediaMultiply } from "../../../../../api/events/addEventMediaMultiply/addEventMediaMultiply";
import { addUserMediaMultiply } from "../../../../../api/user/addUserMediaMultiply/addUserMediaMultiply";
import { signup } from "../../../../../api/user/registration";

interface IProfileState {
    isProfileLoading: boolean,
    formData: {[x:string]: any},
    medias: IMedia[],
    oldMedias: IMedia[],
    userData: IUser | undefined,
    isUploading: boolean
}

const CompanyPhoto:FC<IScreen> = ({navigation, route}) => {

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [uploadFileFoto, setUploadFileFoto] = useState<any>([])


    const pickImageAsync = async() => { 

        
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            quality: 1,
            base64: true,
            width: 200,
            height: 200,
            fileName: true,
            id: true
        });

        setUploadFileFoto(result)
    };


    const uploadImage = () => {
           

    }

    useEffect(()=>{
        setArrInfo({...arrInfo, profile_photo: uploadFileFoto})
    },[uploadFileFoto])

    console.log(arrInfo)


    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(uploadFileFoto != ''){
            setErr(false)
            arrInfo.v_type == 0||1||2? navigation.navigate('UserEndScreen', {infoUser: arrInfo}) : navigation.navigate('UserInfo')
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }
    


    return (
        <SafeAreaView    
            style={[globalStyles.vwFlexOne,{marginTop: 60, justifyContent: "space-between"}]} >
                <Image source={petHelp}/>
                <View style={{marginBottom: 20, width: 250}}>
                    <Text style={{alignSelf: "center", textAlign: "center",fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{
                        arrInfo.v_type == 0||1||2? 
                        translate('registration.uploadPhotoProf')
                        :
                            translate('registration.howCompanyName')
                        }
                    </Text>
                    <Text style={{alignSelf: "center", textAlign: "center",fontSize: 15, color: colors.brown, fontWeight: "bold", marginBottom: 20}}>{
                        arrInfo.v_type == 0||1||2? 
                        translate('registration.uploadPhotoProfText')
                        :
                        translate('registration.howCompanyName')
                    }
                    </Text>
                    <TouchableOpacity onPress={()=>{pickImageAsync()}} style={{alignSelf: "center", justifyContent: "center", alignItems: "center"}}>
                            { uploadFileFoto?.uri? 
                                        <Image source={{uri: uploadFileFoto.uri}}  style={{width: 150, height: 150, borderRadius: 5}}/> 
                                        : 
                                        <Image source={addMediaBig} style={{width: 150, height: 150, resizeMode: "contain"}}></Image>
                            }
                    </TouchableOpacity>
        
                </View>
                <View style={{height: 150}}>
                    <Button 
                        text={translate('common.continue')} 
                        action={()=>{switchScreen()}} 
                    />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}



export default CompanyPhoto;