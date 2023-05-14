import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import ButtonDelete from "../../../../../components/Project/ButtonDelete/ButtonDelete";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { headerImage, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { translate } from "../../../../../utils/translate";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { errorMessage } from "../../../../../utils/showMessage";
import { getServices } from "../../../../../api/service/getServices/getServices";
import FlatListItemImage from "../../../../../components/Base/FlatListItemImage/FlatListImages";
import UserSpecializationItem from "./UserSpecializationItem/UserSpecializationItem";
import { findByOccupation } from "../../../../../api/service/findByOccupation/findByOccupation";

const UserSpecialization:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);

    const [specialization, setSpecialization] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clickArray, setClickArray] = useState<any>([])

    useEffect(()=>{
        setIsLoading(true)
            findByOccupation(arrInfo.occupations).then((resp)=>{
                console.log(resp.data)
                if(resp.success){
                    
                    setIsLoading(false)
                    let str = resp.data.services.map((item:any) => {
                        return item
                    })
                    setSpecialization(str)
                } else {
                    setIsLoading(false)
                    errorMessage({
                        message: translate("errors.unknownError"),
                    });
                }
                
            })
 
    },[])

    useEffect(()=>{
        setArrInfo({...arrInfo, services: clickArray})
    },[clickArray])


    const renderSpecial = ({item}:any) => {
       return (
        (item != undefined)?
            <>
                
                <UserSpecializationItem 
                    item={item} 
                    clickItem={(item)=>{setClickArray((arr:any)=>[...arr, {...item, price: ''}])}}>
                </UserSpecializationItem>
            </>
            :
            <></>
       )
      }

    const [err, setErr] = useState<boolean>(false);


    const switchScreen = () => {
        if(clickArray != ''){
            setErr(false)
            navigation.navigate('UserSpecializationPrice', {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }

    console.log(clickArray)


    return (
        <KeyboardAvoidingView    
            style={
                [globalStyles.vwFlexOne, 
                    {justifyContent: "space-between", alignItems: "center",  marginTop: 60}
                ]
            } 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={20}
        >
                 <Image source={petHelp} />
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.howUserSpecialization')}</Text>
                    <Text style={{fontSize: 12, width: SCREEN_WIDTH - 50, marginBottom: 10, fontWeight: "bold"}}>{translate('registration.ex_howSpecializationInfo')}</Text>
                    <View>
                        <View style={{ width: SCREEN_WIDTH - 50, height: 250}}>
                        {isLoading?
                            <ActivityIndicator size={38}/>
                            :
                            <FlatList 
                                data={specialization} 
                                renderItem={renderSpecial}
                                contentContainerStyle={{paddingTop: 15}}
                            />
                        }
                        </View>
                     
                    </View>
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
            </KeyboardAvoidingView>
    )
}



export default UserSpecialization;