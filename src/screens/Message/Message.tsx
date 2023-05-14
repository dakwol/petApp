import React, {FC, useCallback, useEffect, useState} from 'react';
import ViewScreen from "../../components/Project/ViewScreen/ViewScreen";
import ChatList from "../../components/Project/ChatList/ChatList";
import {IChatListItem} from "../../components/Project/ChatList/types";
import {ICommentEventItem} from "../../components/Project/CommentEventList/types"
import {useDispatch, useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {getChats} from "../../api/chats/getChats/getChats";
import {IScreen} from "../../types";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import {translate} from "../../utils/translate";
import {setEvents} from "../../redux/GlobalRedux/actions/actionCreator";
import {useDebouncedCallback} from "use-debounce";
import {globalStyles, SCREEN_WIDTH} from "../../constants/globalStyles";
import ButtonAdd from "../../components/Project/ButtonAdd/ButtonAdd";
import {colors} from "../../constants/Colors";
import {capitalizeFirstLetter} from "../../utils/text";
import {Dictionary} from "../../locales/dictionary";
import {getEvents} from "../../api/events/getEvents/getEvents";
import CommentEventList from "../../components/Project/CommentEventList/CommentEventList";
import ChatTasksStatusBar from "../../components/UI/ChatTasksStatusBar/ChatTasksStatusBar";
import {taskSearch} from "../../api/task/taskSearch/taskSearch";
import {IApiReturn} from "../../types/api";
import TaskListSm from "../../components/Project/TasksListSm/TaskListSm";
import {ITaskListItem} from "../../components/Project/TasksListSm/types";
import {compressVideoFFM, compressVideoRNH} from "../../utils/media";
import { SCREENS } from '../../navigation/screenName';
import {Badge} from "react-native-elements";

interface IMessageScreen {
    navigation: any;
    route:any;
}

const Message:FC<IMessageScreen> = ({navigation, route, ...props }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const [searchString, setSearchString] = useState<string>('');
    const [screenState, setScreenState] = useState({
        searchString: '',
        isChatsLoading: true,
        messageType: 0
    })

    const exe_user = [2,3]; //todo: вынести в справочники / получить из апи

    const [activeTaskTab, setactiveTaskTab] = useState<number>(1);

    const showChats = () => {
        setScreenState({...screenState, messageType: 0})
        setVisibleChats(true);
        setVisibleComments(false);
        setVisibleTasks(false);
    }

    const showComments = () => {
        setScreenState({...screenState, messageType: 2})
        setVisibleChats(false);
        setVisibleComments(true);
        setVisibleTasks(false);
    }

    const showTasks = () => {
        setScreenState({...screenState, messageType: 1})
        setVisibleComments(false);
        setVisibleChats(false);
        setVisibleTasks(true);
    }



    const [chats, setChats] = useState<any[]>([]);
    const [eventComments, setEventComments] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);

    const [visibleChats, setVisibleChats] = useState(true);
    const [visibleComments, setVisibleComments] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState(false);

    const onChatPress = (item: IChatListItem) => {
        navigation.navigate('CommonNavigator', {screen: 'ChatScreen', params: {chatId: item.id}});
    };

    const onEventCommentPress = (item: ICommentEventItem) => {
        navigation.navigate('CommonNavigator', {screen: 'EventScreen', params: {eventId: item.id}});
    }

    const onTaskPress = (type: number, item:ITaskListItem) => {
       if(userInfo.service_role == 1 || userInfo.service_role == 2){ //TODO: загрузка справочника и проверка через include
        navigation.navigate(SCREENS.TaskChatScreen, {taskInfo: item})
       } else {
        navigation.navigate(SCREENS.TaskChatExecuterScreen, {taskInfo: item, userInfo: userInfo})
       }
    }

    const getChatsList = async (test?:any) => {
        let payload:{user_id?:any,keyword?:string} = { user_id: userInfo.user_id?.toString() };
        if(searchString && searchString != '') {
            payload.keyword = searchString;
        }
        let output:any[] = [];
        try {
            output = await getChats(payload)
            return output.reverse();
        } catch (error) {
            return output;
        }
    }

    //EventComments
    const getEventComments = async () => {
        let payload:{user_id?:any, with_comments?: number} = {user_id: userInfo.user_id?.toString(), with_comments: 1}
        let output: any[] = [];
        try {
            output = await getEvents(payload);
            return output;
        } catch (error) {
            return output;
        }

    }

    useEffect(() => {
        //console.log("CHATS", chats);
    }, [chats]);

    useEffect(() => {
        getChatsList().then( response => setChats(response) );
    }, [isFocused]);

    useEffect(() => {
        getEventComments().then( response => setEventComments(response)  ); //
    }, [isFocused]);

    const getTasksList = async (activeTab: number) => {

        let payload: { user_id?: any, is_archive?: any, is_has_new_responses?:any } | undefined;

        if (exe_user.includes(userInfo.service_role)) {
            //payload for service user
            switch(activeTab) {
                case 1: { payload = { is_archive: "0" }; break;}
                case 2: { payload = { is_archive: "0", is_has_new_responses: "0" }; break;}
                case 3: { payload = { is_archive: "0", is_has_new_responses: "1" }; break;}
                case 4: { payload = { is_archive: "1" }; break;}
            }
        } else {
            //payload for general & vol user
            switch(activeTab) {
                case 1: { payload = { user_id: userInfo.user_id?.toString()}; break;}
                case 2: { payload = { user_id: userInfo.user_id?.toString(), is_archive: "0", is_has_new_responses: "0" }; break;}
                case 3: { payload = { user_id: userInfo.user_id?.toString(), is_archive: "0", is_has_new_responses: "1" }; break;}
                case 4: { payload = { user_id: userInfo.user_id?.toString(), is_archive: "1" }; break;}
            }
        }

        // @ts-ignore
        let output:IApiReturn<any> = [];
        try {
            output = await taskSearch(payload)
            return output.data.tasks;
        } catch (error) {
            return output;
        }

    }

    useEffect(() => {
        //console.log("TASKS", tasks);
    }, [chats]);

    useEffect(() => {
        // @ts-ignore
        getTasksList(1).then(response => setTasks(response) ); //
    }, [isFocused]);

    const onSearch = async (text:string) => {
        setSearchString(text);
        if(text.length >= 3 || text == '') {
            debouncedChats(text);
        }
    }

    const onTabAction = async (number:number) => {
        setactiveTaskTab(number);
        getTasksList(number).then( response => setTasks(response) );
    }

    const debouncedChats = useDebouncedCallback(
        (value) => {
            //console.log('DEBOUNCED CHATS', value);
            //setSearchString(value);
            getChatsList().then( response => setChats(response) );
        },
        10,
        // The maximum time func is allowed to be delayed before it's invoked:
        { maxWait: 15 }
    );

    useEffect(
        () => () => {
            debouncedChats.flush();
        },
        [debouncedChats]
    );

    const userDataLive = useSelector((state:any) => state?.session?.userDataLive);
    console.log('wss msg', userDataLive);

    return (
        <ViewScreen keyboardVerticalOffset={0}>
            <View>
                <View style={[globalStyles.row, styles.listTitle]} >
                    <View style={{flex: 1, flexDirection:"row", alignItems: "center", justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={ () => {showChats()}}>
                                <Text
                                    style={[
                                        globalStyles.bodySectionSubTitle,
                                        //{marginLeft:5, borderBottomColor: colors.greenPH},
                                        {marginLeft: 5, borderColor: colors.brown, paddingHorizontal: 10,},
                                        screenState.messageType == 0  && {borderWidth: 1, borderRadius: 5}
                                    ]}
                                >
                                    Сообщения
                                </Text>
                            </TouchableOpacity>
                            {userDataLive.unread_chat_messages > 0 && (
                                <Badge
                                    status="error"
                                    containerStyle={{ position: "absolute", top: 12, right: 4 }}
                                />
                            )}
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={ () => {showComments()}}>
                                <Text
                                    style={[
                                        globalStyles.bodySectionSubTitle,
                                        //{marginLeft:5, borderBottomColor: colors.greenPH},
                                        {marginLeft: 5, borderColor: colors.brown, paddingHorizontal: 10,},
                                        screenState.messageType == 2  && {borderWidth: 1, borderRadius: 5}
                                    ]}
                                >
                                    Комментарии
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={ () => {showTasks()}}>
                                <Text
                                    style={[
                                        globalStyles.bodySectionSubTitle,
                                        //{marginLeft:5, borderBottomColor: colors.greenPH},
                                        {marginLeft: 5, borderColor: colors.brown, paddingHorizontal: 10,},
                                        screenState.messageType == 1  && {borderWidth: 1, borderRadius: 5}
                                    ]}
                                >
                                    Заявки
                                </Text>
                            </TouchableOpacity>
                            {userDataLive.unread_task_responses.total > 0 && (
                                <Badge
                                    status="error"
                                    containerStyle={{ position: "absolute", top: 12, right: 4 }}
                                />
                            )}
                        </View>

                    </View>
                </View>

                { visibleChats &&
                <View>
                    <View style={styles.searchInput}>
                        <SearchInput
                            placeholderText={translate('placeHolderSearchHome')}
                            onSearchPress={ onSearch }
                            //onClearPress={ onSearchClear }
                        />
                    </View>
                    <ScrollView>
                        {chats.length > 0 && (
                            <ChatList
                                chats={chats}
                                onChatPress={onChatPress}
                                unreadChats={userDataLive.unread_chats}
                            />
                        )}
                    </ScrollView>
                </View>
                }
                { visibleComments &&
                    <View>
                        <ScrollView>
                            {eventComments.length > 0 && (
                                <CommentEventList
                                    events = {eventComments}
                                    onEventCommentPress = {onEventCommentPress}
                                />
                            )}
                        </ScrollView>
                    </View>
                }

                { visibleTasks &&
                    <View>
                        <View>
                            <ChatTasksStatusBar
                                countTotal={userDataLive.unread_task_responses.total}
                                countOpen={userDataLive.unread_task_responses.open}
                                countInwork={userDataLive.unread_task_responses.in_process}
                                countArchive={userDataLive.unread_task_responses.archive}
                                tabActive={activeTaskTab}
                                onTabPress={ onTabAction }
                            />
                        </View>
                        <ScrollView>
                            {tasks.length > 0 && (
                                <TaskListSm
                                    tasks={tasks}
                                    type={exe_user.includes(userInfo.service_role)?1:0}
                                    onTaskPress={onTaskPress}
                                    unread_tasks={userDataLive.unread_tasks}
                                />
                            )}
                        </ScrollView>
                    </View>
                }

            </View>
        </ViewScreen>

    );
};

export default Message;
