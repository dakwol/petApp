import React, {FC, useEffect, useRef, useState} from 'react';
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {styles} from "../../../components/Project/Profile/styles";
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import DropdownSelect from '../../../components/UI/DropdownSelect/DropdownSelect';
import TextArea from '../../../components/UI/TextArea/TextArea';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../../components/UI/Button/Button';
import { eventModerate } from '../../../api/events/eventModerate/eventModerate';
import { errorMessage } from '../../../utils/showMessage';
import { eventModerateMedia } from '../../../api/events/eventModerateMedia/eventModerateMedia';
import { colors } from '../../../constants/Colors';
import { deleteStories } from '../../../api/user/deleteStories/deleteStories';
import { moderateStories } from '../../../api/user/moderateStories/moderateStories';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../../locales/dictionary';


interface IEventScreen {
    eventId?: number,
    route: any,
    navigation: any,
}

const EventModerationScreen:FC<IEventScreen> = ({
                                          navigation,
                                          route,
                                          eventId
                                      }) => {


    const [categories, setCategories] = useState([]);
    const [selectDrop, setSelectDrop] = useState<number>(0);
    
    useEffect(() => {
        let data: any = [];
        {route.params.screenAction == 'eventCard'?
            (data.push({
                label: 'Удалить публикацию',
                value: 0,
            }),
            data.push({
                label: 'Удалить все медиа',
                value: 1,
            }))
            :
            data.push({
                label: 'Удаление истории' ,
                value: 0,
            })
        }
        setCategories(data);
        return () => {};
    }, []);

    const [isSelected, setSelection] = useState(false);
    const [messageValue, setMessageValue] = useState<string>('');

    useEffect(()=>{
        setMessageValue(messageValue);
    },[messageValue])


    const getModerationEvent = async()=>{
        if(route.params.screenAction == 'eventCard'){
            const payload = {
                "event_id": route.params.eventId,
                "type": selectDrop,
                "message": messageValue,
                "send_mail": isSelected? 1 : 0
            }
            const response = await eventModerate(payload)
            if(response.success){
                errorMessage({
                    message: translate('common.success'),
                })
                navigation.goBack();
            } else {
                errorMessage({
                    message: translate('errors.unknownError'),
                })
            }
        } else {
            const payload = {
                "event_media_id": route.params.event_media_id,
                "type": selectDrop,
                "message": messageValue,
                "send_mail": isSelected? 1 : 0
            }
            const response = await eventModerateMedia(payload)
            if(response.success){
                errorMessage({
                    message: translate('common.success'),
                })
                navigation.goBack();
            } else {
                errorMessage({
                    message: translate('errors.unknownError'),
                })
            }
        }
    }

    const [itemDelete, setItemDelete] = useState<boolean>(true)

    const storiesModerationItem = async() => {
      if(messageValue != ''){
            const response = await moderateStories(route.params.storId, messageValue);
            if(response.success){
                showMessage({
                    message: translate(Dictionary.stories.deleteStroies),
                    type: "success"
                });
                route.params.storiseDelete(false)
                navigation.goBack();

            } else {
                    errorMessage({
                        message: translate('errors.unknownError'),
                })
            }
        } else {
            errorMessage({
                message: 'Поле не заполнено'
            })
        }
    }

    return (
        <ViewScreen>
                <BackButton
                    text={translate('back')}
                    action={() => {
                        navigation.goBack()
                    }}
                />
                <View style={[styles.profileHeader, {width: '100%'}]}>
                       <View style={{paddingHorizontal: 16,}}>
                            <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "#392413",
                                    lineHeight: 22.5,
                                    fontWeight: "500"
                                }}>{translate("event.moderation")}</Text>
                            </View>
                       </View>
                       <View style={{paddingHorizontal: 16}}>
                            <DropdownSelect
                                defaultValue={0}
                                data={categories} 
                                onSelect={(value)=>{setSelectDrop(value.value)}} 
                                placeholder={''}
                            />

                            <TextArea
                                value={messageValue}
                                placeholder={translate('event.moderationText')}
                                onChangeText={(data) => {setMessageValue(data)}}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            {Platform.OS === 'ios' ? (
                            <CheckBox
                                boxType={'square'}
                                value={isSelected}
                                onValueChange={setSelection}
                                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                                lineWidth={3}
                                tintColor={colors.rainee}
                                onTintColor={colors.greenPH}
                                onCheckColor={colors.greenPH}
                            />
                            ) : (
                                <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                />
                            )}
                                <Text>{translate("event.moderationMailCheck")}</Text>
                            </View>
                            <View style={{alignItems: 'center', marginTop: 10}}>
                                <Button 
                                    text={translate("event.moderation")} 
                                    action={()=>route.params.storiesScreen? storiesModerationItem():  getModerationEvent()}
                                />
                            </View>
                       </View>
                </View>
        </ViewScreen>
    );
};

export default EventModerationScreen;
