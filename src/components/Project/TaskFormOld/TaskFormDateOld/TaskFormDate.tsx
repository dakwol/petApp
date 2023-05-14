import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';

import CalendarPeriod from '../../../UI/Calendar/CalendarPeriod';

interface ITaskFormProps {
    taskDateType:any,
    taskDate:any,
    taskDateBack:any,
}


const TaskFormDate :FC<ITaskFormProps> = ({
                                            taskDateType, 
                                            taskDate,
                                            taskDateBack
                                        }) => {

    const [isDate, setIsDate] = useState<any>(new Date());
    const [isDatePeriod, setIsDatePeriod] = useState<any>({});
    

    const [dateComponent, setDateComponent] = useState("exact");

    const modifyActiveComponent = useCallback(
        newActiveComponent => {
            setDateComponent(newActiveComponent);
        },
        [setDateComponent]
    );
    
    taskDateType(dateComponent);
    taskDate(dateComponent == 'exact'? isDate.dateString : isDatePeriod)



    LocaleConfig.locales['ru'] = {
        monthNames: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ],
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        dayNamesShort: ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вc.'],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'ru';


      useEffect(()=>{
        taskDateBack.date == undefined? setIsDate(isDate) : setIsDate({dateString: taskDateBack.date})
      },[])

  return (
      <View>
        <Text style={styles.titleTask}>{translate('task.newTaskDate')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
            <TouchableOpacity style={dateComponent == 'exact'? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{modifyActiveComponent('exact')}}>
                <Text style={dateComponent == 'exact'? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskDateButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dateComponent == 'interval'? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{modifyActiveComponent('interval')}}>
                <Text style={dateComponent == 'interval'? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskDateButtonPeriod')}</Text>
            </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'space-between'}}>
            {dateComponent == 'exact'?
                <Calendar
                    calendarWidth={320}
                    onDayPress={(day:any) => {
                        setIsDate(day)
                    }}
                    onDayLongPress={(day:any) => {
                        setIsDate(day)
                    }}
                    initialDate={isDate.dateString}
                    current={isDate.dateString}
                    theme={{
                        todayTextColor: colors.greenPH,
                        arrowColor: colors.greenPH,
                        selectedDayBackgroundColor: colors.greenPH
                    }}
                />
                :
                <CalendarPeriod datePeriod={(item:any)=>{setIsDatePeriod(item)}} taskDateBack={taskDateBack}/>
            }
        </View>
      </View>
    )
  }

export default TaskFormDate;