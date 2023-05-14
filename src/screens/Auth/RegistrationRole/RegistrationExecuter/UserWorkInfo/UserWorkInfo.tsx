import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { car, computer, headerImage, home, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { translate } from "../../../../../utils/translate";
import styles from "./styles";
import ToggleButton from "../../../../../components/UI/ToggleButton/ToggleButton";
import { IServicesMnemo } from "../../../../../api/user/types";
import CheckBox from "@react-native-community/checkbox";
import UserRegionItem from "./UserRegionItem/UserRegionItem";
import { findRegion } from "../../../../../api/region/findRegion/findRegion";
import { errorMessage } from "../../../../../utils/showMessage";


const UserWorkInfo:FC<IScreen> = ({navigation, route}) => {

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [clickArray, setClickArray] = useState<any>([]);
    const [region, setRegion] = useState<any>();
    const [checkBox, setCheckBox] = useState<boolean>(false);

  
    const [servicesSetting, setServicesSetting] = useState({
        remote: false,
        hosting: false,
        going: false,
    });


    useEffect(()=>{
        setIsLoading(true)
            findRegion().then((resp)=>{
                if(resp.success){
                    console.log('TTT',resp)
                    setIsLoading(false)
                    let str = resp.data.regions.map((item:any) => {
                        return item
                    })
                    setRegion(str)
                } else {
                    setIsLoading(false)
                    errorMessage({
                        message: translate("errors.unknownError"),
                    });
                }
                
            })
 
    },[])
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onChangeNotify = async (field:IServicesMnemo, value:boolean) => {

        const realValue = value ? false : true;
        const apiValue = value ? 0 : 1;
        let tmpNotifSettings = {...servicesSetting};
        //@ts-ignore
        tmpNotifSettings[field] = realValue;
        setServicesSetting(tmpNotifSettings);
       
    }
    console.log(arrInfo)

    useEffect(()=>{
        setArrInfo({...arrInfo,  is_remote_service: servicesSetting.remote? 1 : 0, is_home_service: servicesSetting.hosting? 1 : 0})
    },[servicesSetting, clickArray])

    const renderSpecial = ({item}:any) => {
        return (
        (item.name != arrInfo.ur_address.split(',')[0])?
             <>
                 <UserRegionItem
                     item={item} 
                     clickItem={(item)=>{setClickArray((arr:any)=>[...arr, {...item}])}}>
                 </UserRegionItem>
             </>
             :
             <></>
        )
    }

    console.log('TEST',region)



    return (
        <SafeAreaView style={[globalStyles.vwFlexOne, {justifyContent: "space-between", marginTop: 60}]}>
                 <Image source={petHelp}/>
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginVertical: 20}}>{translate('registration.howWorkAddres')}</Text>
                    <View style={{width: SCREEN_WIDTH - 50}}>
                        <View style={styles.containerSwitch}>
                            
                            <Image source={computer} style={styles.icon}/>
                            <ToggleButton
                                    onToggle={(value) => onChangeNotify("remote", value)}
                                    text={translate("registration.workRemotely")}
                                    value={servicesSetting.remote!}
                                />
                        </View>
                        <View style={styles.containerSwitch}>
                            <Image source={home} style={styles.icon}/>
                            <ToggleButton
                                    onToggle={(value) => onChangeNotify("hosting", value)}
                                    text={translate("registration.hosting")}
                                    value={servicesSetting.hosting!}
                                />
                        </View>
                        <View style={styles.containerSwitch}>
                            <Image source={car} style={styles.icon}/>
                            <ToggleButton
                                    onToggle={(value) => onChangeNotify("going", value)}
                                    text={translate("registration.goingClient")}
                                    value={servicesSetting.going!}
                            />
                        </View>
                        {servicesSetting.going && 
                            <View style={{marginLeft: 25}}>
                                {isLoading?
                                    <ActivityIndicator size={38}/>
                                        :

                                        <ScrollView style={{height: 100}}>
                                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                                    {Platform.OS === 'ios' ? (
                                                        <CheckBox
                                                            boxType="square"
                                                            value={!checkBox}
                                                            onChange={() =>  [setCheckBox(!checkBox)]}
                                                            onCheckColor={colors.greenPH}
                                                            onAnimationType={'fill'}
                                                            style={{transform: [{scale: .8}]}}
                                                        />
                                                        ) : (
                                                        <CheckBox
                                                            value={!checkBox}
                                                            onValueChange={()=> [ setCheckBox(!checkBox)]}
                                                            tintColors={{true: colors.greenPH}}
                                                        />
                                                    )}
                                                        <Text>{arrInfo.ur_address.split(',')[0]}</Text>
                                                </View>
                                                
                                                <FlatList 
                                                    data={region} 
                                                    renderItem={renderSpecial}
                                                />
                                        </ScrollView>
                                    }
                            </View>
                        }
                    </View>
                </View>
                <View style={{height: 150}}>
                    <Button 
                        text={translate('common.continue')} 
                        action={()=>{ navigation.navigate('CompanyPhoto', {infoUser: arrInfo})}} 
                    />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}



export default UserWorkInfo;