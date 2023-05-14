import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addMedia } from "../../../../../api/user/addMedia/addmedia";
import * as ImagePicker from 'expo-image-picker';
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { addMediaBig, headerImage, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";

const UploadDocumentsVoluenter:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [uploadFileFoto, setUploadFileFoto] = useState<any>([])
    const [numberPassport, setNumberPassport] = useState<string>('')





    console.log(arrInfo)

    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(arrInfo.v_type == 2){
            
            if(uploadFileFoto != ''){
                setErr(false)
                navigation.navigate('UserDescriptionActivity', {infoUser: arrInfo})
            } else {
                setErr(true)
                errorMessage({
                    message: translate("errors.The_fields_are_empty"),
                });
            }
        } else {
            if((numberPassport != '') && uploadFileFoto != ''){
                setErr(false)
                navigation.navigate('UserDescriptionActivity', {infoUser: arrInfo})
            } else {
                setErr(true)
                errorMessage({
                    message: translate("errors.The_fields_are_empty"),
                });
            }
        }
       
    }

    const pickImageAsync = async(type: number) => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            quality: 1,
            base64: true,
            width: 200,
            height: 200,
            fileName: true,
            id: true
        });


        if(uploadFileFoto.length < 2) {
            setUploadFileFoto((uploadFileFoto:any) => [...uploadFileFoto, result])
        } else {
            type == 0 ? setUploadFileFoto((uploadFileFoto:any) => {
                const newState = [...uploadFileFoto]
                newState[0] = result
                return newState
            }) : setUploadFileFoto((uploadFileFoto:any) => {
                const newState = [...uploadFileFoto]
                newState[1] = result
                return newState
            })
        }
    };

    useEffect(()=>{
        setArrInfo({...arrInfo, ur_passport: numberPassport, verify_photos: uploadFileFoto})
    },[numberPassport, uploadFileFoto])

    return (
        <SafeAreaView 
            style={
                [globalStyles.vwFlexOne]
            } 
        >
                <ScrollView>
                
                    <View style={{marginVertical: 30, alignItems: "center", justifyContent: "space-between", height: SCREEN_HEIGHT-100}}>
                        <Image source={headerImage}/>
                        <View style={{alignSelf: "center", paddingHorizontal: 10}}>
                                <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginVertical: 20, textAlign: "center"}}>
                                    {arrInfo.v_type != 2
                                        ?
                                        translate('auth.uploadPassport')
                                        :
                                        translate('auth.uploadDocs')
                                    }
                                </Text>
                                <Text>
                                    {arrInfo.v_type != 2
                                        ?
                                            arrInfo.role != '1'?
                                            translate('auth.uploadPassportText')
                                            :
                                            translate('auth.uploadDocsText')
                                        :
                                        translate('auth.uploadDocsText')
                                    }
                                </Text>
                        </View>
                        {arrInfo.v_type != 2?
                                    <View style={{marginVertical: 20}}>
                                        <Text>{translate('auth.numberPassport')}</Text>
                                        <Input valueText={numberPassport} onChange={(value:string) => setNumberPassport(value)} placeHolderText={""}></Input>
                                    </View>
                            :
                            <></>
                        }
                        
                        <View style={{flexDirection: 'row'}}>
                            <View style={{ alignSelf: "center", marginHorizontal: 20, justifyContent: "space-between"}}>
                              
                                <TouchableOpacity onPress={()=>{pickImageAsync(0)}}>
                                    { uploadFileFoto[0]?.uri? 
                                        <Image source={{uri: uploadFileFoto[0].uri}}  style={{width: 100, height: 100, borderRadius: 5}}/> 
                                        : 
                                        <Image source={addMediaBig} style={{width: 100, height: 100, resizeMode: "contain"}}></Image>
                                    }
                                </TouchableOpacity>

                                <Text style={{fontSize: 10, width: 100, textAlign: "center", marginTop: 10}}>{arrInfo.v_type != 2? 'Разворот с фотографией' : 'ОГРН'}</Text>
                            </View>
                            <View style={{alignSelf: "center", marginHorizontal: 20, justifyContent: "space-between"}}>
                                
                                <TouchableOpacity onPress={()=>{pickImageAsync(1)}} >
                                    { uploadFileFoto[1]?.uri? 
                                        <Image source={{uri: uploadFileFoto[1].uri}}  style={{width: 100, height: 100, borderRadius: 5}}/> 
                                        : 
                                        <Image source={addMediaBig} style={{width: 100, height: 100, resizeMode: "contain"}}></Image>
                                    }
                                </TouchableOpacity>
                                <Text style={{fontSize: 10, width: 100, textAlign: "center", marginTop: 10}}>{arrInfo.v_type != 2? 'Разворот с адресом регистрации' : 'ИНН'}</Text>
                            </View>
                        </View>
                        
                        <View style={{marginTop: 20}}>
                            <Button text={translate('common.continue')} action={()=>{switchScreen()}} />
                            <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                                <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}



export default UploadDocumentsVoluenter;