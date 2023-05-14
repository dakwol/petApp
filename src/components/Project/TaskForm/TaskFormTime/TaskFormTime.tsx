import { Keyboard, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';
//@ts-ignore
import DatePicker from 'react-native-modern-datepicker';
import { Input } from 'react-native-elements';
import MaskInput from 'react-native-mask-input';
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITaskInfo } from '../TaskForm';
interface ITaskFormProps {
    taskInfo:ITaskInfo,
    onTaskInfoChange: (e:any) => void,    
}


const TaskFormTime :FC<ITaskFormProps> = ({
                                        taskInfo,
                                        onTaskInfoChange
                                        }) => {

    const [time, setTime] = useState<any>({});
    const [timeFrom, setTimeFrom] = useState<any>({});
    const [timeTo, setTimeTo] = useState<any>({});
    const [dateComponent, setDateComponent] = useState("exact");


    

    const modifyActiveComponent = useCallback(
        newActiveComponent => {
            setDateComponent(taskInfo.time_type != null? taskInfo.time_type : newActiveComponent)
        },
        [setDateComponent]
    );

    useEffect(()=>{
        taskInfo.time != (null || 'undefined:00') && setTime({masked: taskInfo.time})  
        taskInfo.time_interval_from != undefined && setTimeFrom({masked: taskInfo.time_interval_from})  
        taskInfo.time_interval_to != undefined && setTimeTo({masked: taskInfo.time_interval_to})  

    },[])



    const timing = (masked:string, unmasked?:string, type?: string) => {

        if(Number(masked.substring(0,2)) < 24 && Number(masked.substring(3,5)) <= 59){

            if(dateComponent == 'exact'){
                setTime({masked})
            } else {
                type == 'from'? setTimeFrom({masked, unmasked}) : setTimeTo({masked, unmasked})
            }
            
        }

      
    }

    const receiptTime = () => {
        if(taskInfo.time_type == null? (dateComponent == 'exact') : (taskInfo.time_type == 'exact')){
            time?.masked?.substring(1,2) == ''? 
                setTime( {masked :`0${time.masked.substring(0,1)}:00`}) 
                :
                time?.masked?.substring(3,4) == ''? 
                    setTime( {masked :`${time.masked.substring(0,3)}:00`}) 
                    :
                    time?.masked?.substring(4,5) == ''? 
                        setTime( {masked :`${time.masked.substring(0,3)}0${time.masked.substring(3)}`}) 
                        : 
                        setTime({masked: time.masked})
        } else {
            timeFrom?.masked?.substring(1,2) == ''? 
                setTimeFrom( {masked :`0${timeFrom.masked.substring(0,1)}:00`}) 
                :
                timeFrom?.masked?.substring(3,4) == ''? 
                    setTimeFrom( {masked :`${timeFrom.masked.substring(0,3)}:00`}) 
                    :
                    timeFrom?.masked?.substring(4,5) == ''?
                        setTimeFrom( {masked :`${timeFrom.masked.substring(0,3)}0${timeFrom.masked.substring(3)}`}) 
                        :  
                        setTimeFrom({masked: timeFrom.masked})

            timeTo?.masked?.substring(1,2) == ''? 
                setTimeTo( {masked :`0${timeTo.masked.substring(0,1)}:00`}) 
                :
                timeTo?.masked?.substring(3,4) == ''? 
                    setTimeTo( {masked :`${timeTo.masked.substring(0,3)}:00`}) 
                    :
                    timeTo?.masked?.substring(4,5) == ''?
                        setTimeTo({masked :`${timeTo.masked.substring(0,3)}0${timeTo.masked.substring(3)}`}) 
                        :  
                        setTimeTo({masked: timeTo.masked})
        }
                
    }

    useEffect(()=>{
        contTiming()
    },[time, timeFrom, timeTo])

    const contTiming = () => {
        onTaskInfoChange(

            (taskInfo.time_type == null? (dateComponent == 'exact') : (taskInfo.time_type == 'exact'))? 
            {'time_type': 'exact', 'time': time.masked == undefined? undefined : time.masked + ':00'}
            :
            {   'time_type': 'interval',
                'time_interval_from': timeFrom.masked == undefined? undefined : timeFrom.masked + ':00',
                'time_interval_to':  timeTo.masked == undefined? undefined : timeTo.masked + ':00'
            }
        )
    }

  return (
      <View>
        <Text style={styles.titleTask}>{translate('task.newTaskTime')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
            <TouchableOpacity style={(taskInfo.time_type == null? (dateComponent == 'exact') : (taskInfo.time_type == 'exact'))? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{modifyActiveComponent('exact'), setTimeFrom({masked: null}), setTimeTo({masked: null})}}>
                <Text style={(taskInfo.time_type == null? (dateComponent == 'exact') : (taskInfo.time_type == 'exact'))? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskTimeExact')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(taskInfo.time_type == null? (dateComponent == 'interval') : (taskInfo.time_type == 'interval'))? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{modifyActiveComponent('interval'), setTime({masked: null})}}>
                <Text style={(taskInfo.time_type == null? (dateComponent == 'interval') : (taskInfo.time_type == 'interval'))? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskTimeInterval')}</Text>
            </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'space-between'}}>
            {(dateComponent == 'exact')?
                    <MaskInput
                        value={time.masked}
                        style={{width: 100, alignSelf: "center", fontSize:30, borderBottomWidth: 1, borderBottomColor: colors.greenPH, textAlign: 'center'}}
                        onChangeText={(masked) => {
                            timing(masked)
                        }}
                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                        keyboardType="number-pad"
                        onBlur={()=>{receiptTime()}}
                    />
                :
                <View style={{flexDirection: 'row', alignSelf: 'center', width: 210, justifyContent: 'space-between', alignItems: 'center'}}>
                     
                   <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <MaskInput
                            value={timeFrom.masked}
                            style={{width: 100, alignSelf: "center", fontSize:30, borderBottomWidth: 1, borderBottomColor: colors.greenPH, textAlign: 'center'}}
                            onChangeText={(masked, unmasked) => {
                                timing(masked, unmasked, 'from')
                            }}
                            mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                            keyboardType="number-pad"
                            onBlur={()=>{receiptTime()}}
                        />
                        <Text>От</Text>
                   </View>
                     
                   <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <MaskInput
                            value={timeTo.masked}
                            style={{width: 100, alignSelf: "center", fontSize:30, borderBottomWidth: 1, borderBottomColor: colors.greenPH, textAlign: 'center'}}
                            onChangeText={(masked, unmasked) => {
                                timing(masked, unmasked, 'to')
                            }}
                            mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                            keyboardType="number-pad"
                            onBlur={()=>{receiptTime()}}
                        />
                        <Text>До</Text>
                   </View>
                </View>
            }
            
        </View>
      </View>
    )
  }

export default TaskFormTime;