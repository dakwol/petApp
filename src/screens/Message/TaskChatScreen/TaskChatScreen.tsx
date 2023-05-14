import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
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
import { SCREENS } from '../../../navigation/screenName';
import { useSelector } from 'react-redux';
import TextArea from '../../../components/UI/TextArea/TextArea';
import TaskCardChat from '../../../components/UI/TaskCardChat/TaskCardChat';


interface IChatScreen {
    navigation: any;
    route: any;
}

const TaskChatScreen: FC<IChatScreen> = ({navigation, route, ...props}) => {

    const task = route.params.taskInfo;

    return (
        <ViewScreen keyboardVerticalOffset={25}>
             <View style={[{flexDirection:"row", alignItems: "center"}]}>
                <BackButton
                    text={translate('back')}
                    action={() => navigation.goBack()}
                />
            </View>

            <TaskCardChat taskInfo={task}/>

            <View style={{paddingHorizontal: 20, marginTop: 10}}>
                <View style={styles.cardTaskHeader}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.black}}>Отклики</Text>
                </View>

                <ScrollView style={{height: '65%'}}>

                        {task.responses.length > 0 && task.responses.map((item: any)=>{
                            console.log('wss item', item);
                            return (
                                <TouchableOpacity onPress={()=>{navigation.navigate(SCREENS.TaskChatOpenScreen, {task: task, taskChat: item})}} style={{borderBottomWidth: 1, borderBottomColor: colors.greenLight, paddingBottom: 15, marginBottom: 30}}>
                                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Image source={{uri: getMediaPreview(task?.preview)}} style={{width: 50, height: 50, resizeMode: 'contain', marginRight: 18}}/>
                                            <View style={{flexDirection: 'column'}}>
                                                <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: colors.zcBrown}}>{item.user.full_name}</Text>
                                                    {/*<View style={styles.circle}></View>*/}
                                                </View>
                                                <Text style={{fontSize: 10, marginTop: 5}}>{item.user.review_rate} {item.user.reviews.length} отзыва(-ов) </Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                            <Text style={{fontSize: 14, fontWeight: 'bold', color: colors.zcBrown}}>{item.price} ₽</Text>
                                            <Text style={{fontSize: 10, marginTop: 5}}>2022-01-30 {/* TODO:Вставить функцию для отображения даты */}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.passwordCheck}>
                                        <Text style={{marginRight: 5, fontSize: 12, fontWeight: 'bold'}}>Паспорт проверен</Text>
                                        <FontAwesome name="check" size={20} color={colors.greenPH} />
                                    </View>
                                    <Text style={{fontSize: 14, color: colors.zcBrown}}>{item.message}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    {task.responses.length == 0 &&
                        <View>
                            <Text>Пока нет откликов</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        </ViewScreen>
    );
};

export default TaskChatScreen;
