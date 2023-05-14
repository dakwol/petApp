import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, TextInput, View} from 'react-native';
import {colors} from '../../../constants/Colors';
import {getTranslateMessage, translate} from '../../../utils/translate';
import styles from './styles';
import ButtonSaveEvent from '../ButtonSaveEvent/ButtonSaveEvent';
import {IEventOnFieldChange} from "../EventForm/types";
import {capitalizeFirstLetter} from "../../../utils/text";
import {getPetTypes} from "../../../api/pets/getPetTypes/getPetTypes";
import {getFormData, getMediaForm} from "../../../utils/formData";
import {createPet} from "../../../api/pets/createPet/createPet";
import {showMessage} from "react-native-flash-message";
import {IPetFormProps} from "./types";
import MediaAddList from "../../UI/MediaAddList/MediaAddList";
import {addPetMediaMultiply} from "../../../api/pets/addPetMediaMultiply/addPetMediaMultiply";
import {responseWithBadWords} from "../../../utils/response";
import {Dictionary} from "../../../locales/dictionary";
import DropdownSelect from "../../UI/DropdownSelect/DropdownSelect";
import {errorMessage} from "../../../utils/showMessage";
import {updatePet} from "../../../api/pets/updatePet/updatePet";
import {IMedia, IPet} from "../../../types";

import TextArea from '../../UI/TextArea/TextArea';
import {petMediaDelete} from "../../../api/pets/petMediaDelete";
import {getUserById} from "../../../api/user/getUserById/getUserById";
import {useSelector} from "react-redux";
import {getMediaFirst, getMediaPreviewSrc} from "../../../utils/common";
import {petSexList, petSterList, petOwnList} from "./data";
import AgeFields from "../AgeFields/AgeFields";
import FormLabel from "../../UI/FormLabel/FormLabel";
import { deletePet } from '../../../api/pets/deletePet/deletePet';

const PetForm:FC<IPetFormProps> = ({id = 0, navigation, route }) => {
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const [isUploading, setIsUploading] = useState(false);
    const [petTypesList, setPetTypesList] =  useState<any[]>([]);

    const [formDataFromApi, setFormDataFromApi] = useState<any>();
    //--- Update functions
    const [fieldsData, setFieldsData] = useState({
        type_id: 0,
        age: 0,
        months: 0,
        color: "",
        chip: "",
        description: "",
        images: [],
        address: "",
        contact_details: "",
        sex:0,
        name:'',
        species: '',
        sterilization: 0,
        is_own: ( formDataFromApi?.data?.is_own == undefined)? 0 : formDataFromApi?.data?.is_own
    });
    const [formDataId, setFormDataId] = useState(id);
    const [compState, setCompState] = useState<{medias:IMedia[],oldMedias:IMedia[], isFormLoading: boolean}>({
        medias:[],
        oldMedias: [],
        isFormLoading: (formDataId == 0) ? false: true
    })
    console.log('DANITESt',route.params.type)


    //Получаем данные из API
    const getFormDataFromApi= async ( {onlyMedia = false}) => {
        if(formDataId && formDataId != 0) {
            const userResponse = await getUserById({user_id: userInfo.user_id});
            const petData: IPet[] = userResponse.pets.filter((item: any) => item.id == formDataId);
            const resp = {success: true, data: petData?.[0] ?? {}, onlyMedia};
            setFormDataFromApi(resp);
        }
    }
    console.log('DANTEST',formDataFromApi?.data?.is_own)

    const onChangeMedias = (data:IMedia[]) => {
        setCompState({...compState, medias: data});
    }

    const onOldMediaDelete = async (id:IMedia['id']) => {
        try {
            const response = await petMediaDelete(id);
            if(response.success) {
                showMessage({
                    message: capitalizeFirstLetter(translate(Dictionary.media.deleteSuccess)),
                    type: "success"
                });
                await getFormDataFromApi({onlyMedia:true});
            } else {
                errorMessage({
                    message: capitalizeFirstLetter(getTranslateMessage('errors', response.message)),
                });
            }
        } catch (err) {
            errorMessage({
                message: capitalizeFirstLetter(getTranslateMessage('errors', 'unknownError')),
            });
        }
    }

    //Reaction of Api Data update
    useEffect(() => {
        if(formDataFromApi) {
            let tmpFieldsData = {...fieldsData};
            for (let index in fieldsData) {
                if (formDataFromApi?.data?.[index]) {
                    // @ts-ignore
                    tmpFieldsData[index] = formDataFromApi.data[index]
                }
            }
            if (!formDataFromApi.onlyMedia) { setFieldsData(tmpFieldsData) }
            setCompState({...compState, oldMedias: formDataFromApi?.data?.media ?? [], isFormLoading: false});
        }

    }, [formDataFromApi])

    //Реагируем на изменение ID
    useEffect(() => {
        if(formDataId != 0) {
            setCompState({...compState, isFormLoading: true});
            getFormDataFromApi({}).then();
        }
    }, [formDataId]);

    //Добавляем медиа
    const addMedias = async (id: any, fieldName: "event_id" | "pet_id" ) => {
        if(compState.medias.length > 0) {
            let mediaForm = new FormData();
            mediaForm.append(fieldName, id);
            mediaForm = getMediaForm(mediaForm, compState.medias);
            const response = await addPetMediaMultiply(mediaForm);
            return response;
        } else {
            return {success: true, data:id, message:""}
        }
    }

    const onFieldChange = ({form = 'pet', field, data}:IEventOnFieldChange) => {
        switch (field) {
            case "age": {
                data = parseInt(data);
                if(typeof data !== "number" || isNaN(data)) {
                    data = 0;
                }
                break;
            }
            case "months": {
                data = parseInt(data);

                if(typeof data !== "number" || isNaN(data)) {
                    data = 0;
                } else if (data > 12) {
                    data = 12;
                }
                break;
            }
        }
        let tmpFieldsData = {...fieldsData};
        //@ts-ignore
        tmpFieldsData[field] = data;
        setFieldsData(tmpFieldsData)
    }

    const onSubmitForm = async( ) => {
        setIsUploading(true);
        /*
        if(compState.medias.length + compState.oldMedias.length == 0 ) {
            errorMessage({
                message: translate(Dictionary.errors.noMediaForUpload),
            });
            setIsUploading(false);
            return false;
        }

         */

        const parentResp = (formDataId && formDataId != 0)
            ? await updatePet(getFormData(fieldsData, "object"), formDataId)
            : await createPet(getFormData(fieldsData));

        //const parentResp = await createPet(petFormData);

        responseWithBadWords({
            resp: parentResp,
            messageBadWords: Dictionary.errors.badWords,
            messageError: "errors." + parentResp.message,
            callBackBadWords: () => { setIsUploading(false) },
            callBackError: () => { setIsUploading(false) },
            callBackSuccess: () => {
                addMedias(parentResp.data, "pet_id").then(mediaResp => {
                    if(mediaResp.success) {
                        showMessage({
                            message: translate(Dictionary.pet.saveSuccess),
                            type: "success"
                        });
                        setIsUploading(false);
                        navigation.goBack();
                    } else {
                        setFormDataId(parentResp.data);
                        errorMessage({
                            message: [translate("pet.addError"), translate('errors.' + mediaResp.message)].join('. '),
                        });
                        setIsUploading(false);
                    }
                });
            },
        })
    }

    const onSubmitDelete = async() => {
        setIsUploading(true);
        const response = await deletePet(formDataId);
        if(response.success){
            showMessage({
                message: translate(Dictionary.pet.deleteSuccess),
                type: "success"
            });
            setIsUploading(false);
            navigation.goBack();
        } else {
            errorMessage({
                message: translate("pet.deleteError"),
            });
            setIsUploading(false);
        }
    }

    useEffect( () => {
        getPetTypesList();
        if(formDataId != 0) {
            setCompState({...compState, isFormLoading: true});
            getFormDataFromApi({}).then();
        }
    }, []);

    const getPetTypesList = () => {
        getPetTypes().then( resp => {
            let tmpHash:any = {};
            let tmpList:any[] = [];
            resp.map( (petType:any) => {
                tmpHash[petType.id] = petType;
                tmpList.push({
                    label: translate(`pet.type_${petType.type_name}`),
                    value: petType.id
                });
            });

            setPetTypesList(tmpList);
        });
    }




    return (
        <ScrollView style={[styles.container]}>
            {compState.isFormLoading === true &&
                <ActivityIndicator size={48}/>
            }
            {compState.isFormLoading === false &&
                <>
                    <View style={[styles.formLayout, {marginTop:20}]}>
                        <View style={styles.leftLayout}>
                            <FormLabel text={translate('pet.type_id')}/>
                            <DropdownSelect
                                defaultValue={fieldsData.type_id}
                                data={petTypesList}
                                onSelect={(item: any) => {
                                    onFieldChange({form: 'pet', field: 'type_id', data: item.value})
                                }}
                                placeholder={translate('pet.type_id')}
                                err={false}
                            />
                            <View>
                                <View>
                                    <FormLabel text={translate('pet.sex')}/>
                                    <DropdownSelect
                                        defaultValue={fieldsData.sex}
                                        data={petSexList}
                                        onSelect={(item: any) => {
                                            onFieldChange({form: 'pet', field: 'sex', data: item.value})
                                        }}
                                        placeholder={translate('pet.sex')}
                                        err={false}
                                    />
                                </View>
                                <View>
                                    <FormLabel text={translate('pet.pet')}/>
                                    <DropdownSelect
                                        defaultValue={fieldsData.is_own}
                                        data={petOwnList}
                                        onSelect={(item: any) => {
                                            onFieldChange({form: 'pet', field: 'is_own', data: item.value})
                                        }}
                                        placeholder={translate('pet.pet')}
                                        err={false}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={styles.rightLayout}>
                            <Image
                                source={getMediaPreviewSrc(getMediaFirst(compState.oldMedias))}
                                style={[styles.image, {resizeMode: "contain"}]}/>
                        </View>
                    </View>
                    <View style={[styles.textInputsRow, {flex:1, flexDirection:"column"}]}>
                        <FormLabel text={translate('pet.name')}/>
                        <TextInput
                            value={fieldsData.name}
                            //placeholder={translate('pet.name')}
                            placeholderTextColor={colors.halfCedar}
                            style={[styles.input, {flex: 1}]}
                            onChangeText={(data) => {
                                onFieldChange({form: 'pet', field: 'name', data: data})
                            }}
                        />
                    </View>
                    <View style={styles.textInputsRow}>
                        <AgeFields
                            yearsValue={fieldsData.age}
                            monthsValue={fieldsData.months}
                            onYearsChange={ (value) => { onFieldChange({form: 'pet', field: 'age', data: value})} }
                            onMonthsChange={ (value) => { onFieldChange({form: 'pet', field: 'months', data: value})} }
                        />
                        {/*
                        <View style={{flex:1, flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
                            <View style={{marginLeft:5}}><Text style={{fontWeight:"bold", color:colors.black}}>{capitalizeFirstLetter(translate(Dictionary.common.age))}</Text></View>

                            <View style={{flex:1,flexDirection: "row", alignItems:"center", justifyContent: "flex-end"}}>
                                <TextInput
                                    keyboardType='numeric'
                                    value={fieldsData.age.toString()}
                                    placeholder={capitalizeFirstLetter(translate(Dictionary.common.years))}
                                    placeholderTextColor={colors.halfCedar}
                                    style={[styles.input, {width:50, textAlign:"center"}]}
                                    onChangeText={(data) => {
                                        onFieldChange({form: 'pet', field: 'age', data: data})
                                    }}
                                />
                                <View style={{marginLeft:5}}><Text>{capitalizeFirstLetter(translate(Dictionary.common.years))}</Text></View>
                            </View>

                            <View style={{flex:1,flexDirection: "row", alignItems:"center", justifyContent: "flex-end"}}>
                                <TextInput
                                    keyboardType='numeric'
                                    value={fieldsData.months.toString()}
                                    placeholder={capitalizeFirstLetter(translate(Dictionary.common.months))}
                                    placeholderTextColor={colors.halfCedar}
                                    style={[styles.input, {width:50, textAlign:"center"}]}
                                    onChangeText={(data) => {
                                        onFieldChange({form: 'pet', field: 'months', data: data})
                                    }}
                                />
                                <View style={{marginLeft:5}}><Text>{capitalizeFirstLetter(translate(Dictionary.common.months))}</Text></View>
                            </View>



                        </View>
*/}

                    </View>
                    <View style={styles.textInputsRow}>
                        <View style={{flex: 2, flexDirection: "column", marginRight: 5}}>
                            <FormLabel text={translate('pet.species')}/>
                            <TextInput
                                value={fieldsData.species}
                                //placeholder={translate('pet.species')}
                                placeholderTextColor={colors.halfCedar}
                                style={[styles.input]}
                                onChangeText={(data) => {
                                    onFieldChange({form: 'pet', field: 'species', data: data})
                                }}
                            />
                        </View>
                        <View style={{flex: 2, flexDirection: "column",  marginLeft: 5}}>
                            <FormLabel text={translate('color')}/>
                            <TextInput
                                value={fieldsData.color}
                                //placeholder={translate('color')}
                                placeholderTextColor={colors.halfCedar}
                                style={[styles.input]}
                                onChangeText={(data) => {
                                    onFieldChange({form: 'pet', field: 'color', data: data})
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.textInputsRow}>
                        <View style={{flex: 2, flexDirection: "column", marginRight: 5}}>
                            <FormLabel text={translate('chip')}/>
                            <TextInput
                                value={fieldsData.chip}
                                //placeholder={translate('chip')}
                                placeholderTextColor={colors.halfCedar}
                                style={[styles.input]}
                                onChangeText={(data) => {
                                    onFieldChange({form: 'pet', field: 'chip', data: data})

                                }}
                            />
                        </View>
                        <View style={{flex: 2, flexDirection: "column", marginLeft: 5}}>
                            <FormLabel text={translate('pet.ster')}/>
                            <DropdownSelect
                                defaultValue={fieldsData.sterilization}
                                data={petSterList}
                                onSelect={(item: any) => {
                                    onFieldChange({form: 'pet', field: 'sterilization', data: item.value})
                                }}
                                placeholder={translate('pet.ster')}
                                err={false}
                            />
                        </View>

                    </View>

                    <View style={[styles.bottomLayout, {paddingBottom: 20}]}>
                        <FormLabel text={translate('common.address')}/>
                        <TextArea
                            value={fieldsData.address}
                            //placeholder={capitalizeFirstLetter(translate('common.address'))}
                            onChangeText={(data) => {
                                onFieldChange({ form: 'pet', field: 'address', data: data });
                            } }
                        />
                        <FormLabel text={translate('common.contacts')}/>
                        <TextArea
                            value={fieldsData.contact_details}
                            //placeholder={capitalizeFirstLetter(translate('common.contacts'))}
                            onChangeText={(data) => {
                                onFieldChange({ form: 'pet', field: 'contact_details', data: data });
                            } }
                        />
                        <FormLabel text={capitalizeFirstLetter(translate('description'))}/>
                        <TextArea
                            value={fieldsData.description}
                            //placeholder={capitalizeFirstLetter(translate('description'))}
                            onChangeText={(data) => {
                                onFieldChange({ form: 'pet', field: 'description', data: data });
                            } }
                        />

                        <MediaAddList
                            medias={compState.medias}
                            onChangeMedias={onChangeMedias}
                            onUploadMedias={onSubmitForm}
                            oldMedias={compState.oldMedias}
                            onOldMediaDelete={onOldMediaDelete}
                        />

                        <ButtonSaveEvent
                            onPress={onSubmitForm}
                            buttonText={translate(
                                (formDataId && formDataId != 0)
                                    ? Dictionary.common.buttonUpdate
                                    : Dictionary.common.buttonAdd
                            ).toUpperCase()}
                            style={styles.submitButton}
                            loading={isUploading}
                        />
                        {(formDataId && formDataId != 0) ?
                            <ButtonSaveEvent
                                onPress={onSubmitDelete}
                                buttonText={translate( Dictionary.common.buttonDelete ).toUpperCase()}
                                style={styles.submitButton}
                                loading={isUploading}
                            />
                            :
                            null
                        }
                    </View>
                </>
            }
        </ScrollView>
    );
};
export default PetForm;
