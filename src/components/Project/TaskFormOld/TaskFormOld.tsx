import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../utils/translate';
import { Dictionary } from '../../../locales/dictionary';
import styles from './styles';
import Input from '../../UI/Input/Input';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../api/user/getUserById/getUserById';
import { getServices } from '../../../api/service/getServices/getServices';
import DropdownSelect from '../../UI/DropdownSelect/DropdownSelect';
import { colors } from '../../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TaskFormPet from './TaskFormPet/TaskFormPet';
import TaskFormName from './TaskFormName/TaskFormName';
import TaskFormDate from './TaskFormDate/TaskFormDate';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/globalStyles';
import { errorMessage } from '../../../utils/showMessage';
import TaskFormTime from './TaskFormTime/TaskFormTime';
import TaskFormAddres from './TaskFormAddres/TaskFormAddres';
import TaskFormPrice from './TaskFormPrice/TaskFormPrice';
import { taskCreate } from '../../../api/task/taskCreate/taskCreate';
import TaskFormDescription from './TaskFormDescription/TaskFormDescription';
import TaskFormPublication from './TaskFormPublication/TaskFormPublication';
import { taskOptions } from '../../../api/task/taskOptions/taskOptions';
import TaskFormOptions from './TaskFormOptions/TaskFormOptions';
import AppIntroSlider from 'react-native-app-intro-slider';

interface ITaskFormProps {
    userInfo:any,
    navigation:any
}


const TaskForm :FC<ITaskFormProps> = ({userInfo, navigation}) => {

    const [activeComponent, setActiveComponent] = useState("taskName");
    const [isBack, setIsBack] = useState<boolean>(true);

    const modifyActiveComponent = useCallback(
        newActiveComponent => {
            setActiveComponent(newActiveComponent);
        },
        [setActiveComponent]
    );

    const [taskInfo, setTaskInfo] = useState<any>({});


    const [optionsScreen, setOptionsScreen] = useState([])

    const TaskNameAnimate = () => {
        const { onPress, opacity, translateX } = useAnimateItemStyle()
        useEffect(()=>{
            onPress()
        },[])
        const [taskName, setTaskName] = useState<any>();

        const slideScreen = () => {
            if(taskName != undefined){
                modifyActiveComponent("taskPet");
                setTaskInfo({...taskInfo, service_id: taskName.id, name: taskName.name})
                setIsBack(true);
            } else {
                errorMessage({
                    message: translate('task.taskErrName'),
                });
            }
        }


        return <Animated.View style={{marginHorizontal: 75, opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center' }}>
            <TaskFormName userInfo={taskInfo.name} back={isBack} name={(item:any)=>setTaskName(item)}></TaskFormName>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=>{slideScreen()}}
            >
                <Text style={{color: colors.white}}>{translate('onward')}</Text>
            </TouchableOpacity>
        </Animated.View>
    }


    const TaskPetAnimate = () => {
        const { onPress, opacity, translateX } = useAnimateItemStyle()

        useEffect(()=>{
            onPress()
        },[])

        const [taskPet, setTaskPet] = useState<number>();

        const slideScreen = () => {
            if(taskPet != null){
                modifyActiveComponent("taskDate");
                setTaskInfo({...taskInfo, pet_id: taskPet})
                setIsBack(true);
            } else {
                errorMessage({
                    message: translate('task.taskErrPet'),
                });
            }
        }
        return <Animated.View style={{marginHorizontal: 75, opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>
            <TaskFormPet
                userInfo={userInfo}
                taskPet={taskInfo.pet_id}
                skipPets={()=>{[modifyActiveComponent("taskDate"), setTaskInfo({...taskInfo, pet_id: null}), setIsBack(true)]}}
                petId={(item:number)=>{setTaskPet(item)}}
                navigation={navigation}
            />
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[slideScreen()]}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[modifyActiveComponent("taskName"), setIsBack(false)]}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }

    const TaskDateAnimate = () => {
        const { onPress, opacity, translateX } = useAnimateItemStyle()

        useEffect(()=>{
            onPress()
        },[])

        const [taskDate, setTaskDate] = useState<any>({});
        const [taskDateType, setTaskDateType] = useState(null);

        const [time, setTime] = useState<any>();
        const [timeType, setTimeType] = useState(null);
        const [timeFrom, setTimeFrom] = useState<any>();
        const [timeTo, setTimeTo] = useState<any>();

        const slideScreen = () => {
            if((taskDate != undefined)){
                if(timeType != 'interval'? time != 'undefined:00' : (timeFrom != 'undefined:00' && timeTo != 'undefined:00')){
                    modifyActiveComponent("taskAddres");
                    setTaskInfo({...taskInfo,time : time, time_interval_from: timeFrom, time_interval_to: timeTo, time_type: timeType, date_type : taskDateType, date_interval_from: taskDate?.Date_interval_from, date_interval_to: taskDate?.Date_interval_to, date: taskDateType == 'interval'? null :  taskDate})
                    setIsBack(true);
                } else {
                    errorMessage({
                        message: translate('task.taskErrTime'),
                    });
                }
            
            } else {
                errorMessage({
                    message: translate('task.taskErrDate'),
                });
            }
        }


        return <Animated.View style={{ opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>
            <ScrollView>
                <TaskFormDate
                    taskDateType={(item:any)=>{setTaskDateType(item)}}
                    taskDate={(item:any)=>{setTaskDate(item)}}
                    taskDateBack={taskInfo}
                />

                <TaskFormTime
                    timeTask={(item:any)=>{setTime(item)}}
                    timeFromTask={(item:any)=>{setTimeFrom(item)}}
                    timeToTask={(item:any)=>{setTimeTo(item)}}
                    timeToType={(item:any)=>{setTimeType(item)}}
                    taskTimeBack={taskInfo}
                />
            </ScrollView>

            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen()}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[modifyActiveComponent("taskPet"), setIsBack(false)]}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }



    const TaskAddresAnimate = () => {
        const { onPress, opacity, translateX } = useAnimateItemStyle()
        useEffect(()=>{
            onPress()
        },[])

        const [placeType, setPlaceType] = useState(null);
        const [address, setAddress] = useState<any>(null);

        const slideScreen = () => {
            if(placeType == 'executor'){
                modifyActiveComponent("taskPrice");
                setTaskInfo({...taskInfo, place_type : placeType, address: translate('task.addressExec') })
                setIsBack(true);
            } else if (address != '') {
                modifyActiveComponent("taskPrice");
                setTaskInfo({...taskInfo, place_type : placeType, address: address})
                setIsBack(true);
            } else {
                errorMessage({
                    message: translate('task.taskErrAddres'),
                });
            }
        }

        return <Animated.View style={{marginHorizontal: 75, opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>
            <TaskFormAddres
                taskAddresBack={taskInfo.address}
                placeType={(item:any)=>{setPlaceType(item)}}
                address={(item:any)=>{setAddress(item)}}
            />
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen()}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[modifyActiveComponent("taskDate"), setIsBack(false), setTaskInfo({...taskInfo, place_type : '', address: ''})]}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }

    const TaskPriceAnimate = () => {

        const { onPress, opacity, translateX } = useAnimateItemStyle()
        const [isPriceFrom, setPriceFrom] = useState(null);
        const [isPriceTo, setPriceTo] = useState(null);

        const [options, setOptions] = useState([])


        useEffect(()=>{
            onPress()
        },[])

        useEffect(()=>{
            taskOptions(1).then(resp=>{
                setOptions(resp.data.options)
            })
        },[])

        const slideScreen = () => {

            if((isPriceFrom != '') && (isPriceTo != '')){
                if(Number(isPriceFrom) < Number(isPriceTo)){
                    modifyActiveComponent("taskOptions");
                    setTaskInfo({...taskInfo, price_from : isPriceFrom, price_to: isPriceTo})
                    setOptionsScreen(options)
                    setIsBack(true);
                } else {
                    errorMessage({
                        message: translate('task.taskErrPrice'),
                    });
                }
            } else {
                errorMessage({
                    message: translate('task.taskErrNone'),
                });
            }
        }



        return <Animated.View style={{ opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>
            <TaskFormPrice
                    isPriceFrom={(item:any)=>{setPriceFrom(item)}}
                    isPriceTo={(item:any)=>{setPriceTo(item)}}
                    taskPriceBack={taskInfo}
            />
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen()}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[modifyActiveComponent("taskAddres"), setIsBack(false)]}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }

    const TaskOptionsAnimate = () => {

        const { onPress, opacity, translateX } = useAnimateItemStyle()
        const [optionArr, setOptionArr] = useState<any>([])

        const [showReal, setShowReal] = useState(false)

        useEffect(()=>{
            onPress()
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
                />
            );
        };

        const _renderNextButton = () => {
            return (
            <View
                style={[styles.btn, {marginHorizontal: -10}]}
            >
                <Text style={{color: colors.white}}>{translate('onward')}</Text>
            </View>
            );
        };

        const _renderPrevButton = () => {
            return (
            <View
                style={[styles.btn, {marginHorizontal: -10}]}
            >
                <Text style={{color: colors.white}}>{translate('back')}</Text>
            </View>
            );
        };

        const slideScreen = () => {
            if(newData.length != 0){
                modifyActiveComponent("taskDescription");
                setTaskInfo({...taskInfo, options: newData, service_id: 1})
                setIsBack(true);
                setShowReal(true)
            } else {
                errorMessage({
                    message:  translate('task.taskErrOption'),
                });
            }
        }

        let slider: AppIntroSlider | undefined;

        const skipScreen = (index: number, skip: boolean) => {
            if(skip == true){
                if(optionsScreen.length == (index + 1)){
                    slideScreen()
                    setOptionArr([...optionArr, {id: index, input_text_value: 'a'}])
                } else {
                    slider?.goToSlide(index + 1, false)
                    setOptionArr([...optionArr, {id: index, input_text_value: 'a'}])
                }
             
            }
            else if(newData[index] == undefined || newData[index]?.input_text_value?.length < 5){
                    slider?.goToSlide(index, false)
                    errorMessage({
                        message: translate('task.errorLengthOpt'),
                    });
                }
                
        }

        console.log('optionsScreen', optionsScreen)

        return <Animated.View style={{ opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>

          {
            !showReal?
            <View style={{height: '102%', width: '100%', paddingHorizontal: 20}}>
                <AppIntroSlider
                    renderItem={_renderItem}
                    data={optionsScreen}
                    activeDotStyle={{display: 'none'}}
                    dotStyle={{display: 'none'}}
                    showNextButton={true}
                    showDoneButton={true}
                    showSkipButton={true}
                    showPrevButton={true}
                    onDone={()=>slideScreen()}
                    onSkip={()=>{[modifyActiveComponent("taskPrice"), setIsBack(false)]}}
                    renderNextButton={_renderNextButton}
                    renderPrevButton={_renderPrevButton}
                    renderDoneButton={_renderNextButton}
                    renderSkipButton={_renderPrevButton}
                    onSlideChange={(index:number, lastIndex: number)=>{
                        skipScreen(lastIndex, false)
                    }}
                    ref={(ref) => (slider = ref!)}
                />
            </View>
            :
            <></>
          }

        </Animated.View>
    }


    const TaskDescriptionAnimate = () => {

        const { onPress, opacity, translateX } = useAnimateItemStyle()
        const [description, setDescription] = useState<string>('');


        useEffect(()=>{
            onPress()
        },[])

        const slideScreen = () => {
            if(description != ''){
                modifyActiveComponent("taskPublication");
                setTaskInfo({...taskInfo, description: description,categories: [1]})
                setIsBack(true)
            } else {
                errorMessage({
                    message: translate('task.taskErrDesc'),
                });
            }
        }

        return <Animated.View style={{ opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>
            <TaskFormDescription
                    isDescription={(item:any) => setDescription(item)}
            />
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{slideScreen()}}
                >
                    <Text style={{color: colors.white}}>{translate('onward')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[modifyActiveComponent("taskOptions"), setIsBack(false)]}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }

    const TaskPublicationAnimate = () => {

        const { onPress, opacity, translateX } = useAnimateItemStyle()
        const [description, setDescription] = useState<string>('');


        useEffect(()=>{
            onPress()
        },[])

        return <Animated.View style={{ opacity, transform:[{translateX}], height: '98%', justifyContent: 'space-between', alignItems: 'center',  }}>
            <TaskFormPublication
                    isDescription={(item:any) => setDescription(item)}
                    taskInfo={taskInfo}
                    navigation={navigation}
                    userInfo={userInfo}
            />
            <View style={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{[modifyActiveComponent("taskDescription"), setIsBack(false)]}}
                >
                    <Text style={{color: colors.white}}>{translate('back')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }

    const useAnimateItemStyle = () => {
        const [isOpen, setIsOpen] = useState(false)

        const animate_state = {
          start: 0,
          end: 100
        }
        const value = useRef(new Animated.Value(animate_state.start)).current

        const onPress = () => {
          Animated.timing(value, { toValue: isOpen ? animate_state.start : animate_state.end, useNativeDriver: true, duration: 400, easing: Easing.ease }).start()
          setIsOpen(!isOpen)
        }

        const inputRange = Object.values(animate_state)
        const opacity = value.interpolate({ inputRange, outputRange: [0, 1] })
        const translateX = value.interpolate(isBack?{ inputRange, outputRange: [500, 0] }: {inputRange, outputRange: [-500, 0] })

        return { opacity, translateX, onPress }
      }

  return (
      <View>
            {activeComponent === "taskName" && <TaskNameAnimate/>}
            {activeComponent === "taskPet" && <TaskPetAnimate/>}
            {activeComponent === "taskDate" && <TaskDateAnimate/>}
            {activeComponent === "taskAddres" && <TaskAddresAnimate/>}
            {activeComponent === "taskPrice" && <TaskPriceAnimate/>}

            {activeComponent === "taskOptions" && <TaskOptionsAnimate/>}

            {activeComponent === "taskDescription" && <TaskDescriptionAnimate/>}
            {activeComponent === "taskPublication" && <TaskPublicationAnimate/>}
      </View>
    )
  }

export default TaskForm;
