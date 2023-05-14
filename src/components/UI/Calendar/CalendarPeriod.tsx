import React, { FC, useEffect } from "react";
import { useState } from "react";
import { Calendar, Calendar as CalendarWix } from "react-native-calendars";
import type { DateData } from "react-native-calendars";
import { addDays, format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { colors } from "../../../constants/Colors";
import localStorage from "redux-persist/es/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITaskInfo } from "../../Project/TaskForm/TaskForm";
interface ITaskFormProps{
  taskInfo:ITaskInfo,
  datePeriod: (e:any)=>void,    
}

const CalendarPeriod: FC<ITaskFormProps> = ({datePeriod, taskInfo}) => {
  const [markedDates, setMarkedDates] = useState<any>(new Date());

  const [date, setDate] = useState<any>([markedDates])
  const [dateMax, setDateMax] = useState<any>([])

  let maxDate:number;
  let minDate:number;


  let dateMaxMin: any[] = [];

 

  useEffect(() => {

    if(date.hasOwnProperty(markedDates.dateString)){
      Object.keys(date).map((item:any)=>{

        if((markedDates.dateString) > item){
          setDate({[markedDates.dateString]:  {startingDay: false, endingDay: true, color: colors.greenPH,
            textColor: "white",
            borderRadius: 50}})
        } else {
          setDate({[markedDates.dateString]:  {startingDay: true, endingDay: false, color: colors.greenPH,
            textColor: "white",
            borderRadius: 50}})
        }
      })
    } else {

      Object.keys(date).map((item:any)=>{
      
        if((markedDates.dateString) > item){
          setDate({...date, [markedDates.dateString]: {startingDay: false, endingDay: true, color: colors.greenPH,
            textColor: "white",
            borderRadius: 50},})


            
        } else {
            setDate({[markedDates.dateString]: {startingDay: true, endingDay: false, color: colors.greenPH,
              textColor: "white",
              borderRadius: 50},})
        }
      })
    }
  }, [markedDates])



  useEffect(() => {

    const arr2 = [...Object.keys(date)].map((item:any) => Number(item.replace(/-/g, '')));
    maxDate = Math.max(...arr2);
    minDate = Math.min(...arr2);


    let maxItemDate = (JSON.stringify(maxDate).split('', 4).join('') + '-' + JSON.stringify(maxDate).slice(4,6) + '-' + JSON.stringify(maxDate).slice(6))
    let minItemDate = (JSON.stringify(minDate).split('', 4).join('') + '-' + JSON.stringify(minDate).slice(4,6) + '-' + JSON.stringify(minDate).slice(6))

    let dataD = {}



    for(let i = minDate; i < maxDate; i++){
      let itemDate = (JSON.stringify(i).split('', 4).join('') + '-' + JSON.stringify(i).slice(4,6) + '-' + JSON.stringify(i).slice(6))
      //@ts-ignore
      dataD[itemDate] = {color: colors.greenWhite,textColor: colors.greenPH,}
    }
    //@ts-ignore
    dataD[minItemDate] = {startingDay: true, endingDay: false, color: colors.greenPH,
      textColor: "white",
      borderRadius: 50}
    //@ts-ignore
    dataD[maxItemDate] = {startingDay: false, endingDay: true, color: colors.greenPH,
      textColor: "white",
      borderRadius: 50}

    setDateMax(dataD)

    datePeriod({'date_interval_from':minItemDate, 'date_interval_to': maxItemDate})
  }, [date,markedDates])

   
  const [load, setLoad] = useState(false)
  useEffect(()=>{
    if(taskInfo.date_interval_to != null){
      if(load == false){
        setMarkedDates({dateString: taskInfo.date_interval_from})
        setLoad(true)
      } else {
        setMarkedDates({dateString: taskInfo.date_interval_to})
      }
       
    }
  },[load])

 


  return (

    <Calendar
        markingType="period"
        markedDates={dateMax}
        onDayPress={(day:any) => {
          setMarkedDates(day)
          console.log('DAY', day)
          datePeriod({'date_interval_from':day.dateString})
        }}
        initialDate={taskInfo.date_interval_to == null? markedDates.dateString : taskInfo.date_interval_to}
        theme={{
          todayTextColor: colors.greenPH,
          arrowColor: colors.greenPH,
          selectedDayBackgroundColor: colors.greenPH
        }}
    />
  );
};

export default CalendarPeriod;
