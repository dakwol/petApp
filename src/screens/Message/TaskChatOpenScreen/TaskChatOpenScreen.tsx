import React, {FC, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Keyboard, TouchableOpacity} from 'react-native';
import {View, Text, Image} from 'react-native';
import ViewScreen from '../../../components/Project/ViewScreen/ViewScreen';
import BackButton from '../../../components/UI/BackButton/BackButton';
import { colors } from '../../../constants/Colors';
import { translate } from '../../../utils/translate';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import { getMediaPreview } from '../../../utils/common';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { getChats } from '../../../api/chats/getChats/getChats';
import Input from '../../../components/UI/Input/Input';
import ViewBottom from '../../../components/UI/ViewBottom/ViewBottom';
import InputSend from '../../../components/UI/InputSend/InputSend';
import ChatMessages from '../../../components/Project/ChatMessages/ChatMessages';
import { sendMessage } from '../../../api/chats/sendMessage/sendMessage';
import { responseWithBadWords } from '../../../utils/response';
import { Dictionary } from '../../../locales/dictionary';
import { Icons } from '../../../constants/images';
import { useSelector } from 'react-redux';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';
import ModalSimple from '../../../components/UI/ModalSimple/ModalSimple';
import TaskCardChat from '../../../components/UI/TaskCardChat/TaskCardChat';
import { taskAssignContractor } from '../../../api/task/taskAssignContractor/taskAssignContractor';


interface IChatScreen {
    navigation: any;
    route: any;
}

const TaskChatOpenScreen: FC<IChatScreen> = ({navigation, route, ...props}) => {

    const task = route.params.task;
    const taskChat = route.params.taskChat;
    const isFocused = useIsFocused();
    const [chatId, setChats] = useState<any>();
    const [userRes, setUserRes] = useState<any>();
    const [taskChatMassage, setTaskChatMassage] = useState<any>();
    const [message, setMessage] = useState<string>('');
    const [needRefresh, setNeedRefresh] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false) 


    useEffect(()=>{
        let payload:{user_id?:any,type?:number, task_id?: number} = { user_id: taskChat.user_id, type: 1, task_id: taskChat.task_id };
         getChats(payload).then(resp => {
            setChats(resp[0].id)
            setUserRes(resp[0].chat_user.full_name)
            setTaskChatMassage(resp[0].chat_messages)
         })
    },[])

    


    const inputRef = useRef();
    const onMessageChange = (data:any) => {
        setMessage(data);
    }

    const onMessageSend = ( ) => {
        console.log('TEST',message);
        if(chatId && message != '') {
            const payload = {
                "chat_id": chatId,
                "msg_type": 0,
                "message": message,
            }
            sendMessage(payload).then( (resp) => {
                responseWithBadWords({
                    resp: resp,
                    messageBadWords: Dictionary.errors.badWords,
                    messageError: "errors." + resp.message,
                    callBackSuccess: () => {
                        //@ts-ignore
                        inputRef?.current?.clear();
                        setMessage('');
                        setNeedRefresh(true);
                    }
                })
            })
        }
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

        return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        };
    }, []);

    const scrollViewRef = useRef();

    const taskAssign = () => {
        let payload:{user_id?:any, task_id?: number} = { user_id: taskChat.user_id, task_id: task.id };
        taskAssignContractor(payload).then(resp=>{
            
            if(resp.success){
                setIsVisible(false)
                console.log(resp)
            } else {
                setIsVisible(false)
                console.log(resp)
            }
        })
    }


    return (
        <ViewScreen keyboardVerticalOffset={25}>
            <ModalSimple 
                isVisible={isVisible} 
                toggleModal={()=>{}} 
                compState={undefined}
                >
                    <View style={{padding: 35, width: 300, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: colors.black, marginBottom: 50}}>Вы действительно хотите выбрать {userRes} исполнителем по этой заявке?</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={()=>{taskAssign()}} style={{borderWidth: 1, borderColor: colors.greenPH, paddingHorizontal: 10, flex: 1/2, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, marginRight: 5, borderRadius: 10, backgroundColor: colors.greenPH}}>
                                <Text style={{fontSize: 10, fontWeight: 'bold', color: colors.white}}>Выбрать</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setIsVisible(false)}} style={{borderWidth: 1, borderColor: colors.greenPH, paddingHorizontal: 10, flex: 1/2, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, borderRadius: 10}}>
                                <Text style={{fontSize: 10, fontWeight: 'bold', color: colors.greenPH}}>Отказаться</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ModalSimple>
                <View style={[{flexDirection:"row", alignItems: "center"}]}>
                    <BackButton
                        text={translate('back')}
                        action={() => navigation.goBack()}
                    />
                </View>

                <TaskCardChat taskInfo={task} stylesCard={isKeyboardVisible?{display: 'none'} : {display: 'flex'}}/>

            <View style={{paddingHorizontal: 20, marginTop: 10, justifyContent: 'space-between', flexDirection: 'column', height: isKeyboardVisible? '90%' :'65%'}}>
                <View style={styles.cardTaskHeader}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.black}}>Отклики</Text>
                </View>

                <ScrollView
                    //@ts-ignore
                      ref={scrollViewRef}
                      //@ts-ignore
                      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                   
                    <TouchableOpacity>
                        <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: 20}}>
                            <Image source={{uri: getMediaPreview(taskChat?.preview)}} style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                            <View style={{flexDirection: 'column', marginLeft: 10}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: colors.zcBrown}}>{userRes}</Text>
                                    <View style={styles.circle}></View>
                                </View>
                                <Text style={{fontSize: 10, marginTop: 5}}>5,0  4 отзыва </Text>
                            </View>
                        </View>
                        
                        <Text style={{fontSize: 14, color: colors.zcBrown}}>{taskChat.message}</Text>
                    </TouchableOpacity>

                    {chatId != undefined &&
                        <ChatMessages
                            chatId={chatId}
                            needRefresh = {needRefresh}
                            setNeedRefresh = {setNeedRefresh}
                        />

                    }
            
                </ScrollView>
                <ViewBottom marginBottom={0}>
                <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: SCREEN_WIDTH}}>

                    {((task.contractor_assigner == null) && (taskChatMassage?.length <= 2)) &&
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TouchableOpacity style={{flex: 1/2.25,  borderWidth: 1, borderColor: colors.greenPH,borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: colors.white, marginRight: 5}}>
                                <Text style={{fontSize: 10, fontWeight: 'bold', color: colors.greenPH, alignSelf: 'center', textTransform: 'uppercase'}}>Обменяться контактами</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setIsVisible(true)}}  style={{flex: 1/2.25, borderWidth: 1, borderColor: colors.greenPH, backgroundColor: colors.greenPH, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7}}>
                                <Text style={{fontSize: 10, fontWeight: 'bold',  color: colors.white, alignSelf: 'center', textTransform: 'uppercase',}}>Выбрать исполнителем </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                    <InputSend
                        inputRef={inputRef}
                        onChange={ onMessageChange }
                        onPress = { onMessageSend }
                        rightIcon={Icons.messageSend}
                        placeHolderText={translate('chat.send')}
                        extraStyles={{
                            inputSection: {
                                width: SCREEN_WIDTH - 35,
                                borderWidth: 1,
                                borderColor: 'rgba(138, 196, 58, 0.6)',
                                height:30,
                                borderRadius: 10,
                                marginTop: 10, 
                                alignItems: 'center'
                            },
                            input: {
                                width: SCREEN_WIDTH - 35,
                                height:20,
                                fontSize:16,
                                padding:0,
                                paddingLeft: 10,
                                marginVertical:0,
                                paddingRight: 40
                            },
                            tinyLogoRight: {
                                width:20,
                                height:20,
                                top: -35
                            }
                        }}
                    />
                </View>
                </ViewBottom>
            </View>
        </ViewScreen>
    );
};

export default TaskChatOpenScreen;
