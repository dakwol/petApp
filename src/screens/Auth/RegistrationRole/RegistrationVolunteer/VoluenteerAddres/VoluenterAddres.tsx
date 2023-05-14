
import CheckBox from "@react-native-community/checkbox";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../../constants/globalStyles";
import { headerImage, petHelp } from "../../../../../constants/images";
import { IScreen } from "../../../../../types";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";
const VoluenterAddres:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
   
    const [inputText, setInputText] = useState<any>(
        {
            ur_address: '',
            ur_factaddress: '',
        }
    )

    const [checkBox, setCheckBox] = useState(false)


    useEffect(()=>{
        setArrInfo({...arrInfo, 
            ur_address: inputText.ur_address, 
            ur_factaddress: inputText.ur_factaddress
        })
    },[inputText, checkBox])


    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(inputText != ''){
            setErr(false)
            navigation.navigate('CompanyPhoto', {infoUser: arrInfo})
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_fields_are_empty"),
            });
        }
       
    }

    const person = [
        {
            id: 1,
            title: 'Юридический адрес'
        },
        {
            id: 2,
            title: 'Фактический адрес'
        },
    ]

    const checActive = () => { 
        setInputText({...inputText, ur_factaddress: inputText.ur_address})   
        setCheckBox(!checkBox)  
    }

    console.log(inputText)
    const inputPersoneHandler = (type:any, item: string) =>
    {
        type == 1 && setInputText({ ...inputText, ur_address: item, });
        type == 2 && setInputText({ ...inputText, ur_factaddress: item, });
    }

    const renderPersoneItem = ({item}:any) => (
        <View style={{marginTop: 10}}>
            <Text>{item.title}</Text>
            <Input valueText={inputText} onChange={(value:string) => inputPersoneHandler(item.id, value)} placeHolderText={""}></Input>
        </View>
    );


    return (
        <SafeAreaView 
            style={
                [globalStyles.vwFlexOne]
            } 
        >

                <ScrollView>
                    <View style={{marginVertical: 60, alignItems: "center"}}>
                        <Image source={headerImage}/>
                        <View style={{width: 250, alignSelf: "center", marginBottom: 20,}}>
                                <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginVertical: 20, textAlign: "center"}}>Ввод реквизитов: Адрес</Text>
                                <Text style={{textAlign: "center"}}>Указанные Вами реквизиты будут размещаться во всех Ваших объявлениях о помощи, для их изменения потребуется обратится в службу поддержки</Text>
                            </View>

                            <FlatList
                                data={person}
                                renderItem={renderPersoneItem}
                                nestedScrollEnabled
                            />
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    {Platform.OS === 'ios' ? (
                                        <CheckBox
                                            boxType="square"
                                            value={checkBox}
                                            onChange={() => checActive()}
                                        />
                                        ) : (
                                        <CheckBox
                                            value={checkBox}
                                            onValueChange={()=>checActive()}
                                        />
                                    )}
                                    <Text>Совпадает с юридическим</Text>
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



export default VoluenterAddres;