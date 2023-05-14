import React, {FC, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View,} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getTranslateMessage, translate} from "../../../utils/translate";
import {colors} from "../../../constants/Colors";
import ButtonSaveEvent from "../../../components/Project/ButtonSaveEvent/ButtonSaveEvent";
import BackButton from "../../../components/UI/BackButton/BackButton";
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import CheckBox from "@react-native-community/checkbox";
import {showMessage} from "react-native-flash-message";
import {createPet} from "../../../api/pets/createPet/createPet";
import {createEvent} from "../../../api/events/createEvent/createEvent";
import {IMapCenterPoint} from "../../../components/MapComponent/types";
import MapComponent from "../../../components/MapComponent/MapComponent";
//import Geocoder from 'react-native-geocoding';
//import { Geocoder } from 'react-native-yamap';
import {
  geocodeLocation,
  geocodeReverse, getGeoLocation,
  locationMap,
  requestLocationPermissions
} from "../../../utils/geo";

import {IEventFormScreen, IEventOnFieldChange} from "../../../components/Project/EventForm/types";
import {
  fieldsSettings,
  FORM_TYPE_ALL,
  FORM_TYPE_EMERGENCY,
  FORM_TYPE_HELP,
  FORM_TYPE_LEISURE,
  FORM_TYPE_PETS,
  FORM_TYPE_PETS_COMMERCIAL,
  FORM_TYPE_SERVICES
} from "../../../components/Project/EventForm/data";
import {getPetTypes} from "../../../api/pets/getPetTypes/getPetTypes";
import {getSubCategories} from "../../../api/categories/getSubCategories/getSubCutegories";
import {addEventMediaMultiply} from "../../../api/events/addEventMediaMultiply/addEventMediaMultiply";
import EventFormEmergency from "./EventFormEmergency/EventFormEmergency";
import MediaAddList from "../../../components/UI/MediaAddList/MediaAddList";
import {fieldsDataDefault, mapCenterDefault, petsListDefault} from "./data";
import {getFormData, getMediaForm} from "../../../utils/formData";
import {responseWithBadWords} from "../../../utils/response";
import {Dictionary} from "../../../locales/dictionary";
import {getUserById} from "../../../api/user/getUserById/getUserById";
import {IEvent, IMedia, IPet} from "../../../types";
import {capitalizeFirstLetter} from "../../../utils/text";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import DropdownSelect from "../../../components/UI/DropdownSelect/DropdownSelect";
import {errorMessage} from "../../../utils/showMessage";
import TextArea from '../../../components/UI/TextArea/TextArea';
import {petOwnList, petSexList, petSterList} from "../../../components/Project/PetForm/data";
import {getEvents} from "../../../api/events/getEvents/getEvents";
import {eventMediaDelete} from "../../../api/events/eventMediaDelete/eventMediaDelete";
import {updateEvent} from "../../../api/events/updateEvent/updateEvent";
import AgeFields from "../../../components/Project/AgeFields/AgeFields";
import {Region} from "react-native-maps";
import TextInp from "../../../components/UI/TextInp/TextInp";
import Checkbox from 'expo-checkbox';

import {setGeoLocation} from "../../../redux/GlobalRedux/actions/actionCreator";

const EventFormScreen: FC<IEventFormScreen> = ({navigation, route}) => {
  const fieldsPetDataDefault = {
    type_id: 0,
    age: 0,
    months: 0,
    color: "",
    chip: "",
    description: "",
    images: [],
    evt_address: "",
    contact_details: "Нет контактов",
    sex: 0,
    name: '',
    species: '',
    sterilization: 0,
    is_own: (route.params.type == "profile")? 0 : 1
}
  const event_id = route?.params?.id ?? 0;
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.session?.userData);
  const location = useSelector((state: any) => state?.global?.location);

  const [isUploading, setIsUploading] = useState(false);

  const categoriesData = useSelector((state: any) => state?.global?.categories ?? []);

  const [isPetList, setIsPetList] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>(FORM_TYPE_ALL);
  const [formFields, setFormFields] = useState<any>({});

  const [categoryValue, setCategoryValue] = useState(0);
  const [categories, setCategories] = useState([]);

  const [subCategoryValue, setSubCategoryValue] = useState(0);
  const [subCategories, setSubCategories] = useState([]);

  const [fieldsData, setFieldsData] = useState<typeof fieldsDataDefault | any>({});
  const [fieldsPetData, setPetFieldsData] = useState({...fieldsPetDataDefault});

  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [userMapLocation, setUserMapLocation] = useState<IMapCenterPoint | undefined>(undefined);

  const [petsData, setPetsData] =  useState<IPet[]>([]);
  const [petList, setPetList] = useState([...petsListDefault]);

  const [petTypesList, setPetTypesList] =  useState<any[]>([]);
  const [petTypesHash, setPetTypesHash] = useState<any>({});

  const [formLatLng, setFormLatLng] = useState<{ evt_lat?: string, evt_long?:string }>({})

  const [err, setErr] = useState<any>(new Set([]));
  const [errPets, setErrPets] = useState<any>(new Set([]));

  const [errorTopic, setErrorTopic] = useState(false);
  const mapRef = React.useRef<any>(null);

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if(fieldsData && Object.keys(fieldsData).length > 0) {
      setShowForm(true);
    }
  }, [fieldsData]);


  const onFieldChange = ({form = 'event', field, data}:IEventOnFieldChange) => {
    let tmpFieldsData = {...fieldsData};
    if(form == 'event') {
      switch (field) {
        case 'category': {

          break;
        }
        case 'price_from':
        case 'price_to': {
          data = parseInt(data);
          if(typeof data !== "number" || isNaN(data)) {
            data = 0;
          }
          break;
        }

        case 'is_emergency': {
          let boolData = data;
          if(typeof data == "boolean") {
            data = (data) ? 1 : 0;
          } else {
            boolData = (data == 1);
          }
          setIsEmergency(boolData);
          break;
        }
        case 'coords': {
          tmpFieldsData.evt_lat = data.evt_lat;
          tmpFieldsData.evt_long = data.evt_long;
          break;
        }

      }
      //@ts-ignore
      tmpFieldsData[field] = data;
      setFieldsData(tmpFieldsData);
    }

    else if(form == 'pet') {
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
      let tmpFieldsData = {...fieldsPetData};
      //@ts-ignore
      tmpFieldsData[field] = data;
      setPetFieldsData(tmpFieldsData)
    }
  }

  //--- Update functions
  const [formDataId, setFormDataId] = useState(event_id);
  const [formDataFromApi, setFormDataFromApi] = useState<any>();
  const [compState, setCompState] = useState<{medias:IMedia[],oldMedias:IMedia[], isFormLoading: boolean}>({
    medias:[],
    oldMedias: [],
    isFormLoading: (!(formDataId == 0 || formDataId == undefined)),
  })

  //Получаем данные из API
  const getFormDataFromApi= async ( {id = 0, onlyMedia = false}) => {
    if(formDataId && formDataId != 0) {
      const response = await getEvents({evt_id: formDataId});
      const data: IEvent = response?.[0];
      const resp = {success: true, data: data, onlyMedia: onlyMedia};
      setFormDataFromApi(resp);
    }
  }

  const onChangeMedias = (data:IMedia[]) => {
    setCompState({...compState, medias: data});
  }

  const onOldMediaDelete = async (id:IMedia['id']) => {
    try {
      const response = await eventMediaDelete(id);
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
      if(formDataFromApi?.data?.category?.main_category_id) {
        setCategoryValue(formDataFromApi?.data?.category?.main_category_id);
      }

      if(formDataFromApi?.data?.category?.sub_category_id) {
        setSubCategoryValue(formDataFromApi?.data?.category?.sub_category_id);
      }

      for (let index in fieldsDataDefault) {
        if (formDataFromApi?.data?.[index] && !formDataFromApi.onlyMedia) {

          if (index != "evt_ctgy_id") {
            // @ts-ignore
            tmpFieldsData[index] = formDataFromApi.data[index];
            //onFieldChange({form: "event", field: index, data: formDataFromApi.data[index]});
          }
        }
      }

      if (!formDataFromApi.onlyMedia) {
        setFieldsData(tmpFieldsData)
      }
      setCompState({...compState, oldMedias: formDataFromApi?.data?.media ?? [], isFormLoading: false});
    }

  }, [formDataFromApi])

  //Реагируем на изменение ID
  useEffect(() => {
    if(formDataId != 0) {
      //setCompState({...compState, isFormLoading: true});
      //getFormDataFromApi({}).then();
    }
  }, [formDataId]);

  //Добавляем медиа
  const addMedias = async (id: any, fieldName: "event_id" | "pet_id" ) => {
    if(compState.medias.length > 0) {
      let mediaForm = new FormData();
      mediaForm.append(fieldName, id);
      mediaForm = getMediaForm(mediaForm, compState.medias);
      return await addEventMediaMultiply(mediaForm);

    } else {
      return {success: true, data:id, message:""}
    }
  }

  //--- End of update functions

  //Old Form
  const addEventPet = async( petData:any ) => {
    const petFormData = getFormData(petData);
    const resp = await createPet(petFormData);

    if(resp.success) {
      showMessage({
        message: translate("pet.addSuccess"),
        type: "success"
      });
      return resp.data;
    } else {
      setErrPets(new Set(resp?.data?.fields ?? []));
      errorMessage({
        message: [translate("pet.addError"), translate('errors.' + resp.message)].join('. '),
      });
      return 0;
    }
  }
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
      setPetTypesHash(tmpHash);
      setPetTypesList(tmpList);
    });
  }
  const getSubCategoriesList = async (id:number) => {
    const resp = await getSubCategories({category_id:id});
    let data: any = [];
    resp.data.forEach((item: any) => {
      data.push({
        label: `${item.name}`,
        value: item.id,
      });
    });
    setSubCategories(data);
  }
  const checkFieldVisibility = (field:any) => {
    return (formFields && formFields[field] !== undefined && formFields[field]);
  }
  const onSubmitForm = async () => {
    setIsUploading(true);

    try {
      // 1. Event Data generate
      const eventData = {
        evt_ctgy_id: (checkFieldVisibility('evt_subctgy_id')) ? subCategoryValue : categoryValue,
        evt_topic: fieldsData?.evt_topic,
        evt_address: fieldsData?.evt_address,
        evt_lat: fieldsData?.evt_lat,
        evt_long: fieldsData?.evt_long,
        evt_images: [],
        description: fieldsData?.description,
        evt_priority: (fieldsData?.is_emergency === 1) ? 3 : 1,
        evt_status: null,
        is_emergency: fieldsData?.is_emergency ?? 0,
        price_from: fieldsData?.price_from,
        price_to: fieldsData?.price_to,
        type: 1
      };

      //Check topic
      if (eventData.evt_topic == "") {
        errorMessage({message: translate(Dictionary.event.topicIsRequiredField)});
        setIsUploading(false);
        setErr(new Set(["evt_topic"]));
        return false;
      }

      //2. Add Pet If Need
      if(checkFieldVisibility('pets')) {
        // @ts-ignore
        eventData.pet_id = fieldsData.pet_id

        if (fieldsData?.pet_id == 0) {
          const petData = {
            ...fieldsPetData,
            address: eventData.evt_address,
            description: fieldsPetData.color,
            sex: fieldsPetData.sex,
            sterilization: fieldsPetData.sterilization,
          }

          const petId = await addEventPet(petData);
          if (petId == 0) {
            setIsUploading(false);
            return false;
          } else {
            let newPetList = [...petList];
            newPetList.push({
              label: `${petTypesHash[petData.type_id]['type_name']} (${petData.description})`,
              value: petId,
              id: petId
            });
            setPetList(newPetList);

            onFieldChange({field: 'pet_id', data: petId})
            setIsPetList(false);
          }
          //@ts-ignore
          eventData.pet_id = petId;
        }
      }

      //4. Add Event
      const parentResp = (formDataId && formDataId != 0)
          ? await updateEvent(getFormData(eventData, "object"), formDataId)
          : await createEvent(getFormData(eventData));

      responseWithBadWords({
        resp: parentResp,
        messageBadWords: Dictionary.errors.badWords,
        messageError: "errors." + parentResp.message,
        callBackBadWords: () => { setIsUploading(false) },
        callBackError: () => {
          setErr(new Set(parentResp?.originResp?.data?.fields ?? []));
          setIsUploading(false)
        },
        callBackSuccess: () => {
          addMedias(parentResp.data, "event_id").then((mediaResp) => {
            if(mediaResp.success) {
              showMessage({
                message: translate(Dictionary.event.saveSuccess),
                type: "success"
              });
              setIsUploading(false);
              navigation.goBack();
            } else {
              setFormDataId(parentResp.data);
              errorMessage({message: getTranslateMessage(Dictionary.errors.section, mediaResp.message)});
              setIsUploading(false);
              //navigation.goBack();
            }
          });
        },

      })

    } catch (error: any) {
      errorMessage({message: translate(Dictionary.errors.unknownError)});
      setIsUploading(false);
    }
  };

  useEffect(() => {
    let data: any = [];
    //const { formTypeProp = false } = route.params;
    if(formType != FORM_TYPE_EMERGENCY) {
      categoriesData.forEach((item: any) => {
        data.push({
          label: item.name,
          value: item.id,
        });
      });
    }

    setCategories(data);
    return () => {};
  }, [categoriesData, formType]);

  //Reaction on change of category or subCategory
  useEffect( () => {
    const { formTypeProp = false } = route.params;
    if(formTypeProp !== FORM_TYPE_EMERGENCY) {
      switch (categoryValue) {
        case 1: {
          if (subCategoryValue != 9) {
            setFormType(FORM_TYPE_PETS);
          } else {
            setFormType(FORM_TYPE_PETS_COMMERCIAL);
          }

          break;
        }
        case 2: {
          setFormType(FORM_TYPE_HELP);
          break;
        }
        case 3: {
          setFormType(FORM_TYPE_SERVICES);
          break;
        }
        case 5: {
          setFormType(FORM_TYPE_LEISURE);
          break;
        }
        default: {
          setFormType(FORM_TYPE_ALL);
          break;
        }
      }
    }
  },[categoryValue, subCategoryValue]);
  useEffect(() => {
    if(categoryValue && categoryValue>0) {
      setSubCategories([]);
      getSubCategoriesList(categoryValue).then( () => {
        if(categoryValue == formDataFromApi?.data?.category?.main_category_id) {
          console.log('FORM TEST: не меняем сабкатегорию')
        } else {
          console.log('FORM TEST: меняем сабкатегорию')
          setSubCategoryValue(0);
        }
      });


    }
  }, [categoryValue])
  useEffect(() => {
    if (petsData.length > 0) {
      let data: any = [];
      data.push({
        label: translate('event.petListPlaceholder'),
        value: 0,
      });
      petsData.forEach((item: any) => {
        const petTypeLocal =  translate(`pet.type_${item.type}`);
        data.push({
          label: `${petTypeLocal} - ${item.name}`,
          value: item.id,
          id: item.id
        });
      });
      setPetList(data);
    }
    return () => {};
  }, [petsData, isPetList]);
  useEffect(() => {

    let data: any = [];
    if(formType == FORM_TYPE_EMERGENCY) {
      onFieldChange({field: 'is_emergency', data: true})
      data.push({
        label: 'Питомцы',
        value: 1,
      });
      data.push({
        label: 'Помощь',
        value: 2,
      });

    } else {
      categoriesData.forEach((item: any) => {
        data.push({
          label: item.name,
          value: item.id,
        });
      });
    }

    setCategories(data);
    // @ts-ignore
    setFormFields(fieldsSettings[formType]);
  }, [formType])

  //--- Map Functions
  const [newAddress, setNewAddress] = useState<string | undefined>( undefined);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [locationFreeze, setLocationFreeze ] = useState(!(formDataId == 0) );
  const geoLocation = useSelector((state: any) => state?.global?.geoLocation);
  const [currentMapLocation, setCurrentMapLocation] = useState({...userMapLocation});

  const checkLatLng = (latLng1:any, latLng2:any) => {
    const latLngK = 100000;
    if(
        Math.trunc(latLng1.longitude*latLngK)  == Math.trunc(latLng2.longitude*latLngK)
        &&  Math.trunc(latLng1.latitude*latLngK) == Math.trunc(latLng2.latitude*latLngK)
        //&&  Math.trunc(latLng1.longitudeDelta*latLngK)  == Math.trunc(latLng2.longitudeDelta*latLngK)
        //&&  Math.trunc(latLng1.latitudeDelta*latLngK) == Math.trunc(latLng2.latitudeDelta*latLngK)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  const getInitialLocation = async (localLocation?:Region) => {
      let tmpLocation: any;
      let geocodeAddress: any[] = [];
      if(localLocation == undefined) {
        tmpLocation = await locationMap(location);
        await getGeoLocation(tmpLocation, (callbackLocation) =>{
          dispatch(setGeoLocation(callbackLocation));
          getInitialLocation(callbackLocation).then();
        });
        return;
      }
      tmpLocation = localLocation;
/*
      tmpLocation = (localLocation) ?? await getGeoLocationExpo(location);

 */
      geocodeAddress = await geocodeLocation(tmpLocation);
      let addressArr:string[] = [];
      geocodeAddress.map(item => {
        if(item && item != "") { addressArr.push(item) }
      });
      const tmpAddress = addressArr.join(', ');
      setNewAddress(tmpAddress);
  }

  const onLocationChangeFromMap = (region:any) => {
    //console.log("FORM TEST: Map Change", region);
    //setUserMapLocation(region);
    const check = checkLatLng(region, {
      latitude:formLatLng.evt_lat,
      longitude:formLatLng.evt_long,
      //latitudeDelta: currentMapLocation?.latitudeDelta ?? mapCenterDefault.latitudeDelta,
      //longitudeDelta: currentMapLocation?.longitudeDelta ?? mapCenterDefault.longitudeDelta,
    });
    setCurrentMapLocation(region);
    if(!check  && !locationFreeze) {
      getInitialLocation(region).then();
    }
  }

  useEffect(() => {
    if(newAddress) {
      onFieldChange({form: "event", field: "evt_address", data: newAddress});
    }
  }, [newAddress])


  useEffect(() => {
    if(fieldsData?.evt_address?.length > 3) {
      geocodeReverse(fieldsData.evt_address)
          .then((resp) => {
            if (resp?.success) {
              setFormLatLng({evt_lat: resp.data.latitude, evt_long: resp.data.longitude});
            }
          })
          .catch(err => {
            console.log("FORM TEST: error geocodeReverse ", err);
          });
    }
  },[fieldsData.evt_address])

  useEffect(() => {
    if(formLatLng.evt_lat && formLatLng.evt_long) {
      const newRegion: Region = {
        latitude: parseFloat(formLatLng.evt_lat),
        longitude: parseFloat(formLatLng.evt_long),
        latitudeDelta: currentMapLocation?.latitudeDelta ?? mapCenterDefault.latitudeDelta,
        longitudeDelta: currentMapLocation?.longitudeDelta ?? mapCenterDefault.longitudeDelta,
      }
      onFieldChange({form: 'event', field: 'coords', data: formLatLng});
      setUserMapLocation(newRegion);
      setShowMap(true);
      setLocationFreeze(false);

      if (mapRef != null && mapRef.current != null && newRegion) {
        mapRef.current.animateToRegion(newRegion);
      }
    }

  },[formLatLng])

  useEffect(() => {
    if(userMapLocation) {
      setShowMap(true);
    }
  }, [userMapLocation])

  //--- End Map Functions

  //initial Reaction
  useEffect( () => {
    const { category_id = 1, formTypeProp = false } = route.params;
    getUserById({user_id: userInfo.user_id}).then((dataUser) => {
      setPetsData(dataUser.pets);
    });
    getPetTypesList();

    if(formDataId != 0) {
      setCompState({...compState, isFormLoading: true})
      getFormDataFromApi({}).then();
    } else {
      setFieldsData({...fieldsDataDefault});
      if(formTypeProp != false) {
        setFormType(formTypeProp);
      } else {
        setCategoryValue(category_id);
      }
      getInitialLocation().then();
    }

  }, []);



  const timerRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    timerRef.current = setTimeout(() => {
      setShowMap(true);
    }, 3000);

    // @ts-ignore
    return () => clearTimeout(timerRef.current);
  }, []);


  return (

      <ViewScreen keyboardVerticalOffset={50}>
        { (compState.isFormLoading === true || showForm === false) &&
            <ActivityIndicator size={48}/>
        }
        {compState.isFormLoading === false && showForm &&
            <>
              <BackButton
                  text={translate('back')}
                  //@ts-ignore
                  action={() => navigation.goBack()}
              />
              <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 20,
                  }}
                  showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                  <View style={[styles.mapSection, {alignItems:"center"}]}>
                    {showMap
                        ?
                        <MapComponent
                            mapRef={mapRef}
                            showCenter
                            forceCenter={true}
                            onPressEvent={() => {
                            }}
                            eventMarkers={[]}
                            MapCenterPoint={userMapLocation}
                            onRegionChangeComplete={(region: any) => onLocationChangeFromMap(region)}
                        />
                        :
                        <>
                          <ActivityIndicator size={48}/>
                        </>
                    }
                  </View>

                  <View style={styles.formContainer}>
                    {formType == FORM_TYPE_EMERGENCY && <EventFormEmergency />}
                    <TextInp
                        value={fieldsData.evt_topic}
                        placeholder={translate('event.topic')}
                        placeholderTextColor={colors.halfCedar}
                        style={[styles.input]}
                        onChangeText={(data) => {
                          onFieldChange({field: 'evt_topic', data: data})
                        }}
                        err={err.has('evt_topic')}
                    />

                    {checkFieldVisibility('evt_ctgy_id') && categories && categories.length > 0 &&
                        <DropdownSelect
                            defaultValue={categoryValue}
                            data={categories}
                            onSelect={(item: any) => {setCategoryValue(item.value)}}
                            placeholder={capitalizeFirstLetter(translate(Dictionary.common.categories))}
                            err={err.has('evt_ctgy_id')}
                        />

                    }

                    {checkFieldVisibility('evt_subctgy_id') &&
                        <View style={{height:50}}>
                          {subCategories && subCategories.length > 0 &&
                              <DropdownSelect
                                  defaultValue={subCategoryValue}
                                  data={subCategories}
                                  onSelect={(item: any) => {setSubCategoryValue(item.value)}}
                                  placeholder={capitalizeFirstLetter(translate(Dictionary.common.subcategories))}
                                  err={err.has('evt_subctgy_id')}
                              />
                          }
                        </View>
                    }

                    {/*checkFieldVisibility('evt_subctgy_id') && subCategories && subCategories.length > 0 &&
                        <DropdownSelect
                            defaultValue={subCategoryValue}
                            data={subCategories}
                            onSelect={(item: any) => {setSubCategoryValue(item.value)}}
                            placeholder={capitalizeFirstLetter(translate(Dictionary.common.subcategories))}
                        />
                    */}
                    <TextInp
                        value={fieldsData.evt_address}
                        placeholder={translate('address')}
                        placeholderTextColor={colors.halfCedar}
                        style={[styles.input]}
                        onChangeText = {( data ) => {onFieldChange({field: 'evt_address', data: data})}}
                        err={err.has('address')}
                    />

                    {checkFieldVisibility('is_emergency') &&
                        <View style={{flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
                          <View>
                            <Checkbox
                                style={{margin: 8, width: 16, height: 16}}
                                value={isEmergency}
                                onValueChange={( value:any ) => {
                                  onFieldChange({field: 'is_emergency', data: value})
                                }}
                                color={isEmergency ? colors.greenPH : undefined}
                            />
                          </View>
                          <Text>{translate('event.emergency')}</Text>
                          <EventFormEmergency showText={false} iconSize={22} />

                        </View>
                    }

                    {checkFieldVisibility('price_from') && checkFieldVisibility('price_to') &&
                        <View style={styles.textInputsRow}>
                          <TextInp
                              value={fieldsData?.price_from?.toString()}
                              placeholder={translate('event.priceFrom')}
                              placeholderTextColor={colors.halfCedar}
                              style={[styles.input, styles.halfInput]}
                              onChangeText={(data) => {
                                onFieldChange({field: 'price_from', data: data})
                              }}
                              err={err.has('price_from')}
                          />
                          <TextInp
                              value={fieldsData?.price_to?.toString()}
                              placeholder={translate('event.priceTo')}
                              placeholderTextColor={colors.halfCedar}
                              style={[styles.input, styles.halfInput]}
                              onChangeText={(data) => {
                                onFieldChange({field: 'price_to', data: data})
                              }}
                              err={err.has('price_to')}
                          />
                        </View>
                    }


                    {checkFieldVisibility('pets') &&
                        <DropdownSelect
                            defaultValue={fieldsData.pet_id}
                            data={petList}
                            onSelect={(item:any) => {onFieldChange({field: 'pet_id', data: item.value})}}
                            placeholder={capitalizeFirstLetter(translate(Dictionary.pet.choosePet))}
                            err={err.has('pet_id')}
                        />
                    }

                    {checkFieldVisibility('pets') && (fieldsData.pet_id === 0) &&

                        <View style={{marginTop: 10}}>

                          <View style={styles.textInputsRow}>
                            <View style={styles.halfInput}>
                              <DropdownSelect
                                  defaultValue={fieldsPetData.type_id}
                                  data={petTypesList}
                                  onSelect={(item: any) => {
                                    onFieldChange({form: 'pet', field: 'type_id', data: item.value})
                                  }}
                                  placeholder={translate('pet.type_id')}
                                  err={errPets.has('type_id')}
                              />
                            </View>
                            <View style={styles.halfInput}>
                              <DropdownSelect
                                  defaultValue={fieldsPetData.sex}
                                  data={petSexList}
                                  onSelect={(item: any) => {onFieldChange({form: 'pet', field: 'sex', data: item.value})}}
                                  placeholder={translate('pet.sex')}
                                  err={errPets.has('sex')}
                              />
                            </View>
                          </View>
                          <View style={styles.halfInput}>
                              <DropdownSelect
                                  defaultValue={fieldsPetData.is_own}
                                  data={petOwnList}
                                  onSelect={(item: any) => {onFieldChange({form: 'is_own', field: 'is_own', data: item.value})}}
                                  placeholder={translate('pet.pet')}
                                  err={errPets.has('is_own')}
                              />
                            </View>
                          <View style={styles.textInputsRow}>
                            {checkFieldVisibility('pet_name') &&
                                <TextInp
                                    value={fieldsPetData.name}
                                    placeholder={translate('pet.name')}
                                    placeholderTextColor={colors.halfCedar}
                                    style={[styles.input, {flex: 1}]}
                                    onChangeText={(data) => {
                                      onFieldChange({form: 'pet', field: 'name', data: data})
                                    }}
                                    err={errPets.has('name')}
                                />
                            }
                          </View>
                          {checkFieldVisibility("pet_age") &&
                              <View style={styles.textInputsRow}>
                                <AgeFields
                                    yearsValue={fieldsPetData.age}
                                    monthsValue={fieldsPetData.months}
                                    onYearsChange={(value) => {
                                      onFieldChange({form: 'pet', field: 'age', data: value})
                                    }}
                                    onMonthsChange={(value) => {
                                      onFieldChange({form: 'pet', field: 'months', data: value})
                                    }}
                                />
                              </View>
                          }
                          <View style={styles.textInputsRow}>
                            {checkFieldVisibility('pet_species') &&
                                <TextInp
                                    value={fieldsPetData.species}
                                    placeholder={translate('pet.species')}
                                    placeholderTextColor={colors.halfCedar}
                                    style={[styles.input, styles.halfInput]}
                                    onChangeText={(data) => {
                                      onFieldChange({form: 'pet', field: 'species', data: data})
                                    }}
                                    err={errPets.has('species')}
                                />
                            }
                            {checkFieldVisibility('pet_color') &&
                                <TextInp
                                    value={fieldsPetData.color}
                                    placeholder={translate('color')}
                                    placeholderTextColor={colors.halfCedar}
                                    style={[styles.input, styles.halfInput]}
                                    onChangeText={(data) => {
                                      onFieldChange({form: 'pet', field: 'color', data: data})
                                    }}
                                    err={errPets.has('color')}
                                />
                            }
                          </View>

                          <View style={styles.textInputsRow}>

                            {checkFieldVisibility('pet_chip') &&
                                <TextInp
                                    value={fieldsPetData.chip}
                                    placeholder={translate('chip')}
                                    placeholderTextColor={colors.halfCedar}
                                    style={[styles.input, styles.halfInput]}
                                    onChangeText={(data) => {
                                      onFieldChange({form: 'pet', field: 'chip', data: data})
                                    }}
                                    err={errPets.has('chip')}
                                />
                            }
                            {checkFieldVisibility('pet_sterilization') &&
                                <View style={[styles.halfInput]}>
                                  <DropdownSelect
                                      defaultValue={fieldsPetData.sterilization}
                                      data={petSterList}
                                      onSelect={(item: any) => {
                                        onFieldChange({form: 'pet', field: 'sterilization', data: item.value})
                                      }}
                                      placeholder={translate('pet.ster')}
                                      err={errPets.has('sterilization')}
                                  />
                                </View>
                            }
                          </View>
                        </View>
                    }

                    {checkFieldVisibility('description') &&
                        <TextArea
                            value={fieldsData.description}

                            placeholder={translate('description')}
                            onChangeText={(data) => {
                              onFieldChange({field: 'description', data: data})
                            }}
                            err={err.has('description')}
                        />
                    }

                    <MediaAddList
                        medias={compState.medias}
                        onChangeMedias={onChangeMedias}
                        oldMedias={compState.oldMedias}
                        onOldMediaDelete={onOldMediaDelete}
                    />

                    <View style={styles.submitButton}>
                      <ButtonSaveEvent
                          onPress={onSubmitForm}
                          buttonText={translate(
                              (formDataId && formDataId != 0)
                                  ? Dictionary.common.buttonUpdate
                                  : Dictionary.common.buttonAdd
                          ).toUpperCase()}
                          loading={isUploading}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </>
        }
      </ViewScreen>
  );
};

export default EventFormScreen;
