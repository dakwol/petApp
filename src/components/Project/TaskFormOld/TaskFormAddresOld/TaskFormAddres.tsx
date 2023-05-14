import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';
import Input from '../../../UI/Input/Input';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Geolocation from '@react-native-community/geolocation';
import { geocodeLocation } from '../../../../utils/geo';
import { add } from 'date-fns';

interface ITaskFormProps {
    taskAddresBack:any,
    placeType:any,
    address:any,
}


const TaskFormAddres :FC<ITaskFormProps> = ({placeType, address, taskAddresBack}) => {
    const geoLocation = useSelector((state: any) => state?.global?.geoLocation);

    const [addres, setAddres] = useState<string>('');
    const [addresComponent, setAddresComponent] = useState("customer");

    placeType(addresComponent);
    address(addres);

    const modifyActiveComponent = useCallback(
        newActiveComponent => {
            setAddresComponent(newActiveComponent);
        },
        [setAddresComponent]
    );


    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });


    const ref = useRef();
    const userLocation = () => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition({
              latitude: crd.latitude,
              longitude: crd.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });
            geocodeLocation(crd).then((resp)=>{
                setAddres(resp.toString())
                //@ts-ignore
                ref?.current?.setAddressText(resp.toString());
            })
          })
         
    }
    const geocoder_google_api = "AIzaSyD0P5SiyDBo9Y8BcXIcTm-j6_pO8S7E3-A";

    useEffect(()=>{
       if(taskAddresBack != undefined) {
         //@ts-ignore
         ref?.current?.setAddressText(taskAddresBack);
         setAddres(taskAddresBack)
       } 
    },[addresComponent])

  return (
      <View style={styles.container}>
        <Text style={styles.titleTask}>{translate('task.newTaskAdres')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
            <TouchableOpacity style={addresComponent == 'customer'? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{[
                    modifyActiveComponent('customer'),
                ]}}>
                <Text style={addresComponent == 'customer'? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskAdresUser')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={addresComponent == 'executor'? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{[
                    modifyActiveComponent('executor'),
                ]}}>
                <Text style={addresComponent == 'executor'? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskAdresExecuter')}</Text>
            </TouchableOpacity>
        </View>
            {addresComponent == 'customer'&&
                <>
                    <Text style={{marginBottom: 10}}>{translate('task.newTaskAdresSubtitle')}</Text>
                    <GooglePlacesAutocomplete
                        //@ts-ignore
                        ref={ref}
                        placeholder='Поиск'
                        onPress={(data, details = null) => {
                            setAddres(data.description);
                            console.log(data)
                        }}
                        query={{
                            key: geocoder_google_api,
                            language: 'ru'
                        }}

                        fetchDetails={true}

                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}

                        styles={{
                            textInput:{
                                borderBottomWidth: 1,
                                borderColor: colors.greenPH,
                            },
                            powered:{
                                display: 'none'
                            },
                            listView:{
                                marginTop: 20,
                            }
                        }}
                        listEmptyComponent={() => (
                            <View style={{flex: 1}}>
                              <Text>{translate('task.newTaskAdressErr')}</Text>
                            </View>
                          )}
                       
                    />
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>{userLocation()}}>
                        <FontAwesome name="location-arrow" size={20} color={colors.greenPH} />
                        <Text style={{fontSize: 17, color: colors.black, marginLeft:10}}>{translate('task.newTaskMyAdress')}</Text>
                    </TouchableOpacity>
                </>
                
            }
      </View>
    )
  }

export default TaskFormAddres;