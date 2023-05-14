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
const RequisitesVolunter:FC<IScreen> = ({navigation, route}) => {


    const [arrInfo, setArrInfo] = useState(route.params.infoUser);
   
    const [inputText, setInputText] = useState<any>(arrInfo.v_type == 0?
        {
            cardNumber: '',
            accountNumber: '',
            bank: '',
            bik: '',
            corNumber:'',
            innBank:'',
            kppBank:'',
        }
        :
        arrInfo.v_type == 1? 
            {
                ogr: '',
                cardNumber: '',
                accountNumber: '',
                bank: '',
                bik:'',
                corNumber:'',
                innBank: '',
                kppBank:''
            }
            :
            {
                name: '',
                phone: '',
                addres: '',
                ogrn: '',
                inn:''
            }
    );


    useEffect(()=>{
        arrInfo.v_type != 2?
            setArrInfo({...arrInfo, ur_ogrn: inputText.ogr, 
                ur_rekv: "Номер карты:" + inputText.cardNumber + ' ' 
                + 'Номер счёта:' + inputText.accountNumber + ' ' 
                + 'Банк получателя:' + inputText.bank + ' ' 
                + 'БИК:' + inputText.bik + ' ' 
                + 'Кор. Счет:' + inputText.corNumber + ' ' 
                + 'ИНН/КПП:' + inputText.innBank + '/' + inputText.kppBank })
        :
            setArrInfo({...arrInfo, ur_name: inputText.name, phone: inputText.phone, website: inputText.addres, ur_ogrn: inputText.ogrn, ur_inn: inputText.inn})
    },[inputText])

    console.log(arrInfo)


    const [err, setErr] = useState<boolean>(false)
    const switchScreen = () => {
        if(inputText != ''){
            setErr(false)
            navigation.navigate('UploadDocumentsVoluenter', {infoUser: arrInfo})
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
            title: 'Номер карты'
        },
        {
            id: 2,
            title: 'Номер Счета'
        },
        {
            id: 3,
            title: 'Банк Получателя'
        },
        {
            id: 4,
            title: 'БИК'
        },
        {
            id: 5,
            title: 'Кор. счёт'
        },
        {
            id: 6,
            title: 'ИНН банка получателя'
        },
        {
            id: 7,
            title: 'КПП банка получателя'
        },
    ]


    const individual = [
        {
            id: 1,
            title: 'ОГРНИП'
        },
        {
            id: 2,
            title: 'Номер карты'
        },
        {
            id: 3,
            title: 'Номер Счета'
        },
        {
            id: 4,
            title: 'Банк Получателя'
        },
        {
            id: 5,
            title: 'БИК'
        },
        {
            id: 6,
            title: 'Кор. счёт'
        },
        {
            id: 7,
            title: 'ИНН банка получателя'
        },
        {
            id: 8,
            title: 'КПП банка получателя'
        },
    ]

    const legalentity = [
        {
            id: 1,
            title: 'Название организации'
        },
        {
            id: 2,
            title: 'Контактный телефон'
        },
        {
            id: 3,
            title: 'Адрес сайта'
        },
        {
            id: 4,
            title: 'ОГРН'
        },
        {
            id: 5,
            title: 'ИНН'
        },
    ]

    const inputPersoneHandler = (type:any, item: string) =>
    {
        type == 1 && setInputText({ ...inputText, cardNumber: item, });
        type == 2 && setInputText({ ...inputText, accountNumber: item, });
        type == 3 && setInputText({ ...inputText, bank: item, });
        type == 4 && setInputText({ ...inputText, bik: item, });
        type == 5 && setInputText({ ...inputText, corNumber: item, });
        type == 6 && setInputText({ ...inputText, innBank: item, });
        type == 7 && setInputText({ ...inputText, kppBank: item, });
    }

    const inputIndividualHandler = (type:any, item: string) =>
    {
        type == 1 && setInputText({ ...inputText, ogr: item, });
        type == 2 && setInputText({ ...inputText, cardNumber: item, });
        type == 3 && setInputText({ ...inputText, accountNumber: item, });
        type == 4 && setInputText({ ...inputText, bank: item, });
        type == 5 && setInputText({ ...inputText, bik: item, });
        type == 6 && setInputText({ ...inputText, corNumber: item, });
        type == 7 && setInputText({ ...inputText, innBank: item, });
        type == 8 && setInputText({ ...inputText, kppBank: item, });
    }

    const inputUrHandler = (type:any, item: string) =>
    {
        type == 1 && setInputText({ ...inputText, name: item, });
        type == 2 && setInputText({ ...inputText, phone: item, });
        type == 3 && setInputText({ ...inputText, addres: item, });
        type == 4 && setInputText({ ...inputText, ogrn: item, });
        type == 5 && setInputText({ ...inputText, inn: item, });
    }

    const renderPersoneItem = ({item}:any) => (
        <View style={{marginTop: 10}}>
            <Text>{item.title}</Text>
            <Input valueText={inputText} onChange={(value:string) => inputPersoneHandler(item.id, value)} placeHolderText={""}></Input>
        </View>
    
    );

    const renderIndividualItem = ({item}:any) => (
        <View style={{marginTop: 10}}>
            <Text>{item.title}</Text>
            <Input valueText={inputText} onChange={(value:string) => inputIndividualHandler(item.id, value)} placeHolderText={""}></Input>
        </View>
    
    );

    const renderUrItem = ({item}:any) => (

            <View style={{marginTop: 10}}>
                <Text>{item.title}</Text>
                <Input valueText={inputText} onChange={(value:string) => inputUrHandler(item.id, value)} placeHolderText={""}></Input>
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
                                <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginVertical: 20, textAlign: "center"}}>Ввод реквизитов</Text>
                                <Text style={{textAlign: "center"}}>Указанные Вами реквизиты будут размещаться во всех Ваших объявлениях о помощи, для их изменения потребуется обратится в службу поддержки</Text>
                            </View>

                            <FlatList
                                data={arrInfo.v_type == 0? person : arrInfo.v_type == 1? individual : legalentity}
                                renderItem={arrInfo.v_type == 0? renderPersoneItem : arrInfo.v_type == 1? renderIndividualItem : renderUrItem}
                                nestedScrollEnabled
                            />
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



export default RequisitesVolunter;