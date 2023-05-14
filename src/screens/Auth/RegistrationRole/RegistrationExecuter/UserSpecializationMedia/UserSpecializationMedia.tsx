import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import ImagePicker from "../../../../../components/External/Post/components/picker/ImagePicker";
import PostCreate from "../../../../../components/External/Post/PostCreate";
import ViewScreen from "../../../../../components/Project/ViewScreen/ViewScreen";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { addMediaBig, headerImage, petHelp } from "../../../../../constants/images";
import { SCREENS } from "../../../../../navigation/screenName";
import { IScreen } from "../../../../../types";
import { navigateTo } from "../../../../../utils/navigate";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";

const UserSpecializationMedia:FC<IScreen> = ({navigation, route}) => {

    const [uploadFileFoto, setUploadFileFoto] = useState<any>([])
    const [openMedia, setOpenMedia] = useState<boolean>(false)

   
    const onClose = async () => {
        await AsyncStorage.setItem("showHelp", "off");
        navigateTo(navigation, SCREENS.HomeScreen);
    }

    

    return (
        <>
            {openMedia == false ?
                <KeyboardAvoidingView    
                    style={
                        [globalStyles.vwFlexOne, 
                            {justifyContent: "space-between", alignItems: "center",  marginTop: 60}
                        ]
                    } 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={20}
                >
                    <Image source={petHelp}  />
                    <View style={{marginBottom: 20}}>
                        <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.specializationMediaTitle')}</Text>
                        <Text style={{fontSize: 12, width: SCREEN_WIDTH - 50, marginBottom: 10, fontWeight: "bold", textAlign: "center"}}>{translate('registration.specializationMediaSubtitle')}</Text>
                        <View style={{height: 250, width: SCREEN_WIDTH - 50}}>
                        <TouchableOpacity onPress={()=>{setOpenMedia(!openMedia)}} style={{alignSelf: "center", justifyContent: "center", alignItems: "center"}}>
                            { uploadFileFoto?.uri? 
                                <Image source={{uri: uploadFileFoto.uri}}  style={{width: 150, height: 150, borderRadius: 5}}/> 
                                : 
                                <Image source={addMediaBig} style={{width: 150, height: 150, resizeMode: "contain"}}></Image>
                            }
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: 150}}>
                        <Button 
                            text={translate('common.continue')} 
                            action={()=>{onClose()}} 
                        />
                        
                        <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{onClose()}} >
                            <Text style={{fontSize: 15, color:colors.greenPH, fontWeight: "bold"}}>{translate('skip')}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                :
                <ViewScreen keyboardVerticalOffset={-50}>
                    <View style={{paddingTop: 25, backgroundColor: colors.white, flex: 1}}>
                        <PostCreate
                            navigation = {navigation}
                            route={route}
                            mode={"service"}
                        />
                    </View>
                </ViewScreen>
            }

            
        </>
    )
}



export default UserSpecializationMedia;