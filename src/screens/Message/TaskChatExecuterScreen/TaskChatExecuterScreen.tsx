import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, TextInput, TouchableOpacity} from 'react-native';
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
import {taskCreate} from "../../../api/task/taskCreate/taskCreate";
import {errorMessage} from "../../../utils/showMessage";
import {taskResponse} from "../../../api/task/taskResponse/taskResponse";
import {getFormData} from "../../../utils/formData";


interface IChatScreen {
    navigation: any;
    route: any;
}



const TaskChatExecuterScreen: FC<IChatScreen> = ({navigation, route, ...props}) => {

    const task = route.params.taskInfo;
    const userInfo = route.params.userInfo;

    const [responseMessage, setResponseMessage] = useState<string>();
    const [responsePrice, setResponsePrice] = useState<string>();

    const saveResponse = async () => {
        //console.log('wss price', responsePrice);
        //console.log('wss msg', responseMessage);

        let payload:any = [];

        payload.task_id = task.id
        payload.message = responseMessage;
        payload.price = responsePrice;

        let response = getFormData(payload);

        await taskResponse(response).then(resp=>{

            if (resp.data?.status == 'error') {
                errorMessage({
                    //message: translate(errors.resp.data?.message)
                    message: translate('errors.Response_already_created')
                })
            } else {
                navigation.goBack()
            }
        })


    }

    return (
        <ViewScreen keyboardVerticalOffset={0}>
             <View style={[{flexDirection:"row", alignItems: "center"}]}>
                <BackButton
                    text={translate('back')}
                    action={() => navigation.goBack()}
                />
            </View>

            <TaskCardChat taskInfo={task}/>

            <View style={{paddingHorizontal: 20, marginTop: 10}}>
                <View style={styles.cardTaskHeader}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.black, marginTop: 10}}>{translate('task.taskResponse')}</Text>
                </View>

                <View>
                    <View>
                        <TextInput
                            style={{borderStyle:"solid", borderBottomWidth: 1, borderColor: colors.greenPH}}
                            keyboardType={"numeric"}
                            onChangeText={setResponsePrice}
                            value={responsePrice}
                            placeholder={translate('task.taskPriceMessage')}
                        />

                        <TextArea value={responseMessage} onChangeText={(item)=>{setResponseMessage(item)}} placeholder={translate('profile.userMessage')}></TextArea>
                        <TouchableOpacity onPress={saveResponse} style={{alignSelf: 'center', borderRadius: 20, backgroundColor: colors.greenPH, paddingHorizontal: 20, paddingVertical: 10, marginTop: 20}}>
                            <Text style={{color: colors.white, fontWeight: 'bold' }}>{translate('task.taskResponse')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ViewScreen>
    );
};

export default TaskChatExecuterScreen;
