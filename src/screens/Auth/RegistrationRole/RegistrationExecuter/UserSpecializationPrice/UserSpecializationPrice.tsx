import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { headerImage, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";

const UserSpecializationPrice:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
    const [userSpecializationPrice, setUserSpecializationPrice] = useState<string>('');

    const priceStr = (id: number,value: any) => {
        for(let i = 0; i < arrInfo.services.length; i++){
            if(arrInfo.services[i].id == id){
                arrInfo.services[i].price = value
                setArrInfo({...arrInfo})
                setUserSpecializationPrice(value)
            }
        }
     
    }
    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(userSpecializationPrice != ''){
            setErr(false)
            navigation.navigate('UserAddres', {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }

    


    
    console.log(arrInfo)
    

    const renderSpecial = ({item}:any) => {
        return (
             <>
                 <View style={{marginRight: 5, marginTop: 5, flexDirection: "row"}}>
                     <Text style={{flex: 2/3, borderBottomColor: colors.greenPH, borderBottomWidth: 1, paddingTop: 20, marginRight: 15}}>
                         {item.name}
                     </Text>
                    <View style ={{flex: 1/3}}>
                        <Input onChange={(value: string)=>{[
                            priceStr(item.id, value), setErr(false)
                        ]}} placeHolderText={"стоимость от"}></Input>
                    </View>
                 </View>
             </>
        )
       }

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
                 <Image source={petHelp}  />
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('registration.specializationSale')}</Text>
                    <View style={{height: 250, width: SCREEN_WIDTH - 50}}>
                        <FlatList 
                            data={arrInfo.services} 
                            renderItem={renderSpecial}
                        />
                    </View>
                </View>
                <View style={{height: 150}}>
                    <Button 
                        text={translate('common.continue')} 
                        action={()=>{arrInfo != ''? switchScreen() : ''}} 
                    />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.navigate('UserAddres', {infoUser: arrInfo})}} >
                        <Text style={{fontSize: 15, color:colors.greenPH, fontWeight: "bold"}}>{translate('skip')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}



export default UserSpecializationPrice;