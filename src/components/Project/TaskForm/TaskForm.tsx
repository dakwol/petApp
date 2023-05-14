import { Animated, Dimensions, Easing, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../utils/translate';
import styles from './styles';
import { colors } from '../../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { errorMessage } from '../../../utils/showMessage';
import { taskOptions } from '../../../api/task/taskOptions/taskOptions';
import AppIntroSlider from 'react-native-app-intro-slider';
import TaskFormName from "./TaskFormName/TaskFormName";
import TaskFormPet from './TaskFormPet/TaskFormPet';
import TaskFormDate from './TaskFormDate/TaskFormDate';
import TaskFormAddres from './TaskFormAddres/TaskFormAddres';
import TaskFormPrice from './TaskFormPrice/TaskFormPrice';
import TaskFormDescription from './TaskFormDescription/TaskFormDescription';
import TaskFormPublication from './TaskFormPublication/TaskFormPublication';
import TaskFormOptions from './TaskFormOptions/TaskFormOptions';
import TaskFormTime from './TaskFormTime/TaskFormTime';

interface ITaskFormProps {
    userInfo:any,
    navigation:any
}

export interface ITaskInfo {
    address: string|null,
    categories: [number],
    date: string|null,
    date_interval_from: string|null,
    date_interval_to: string|null,
    date_type: string|null,
    description: string|null,
    name: string|undefined,
    options: [],
    pet_id: number|null,
    place_type: string|null,
    price_from: string|null,
    price_to: string|null,
    service_id: number|null,
    time: string|null,
    time_interval_from: string|null,
    time_interval_to: string|null,
    time_type: string|null,
}

const TaskForm2 :FC<ITaskFormProps> = ({userInfo, navigation}) => {

    const initialTask : ITaskInfo = {
        address: null,
        categories: [1],
        date: null,
        date_interval_from: null,
        date_interval_to: null,
        date_type: null,
        description: null,
        name: undefined,
        options:[],
        pet_id: null,
        place_type: null,
        price_from: null,
        price_to: null,
        service_id: null,
        time: null,
        time_interval_from: null,
        time_interval_to: null,
        time_type: null,
    };

    const [taskInfo, setTaskInfo] = useState<ITaskInfo>(initialTask);

    const [selected, setSelected] = useState(1);

    const [isNext, setIsNext] = useState<boolean>(false);

    useEffect(() => {
        console.log('tss', taskInfo)
    }, [taskInfo])

    const onTaskInfoChange = (updateObj:any) => {
        setTaskInfo({...taskInfo, ...updateObj})
    }


    const [err, setErr] = useState<boolean>(false)

    const slideScreen = (index: number, err: boolean, errMessage: string) => {
        if(err == false){
            setSelected(index);
            //Animated.timing(value, { toValue: back? animate_state.start : animate_state.end, useNativeDriver: true, duration: 400, easing: Easing.ease }).start()
        } else {
            errorMessage({
                message: errMessage,
            });
        }
    }

    const TaskNameAnimate = () => {

        useEffect(()=>{
            taskInfo.name == null? setErr(true) : setErr(false)
        },[])

        return <Animated.View style={[styles.tabContainer]}>
            <TaskFormName
                taskInfo={taskInfo}
                onTaskInfoChange={(item:any)=>onTaskInfoChange(item)}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={()=>{slideScreen(2, err, translate('task.taskErrName'))}}
            >
                <Text style={{color: colors.white}}>{translate('onward')}</Text>
            </TouchableOpacity>
        </Animated.View>

    }

    const TaskPetAnimate = () => {

        useEffect(()=>{
            taskInfo.pet_id == null? setErr(true) : setErr(false)
        },[])

        return <Animated.View style={[styles.tabContainer]}>
         
            <TaskFormPet
                taskInfo={taskInfo}
                userInfo={userInfo}
                onTaskInfoChange={(item: any) => onTaskInfoChange(item)} 
                skipPets={()=>{slideScreen(3, false, '')}}            
            />
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(3, err, translate('task.taskErrPet'))}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(1, false, '')}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    }

    const TaskDateAnimate = () => {

        const [taskDate, setTaskDate] = useState<any>({});
        const [taskTime, setTaskTime] = useState<any>({});

        console.log(taskDate)
        setErr(false)
        /*useEffect(()=>{
            if(taskDate.date_type != 'interval'? taskDate.date != undefined : (taskDate.date_interval_from != undefined && taskDate.date_interval_to != undefined)){
                if(taskTime.time_type != 'interval'? taskTime.time != undefined : (taskTime.time_interval_from != undefined && taskTime.time_interval_to != undefined)){
                    setErr(false)
                } else {
                    setErr(true)
                }
            
            } else {
                setErr(true)
            }
        },[taskDate, taskTime])*/

        return <Animated.View style={styles.tabContainer}>
          
                <ScrollView>
                    <TaskFormDate 
                        taskInfo={taskInfo}
                        onTaskInfoChange={(item: any) => setTaskDate(item)} 
                    />

                    <TaskFormTime
                        taskInfo={taskInfo}
                        onTaskInfoChange={(item: any) => setTaskTime(item)} 
                    />
                </ScrollView>
            
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(4, err, translate('task.taskErrDate')), onTaskInfoChange({
                        'date_interval_from': taskDate.date_interval_from,
                        'date_interval_to': taskDate.date_interval_to,
                        'date_type': taskDate.date_type,
                        'date': taskDate.date,
                        'time': taskTime.time == undefined? undefined : taskTime.time,
                        'time_interval_from': taskTime.time_interval_from == undefined? undefined : taskTime.time_interval_from,
                        'time_interval_to': taskTime.time_interval_to == undefined? undefined : taskTime.time_interval_to,
                        'time_type': taskTime.time_type,
                    })}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(2, false, '')}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    }

    const TaskAddresAnimate = () => {

        useEffect(()=>{
            (taskInfo.address == null)? setErr(true) : setErr(false)
        },[])

        return <Animated.View style={styles.tabContainer}>
          
                <TaskFormAddres 
                taskInfo={taskInfo}
                onTaskInfoChange={(item: any) => onTaskInfoChange(item)} 
                />
            

            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(5, err, translate('task.taskErrAddres'))}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(3, false, '')}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    }

    const TaskPriceAnimate = () => {

        useEffect(()=>{
            if(taskInfo.price_from == null || taskInfo.price_to == null){
                 setErr(true)
            } else if(taskInfo.price_from > taskInfo.price_to) {
                setErr(true)
            } else {
                setErr(false)
            }
        },[])

        return <Animated.View style={styles.tabContainer}>
          
                <TaskFormPrice 
                taskInfo={taskInfo}
                onTaskInfoChange={(item: any) => onTaskInfoChange(item)}
                />
          

            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(6, err, translate('task.taskErrPriceNone'))}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(4, false, '')}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    }

    const TaskOptionsAnimate = () => {

        const [optionArr, setOptionArr] = useState<any>([])
        const [options, setOptions] = useState([])

        useEffect(()=>{
            (taskInfo.options.length == 0)? setErr(true) : setErr(false)
        },[])

        useEffect(()=>{
            taskOptions(1).then(resp=>{
                setOptions(resp.data.options)
            })
        },[])

        let newData = optionArr.reduce((acc:any, curr:any) => {
          let findIndex = acc.findIndex((item:any) => {
            return item.id === curr.id
          })

          if (findIndex === -1) {
            acc.push(curr)
          } else {
            acc[findIndex] = (Object.assign({}, acc[findIndex], curr))

          }

          return acc;
        }, [])



        const _renderItem = ({item, index}: {item: any; index: number}) => {

            return (
                <TaskFormOptions
                    data={{item, index}}
                    optionsInfo={(info: any)=>{setOptionArr([...optionArr, info])}}
                    slideSkip={()=>skipScreen(index, true)}
                    inputText={newData[index]?.input_text_value}
                    taskInfo={taskInfo}
                />
            );
        };

        const _renderNextButton = () => {
            return (
            <View
                style={[styles.btn, {marginHorizontal: -15}]}
            >
                <Text style={{color: colors.white}}>{translate('onward')}</Text>
            </View>
            );
        };

        const _renderPrevButton = () => {
            return (
            <View
                style={[styles.btn, {marginHorizontal: -15}]}
            >
                <Text style={{color: colors.white}}>{translate('back')}</Text>
            </View>
            );
        };

        let slider: AppIntroSlider | undefined;

        const skipScreen = ( index: number, skip: boolean, firstIndex?: number) => {
            if(skip == true){
                if(options.length == (index + 1)){
                    setOptionArr([...optionArr, {id: index, input_text_value: "info"}])
                    slideScreen(7, false, ''), onTaskInfoChange({'options': newData, 'service_id': 1})
                } else {
                    slider?.goToSlide(index + 1, false)
                    setOptionArr([...optionArr, {id: index, input_text_value: `non info${index + 1}`}])
                }
             
            }
            //@ts-ignore
            else if(firstIndex-1 != index){
                        slider?.goToSlide(index - 1 , false)
                        
                    } else if(newData[index] == undefined || newData[index]?.input_text_value?.length < 5){
                        slider?.goToSlide(index, false)
                        
                        errorMessage({
                            message: translate('task.errorLengthOpt'),
                        });
                    }
        }


        return <Animated.View style={{  height: '102%', justifyContent: 'space-between', alignItems: 'center',  }}>

        
            <View style={{height: '102%', width: '100%', paddingHorizontal: 10}}>
                <AppIntroSlider
                    renderItem={_renderItem}
                    data={options}
                    activeDotStyle={{display: 'none'}}
                    dotStyle={{display: 'none'}}
                    showNextButton={true}
                    showDoneButton={true}
                    showSkipButton={true}
                    showPrevButton={true}
                    onDone={()=>{[slideScreen(7, err, translate('task.taskErrOption')), onTaskInfoChange({'options': newData, 'service_id': 1})]}}
                    onSkip={()=>{slideScreen(5, false, '')}}
                    renderNextButton={_renderNextButton}
                    renderPrevButton={_renderPrevButton}
                    renderDoneButton={_renderNextButton}
                    renderSkipButton={_renderPrevButton}
                    onSlideChange={(index:number, lastIndex: number)=>{
                        skipScreen(lastIndex, false, index)
                    }}
                    ref={(ref) => (slider = ref!)}
                />
            </View>
        

        </Animated.View>

    }

    const TaskDescriptionAnimate = () => {
        useEffect(()=>{
            (taskInfo.description == null)? setErr(true) : setErr(false)
        },[])

        return <Animated.View style={styles.tabContainer}>
          
                <TaskFormDescription 
                taskInfo={taskInfo}
                onTaskInfoChange={(item: any) => onTaskInfoChange(item)}
                />
          

            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(8, err, translate('task.taskErrDesc'))}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(6, false, '')}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    }

    const TaskPublicationAnimate = () => {
        return <Animated.View style={styles.tabContainer}>
            
                <TaskFormPublication 
                taskInfo={taskInfo}
                navigation={navigation}
                userInfo={userInfo}
                />

            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen(7, false, '')}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    }


  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={120}>
           <View style={styles.container}>
                {selected === 1 && <TaskNameAnimate/>}
                {selected === 2 && <TaskPetAnimate/>}
                {selected === 3 && <TaskDateAnimate/>}
                {selected === 4 && <TaskAddresAnimate/>}
                {selected === 5 && <TaskPriceAnimate/>}
                {selected === 6 && <TaskOptionsAnimate/>}
                {selected === 7 && <TaskDescriptionAnimate/>}
                {selected === 8 && <TaskPublicationAnimate/>}
           </View>
      </KeyboardAvoidingView>
    )
  }
  

export default TaskForm2;
